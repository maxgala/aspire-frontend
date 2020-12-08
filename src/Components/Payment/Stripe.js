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

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      name: "",
      postal: "",
      errorMessage: null,
      paymentMethod: null,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = this.props;
    const { name, postal } = this.state;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

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
      });
    } else {
      this.setState({
        paymentMethod: payload.paymentMethod,
        errorMessage: null,
      });
      // add logic here to the final page for user type

      this.props.finalPage.setState({
        openStripe: false,
      });

      if (this.props.finalPage.state.aspire_premium === true) {
        this.props.finalPage.signUp(25, "PAID");
        this.props.finalPage.setState({
          verified: true,
        });
      } else {
        this.props.finalPage.signUp(25, "MENTOR");
        this.props.finalPage.setState({
          verified: true,
        });
      }
    }
  };

  goBackPrev = (event) => {
    this.props.finalPage.setState({
      openStripe: false,
    });
  };

  render() {
    const { stripe } = this.props;
    const { postal, name, paymentMethod, errorMessage } = this.state;
    const classes = this.props.classes;
    return (
      <form onSubmit={this.handleSubmit}>
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
        <Button
          type="submit"
          disabled={!stripe}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          <b>Pay</b>
        </Button>
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
            <CheckoutForm
              stripe={stripe}
              elements={elements}
              appContext={this.props.appContext}
              finalPage={this.props.finalPage}
            />
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}
CheckoutForm = withMyHook(CheckoutForm);

export default Stripe;
