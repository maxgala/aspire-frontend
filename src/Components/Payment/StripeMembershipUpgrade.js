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
import { CircularProgress } from "@material-ui/core";
import AWS from "aws-sdk";
import { Auth } from "aws-amplify";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_SES_REGION,
});

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
  title: {
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
  },
  description: {
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "16px",
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
/**
 * This function will send an email using AWS's Simple Email Service
 * @param {object} data an object holding email information to be sent
 * @return {boolean} true or false depending on if sending the email was successful
 */
async function sendEmail(data) {
  // Create sendEmail params
  var params = {
    Destination: {
      CcAddresses: [data.ccAddress],
      ToAddresses: [data.toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: data.body,
        },
        Text: {
          Charset: "UTF-8",
          Data: data.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: data.subject,
      },
    },
    Source: data.source,
  };

  // Create the promise and SES service object
  var emailSendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle email send status success / failure for handling in createEscalation
  emailSendPromise
    .then(function (data) {})
    .catch(function (err) {
      console.error(err, err.stack);
      return false;
    });
  return true;
}

class CreditsForm extends React.Component {
  constructor(props) {
    super(props);
    let userProfile = jwtDecode(localStorage.getItem("idToken"));
    this.state = {
      open: this.props.open,
      name: "",
      postal: "",
      errorMessage: null,
      paymentMethod: null,
      paymentSuccess: false,
      isPaying: false,
      userType: userProfile["custom:user_type"],
      plan: userProfile["custom:user_type"] === "FREE" ? "PREMIUM" : "PLATINUM",
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

    if (this.state.plan === null) {
      this.setState({
        errorMessage: "Please select a plan",
        paymentMethod: null,
      });
      return;
    }

    let userProfile = jwtDecode(localStorage.getItem("idToken"));
    let email = userProfile["email"];
    let amount = 0;
    if (this.state.plan === "PREMIUM") {
      amount = 49;
    } else {
      amount = 75;
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
        email: email,
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
        if (this.state.plan === "PLATINUM") {
          this.handleEscalation(this);
        } else {
          let idToken = (await Auth.currentSession())
            .getIdToken()
            .getJwtToken()
            .toString();
          await httpPut("users/upgrade", idToken, null)
            .then((res) => {
              this.props.landing.handleMembershipUpgradeCompletion(true);
            })
            .catch((err) => {
              console.error(err);
              this.props.landing.handleMembershipUpgradeCompletion(false);
            });
        }
      }
      this.setState({
        isPaying: false,
      });
    }
  };

  /**
   * This function will handle the create escalation event.
   * @return void
   */
  handleEscalation = (self) => {
    // Build the email information object from state.
    let emailData = {};

    emailData.subject =
      "[SENIOR EXECUTIVE APPLICATION] Someone wants to upgrade their membership";

    // For now we're just going to hard code the address to mine, otherwise it is the support email.
    emailData.ccAddress = "aspire@maxgala.com";
    emailData.toAddress = "aspire@maxgala.com";
    emailData.source = "aspire@maxgala.com";

    // Get and store data from where the escalation is being created.
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    let emailFrom = `${userProfile.given_name} ${userProfile.family_name} ${userProfile.email}`;
    emailData.body =
      emailFrom + " wants to apply to become a Senior Executive.";

    sendEmail(emailData).then(function (emailSendSuccess) {
      // If we sent the email successfully, hide the modal.
      self.props.landing.handleMembershipUpgradeCompletion(emailSendSuccess);
    });
  };

  goBackPrev = (event) => {
    console.log(this.props.landing);
    this.props.landing.handleMembershipUpgradeClose();
  };

  handleChange = (event) => {
    this.setState({
      plan: event.target.value,
    });
  };

  render() {
    const { stripe } = this.props;
    const { postal, name, paymentMethod, errorMessage } = this.state;
    const classes = this.props.classes;
    return (
      <div style={{ margin: "0" }}>
        <form onSubmit={this.handleSubmit}>
          <p className={classes.title}>Upgrade Membership</p>
          {this.state.userType === "FREE" ? (
            <p className={classes.description}>
              You can upgrade your membership to the Premium or Platinum plan.
              If you are applying to become a Senior Executive (our Platinum
              plan), we will review your profile and make a decision after
              careful consideration. Please note, you will not be re-imbursed if
              your application to apply to become a Senior Executive is not
              accepted.
            </p>
          ) : null}
          {this.state.userType === "PAID" ? (
            <p className={classes.description}>
              You can upgrade your membership to the Platinum plan. If you are
              applying to become a Senior Executive (our Platinum plan), we will
              review your profile and make a decision after careful
              consideration. Please note, you will not be re-imbursed if your
              application to apply to become a Senior Executive is not accepted.
            </p>
          ) : null}
          <label style={labelStyle} htmlFor="name">
            Plan
          </label>
          <Select
            native
            value={this.state.plan}
            onChange={this.handleChange}
            inputProps={{
              name: "Plan",
              id: "age-native-simple",
            }}
          >
            {this.state.userType === "FREE" ? (
              <option value={"PREMIUM"}>Premium</option>
            ) : null}
            <option value={"PLATINUM"}>Platinum</option>
          </Select>

          <label style={labelStyle} htmlFor="name">
            Cost
          </label>

          {this.state.plan !== null ? (
            <h3>
              {"$"}
              {this.state.plan === "PREMIUM" ? "49" : "75"}
            </h3>
          ) : (
            <h3>{"$0"}</h3>
          )}

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
            options={ELEMENT_OPTIONS}
            onChange={(event) => {
              this.setState({ postal: event.target.value });
            }}
          />
          {errorMessage && <ErrorResult>{errorMessage}</ErrorResult>}
          {paymentMethod && <Result>Processing payment</Result>}
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
      </div>
    );
  }
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

class StripeMembershipUpgrade extends Component {
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
            ></CreditsForm>
          )}
        </ElementsConsumer>
      </Elements>
    );
  }
}
CreditsForm = withMyHook(CreditsForm);

export default StripeMembershipUpgrade;
