import React, { Component } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { logEvent, Result, ErrorResult } from "./util";
import "./cardStyle.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { httpPost, httpPut } from "../../lib/dataAccess";
import Select from "@material-ui/core/Select";
import jwtDecode from "jwt-decode";
import { Auth } from "aws-amplify";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "15px",
    height: 50,
    width: "30%",
    borderStyle: "solid",
    borderRadius: 50,
    backgroundColor: "#b5a165",
    color: "white",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  cancel: {
    marginRight: "5%",
    height: 50,
    width: "30%",
    borderRadius: 50,
    backgroundColor: "#1A1A1A",
    borderStyle: "solid",
    color: "#F1F1F1",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
}));

const labelStyle = {
  color: "#6b7c93",
  fontWeight: 300,
  letterSpacing: "0.025em",
  marginTop: "16px",
  display: "block",
};

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

class CreditsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      name: "",
      postal: "",
      errorMessage: null,
      paymentMethod: null,
      paymentSuccess: false,
      credits: 0,
      isPaying: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { name, postal } = this.state;

    this.setState({
      isPaying: true,
    });

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (this.state.credits === 0) {
      this.setState({
        errorMessage:
          "Please select how many credits you would like to purchase",
        paymentMethod: null,
      });
      return;
    }

    let userProfile = jwtDecode(localStorage.getItem("idToken"));
    let amount = 0;
    if (
      userProfile["custom:user_type"] === "PAID" ||
      userProfile["custom:user_type"] === "MENTOR"
    ) {
      amount = 1 * this.state.credits;
    } else {
      amount = 2 * this.state.credits;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name,
        address: {
          postal_code: postal,
        },
      },
    });

    if (payload.error) {
      console.log("[error]", payload.error);
      this.setState({
        errorMessage: payload.error.message,
        paymentMethod: null,
        isPaying: false,
      });
      return;
    } else {
      this.setState({
        paymentMethod: payload.paymentMethod,
        errorMessage: null,
      });
      // add logic here to the final page for user type

      let paymentRequest = {
        payment_method_id: this.state.paymentMethod.id,
        amount: amount,
      };

      await httpPost("payment", null, paymentRequest)
        .then((res) => {
          this.setState({
            paymentSuccess: true,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            paymentSuccess: false,
          });
        });

      if (this.state.paymentSuccess === false) {
        this.setState({
          errorMessage: "Unable to process payment",
          paymentMethod: null,
        });
      } else {
        let creditsPayload = {
          email: userProfile["email"],
          credits: parseInt(this.state.credits),
        };
        let idToken = (await Auth.currentSession())
          .getIdToken()
          .getJwtToken()
          .toString();
        await httpPut("users/credits", idToken, creditsPayload)
          .then((res) => {
            Auth.currentUserInfo().then((res) => {
              this.props.landing.setState({
                credits: res.attributes["custom:credits"],
                openCredits: false,
              });
            });
          })
          .catch((err) => {
            console.error(err);
            this.setState({
              errorMessage: err.message,
            });
          });
      }
      this.setState({
        isPaying: false,
      });
    }
  };

  goBackPrev = (event) => {
    console.log(this.props.landing);
    this.props.landing.handleCreditsClose();
  };

  handleChange = (event) => {
    this.setState({
      credits: event.target.value,
    });
  };

  render() {
    const { stripe } = this.props;
    const { postal, name, paymentMethod, errorMessage } = this.state;
    const classes = this.props.classes;
    return (
      <form onSubmit={this.handleSubmit}>
        <label style={labelStyle} htmlFor="name">
          Credits
        </label>
        <Select
          native
          value={this.state.credits}
          onChange={this.handleChange}
          inputProps={{
            name: "Credits",
            id: "age-native-simple",
          }}
        >
          <option aria-label="None" value="" />
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </Select>

        <label style={labelStyle} htmlFor="name">
          Cost
        </label>

        <h3>
          {"$"}
          {jwtDecode(localStorage.getItem("idToken"))["custom:user_type"] ===
            "PAID" ||
          jwtDecode(localStorage.getItem("idToken"))["custom:user_type"] ===
            "MENTORS"
            ? this.state.credits * 1.0
            : this.state.credits * 2.0}
        </h3>

        <label style={labelStyle} htmlFor="name">
          Full Name
        </label>
        <input
          id="name"
          required
          placeholder="Full Name"
          value={name}
          onChange={(event) => {
            this.setState({ name: event.target.value });
          }}
        />
        <label style={labelStyle} htmlFor="cardNumber">
          Card Number
        </label>
        <CardNumberElement
          id="cardNumber"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label style={labelStyle} htmlFor="expiry">
          Card Expiration
        </label>
        <CardExpiryElement
          id="expiry"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label style={labelStyle} htmlFor="cvc">
          CVC
        </label>
        <CardCvcElement
          id="cvc"
          onBlur={logEvent("blur")}
          onChange={logEvent("change")}
          onFocus={logEvent("focus")}
          onReady={logEvent("ready")}
          options={ELEMENT_OPTIONS}
        />
        <label style={labelStyle} htmlFor="postal">
          Postal Code
        </label>
        <input
          id="postal"
          required
          placeholder="12345"
          value={postal}
          onChange={(event) => {
            this.setState({ postal: event.target.value });
          }}
        />
        {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
        {paymentMethod && (
          <Result>Got PaymentMethod: {paymentMethod.id}</Result>
        )}
        <br />
        <Button
          variant="contained"
          color="primary"
          className={classes.cancel}
          onClick={this.goBackPrev}
        >
          <b>Go Back</b>
        </Button>
        {this.state.isPaying ? (
          <CircularProgress className={classes.circleProgress} />
        ) : (
          <Button
            type="submit"
            disabled={!stripe}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <b>Pay</b>
          </Button>
        )}
      </form>
    );
  }
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

class Stripe extends Component {
  render() {
    return (
      <Elements stripe={stripePromise} appContext={this.props.appContext}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <CreditsForm
              stripe={stripe}
              elements={elements}
              appContext={this.props.appContext}
              landing={this.props.landing}
            >
              {console.log(this.props.landing)}
            </CreditsForm>
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}
CreditsForm = withMyHook(CreditsForm);

export default Stripe;
