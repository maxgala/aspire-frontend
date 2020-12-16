import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LinearWithValueLabel from "./linearprogress";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import Membership from "../LandingPage/Membership";
import Stripe from "../Payment/Stripe";
import { Auth } from "aws-amplify";
import TextField from "@material-ui/core/TextField";
import { Document, Page, pdfjs } from "react-pdf";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { withRouter } from "react-router-dom";
import { Routes } from "../../entry/routes/Routes";
import { withSnackbar } from "notistack";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "15vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titlePaper: {
    margin: theme.spacing(0, 0, 3),
  },
  avatar: {
    marginTop: "3vh",
    width: "100px",
    height: "100px",
    padding: "1vw",
  },
  choiceText: {
    margin: theme.spacing(2, 0, 1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit_back: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "5%",
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "5%",
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
  disagree: {
    margin: theme.spacing(3, 0, 2),
    width: "30%",
    backgroundColor: "#1A1A1A",
    borderStyle: "solid",
    color: "#F1F1F1",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  agree: {
    margin: theme.spacing(3, 0, 2),
    width: "30%",
    backgroundColor: "#b5a165",
    color: "white",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  payButton: {
    borderRadius: 50,
    backgroundColor: "#6EA0B5",
    borderStyle: "solid",
    color: "#F1F1F1",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  choice: {
    width: "25%",
  },
  term: {
    color: "black",
    "&:hover": {
      color: "red",
    },
  },
  cardRoot: {
    margin: theme.spacing(0, 2, 1),
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
  membership_options: {
    "@media (min-width: 480px)": {
      display: "inline-flex",
    },
    margin: "auto",
  },
  grid: {
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "30px",
  },
  features_title: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "48px",
    margin: "0px",
    paddingTop: "60px",
    paddingBottom: "30px",
    color: "black",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class FinalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.prev ? this.props.prev.firstName : "",
      lastName: this.props.prev ? this.props.prev.lastName : "",
      phone: this.props.prev ? this.props.prev.phone : "",
      email: this.props.prev ? this.props.prev.email : "",
      password: this.props.prev ? this.props.prev.password : "",
      passwordStrength: this.props.prev ? this.props.prev.passwordStrength : "",
      year_of_birth: this.props.prev ? this.props.prev.year_of_birth : "",
      industry: this.props.prev ? this.props.prev.industry : "",
      industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
      title: this.props.prev ? this.props.prev.title : "",
      company: this.props.prev ? this.props.prev.company : "",
      education: this.props.prev ? this.props.prev.education : "",
      province: this.props.prev ? this.props.prev.province : "",
      city: this.props.prev ? this.props.prev.city : "",
      country: this.props.prev ? this.props.prev.country : "",
      states: this.props.prev ? this.props.prev.states : "",
      resumeURL: this.props.prev ? this.props.prev.resumeURL : "",
      profilePicURL: this.props.prev ? this.props.prev.profilePicURL : "",
      senior_executive: this.props.prev
        ? this.props.prev.senior_executive
        : false,
      aspire_email_consent: this.props.prev
        ? this.props.prev.aspire_email_consent
        : false,
      aspire_free: true,
      aspire_premium: false,
      aspire_platinum: false,
      progress: 100,
      checked: false,
      open: false,
      verified: false,
      confirmationCode: "",
      openStripe: false,
      tocNumPages: null,
      privacyNumPages: null,
      url: process.env.REACT_APP_MAILCHIMP_URL,
    };
  }

  onTocDocumentLoad = ({ numPages }) => {
    this.setState({ tocNumPages: numPages });
  };

  onPrivacyDocumentLoad = ({ numPages }) => {
    this.setState({ privacyNumPages: numPages });
  };

  changeToPage3 = (event) => {
    this.props.history.push(`${Routes.Register}/3`);
  };

  signUp(credits, user_type) {
    let address = {};
    if (this.state.country === "CA") {
      address = {
        locality: this.state.city,

        region: this.state.province,
        country: this.state.country,
      };
    } else if (this.state.country === "USA") {
      address = {
        locality: this.state.city,
        region: this.state.states,
        country: this.state.country,
      };
    } else {
      address = { city: "Other", region: "Other", country: "Other" };
    }
    address = JSON.stringify(address);
    let phone_val = this.state.phone
      .replace(/\s/g, "")
      .replace("(", "")
      .replace(")", "")
      .replace("-", "");
    phone_val = phone_val.replace("(", "");
    phone_val = phone_val.replace(")", "");
    const start_date = Math.trunc(Date.now() / 1000);
    const end_date = start_date + 31536000;

    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        given_name: this.state.firstName,
        family_name: this.state.lastName,
        phone_number: phone_val,
        birthdate: this.state.year_of_birth,
        address: address,
        gender: "U", // TODO: Add a form field to accept Gender with values Male, Female and Other
        "custom:industry": this.state.industry,
        "custom:industry_tags": this.state.industry_tags.toString(),
        "custom:position": this.state.title,
        "custom:company": this.state.company,
        "custom:education_level": this.state.education,
        "custom:user_type": user_type,
        "custom:credits": credits.toString(),
        picture: this.state.profilePicURL,
        "custom:start_date": start_date.toString(),
        "custom:end_date": end_date.toString(),
        "custom:resume": this.state.resumeURL,
      },
    })
      .then(() => {
        this.props.enqueueSnackbar("Successfully signed up", {
          variant: "success",
        });
        this.setState({
          verified: true,
        });
      })
      .catch((err) => {
        this.props.enqueueSnackbar(
          `Error signing up: ${err.message.toString()}`,
          {
            variant: "error",
          }
        );
      });
  }

  confirmSignUp() {
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
      .then(() => {
        this.props.enqueueSnackbar("Successfully confirmed signed up", {
          variant: "success",
        });
      })
      .catch((err) => {
        this.props.enqueueSnackbar(
          `Error signing up: ${err.message.toString()}`,
          {
            variant: "error",
          }
        );
      });
  }

  handleClose = (event) => {
    this.setState({
      open: false,
      checked: false,
    });
  };

  handleAccept = (event) => {
    this.setState({
      open: false,
      checked: true,
    });
  };

  handleUserChoice = (event) => {
    if (this.state.senior_executive === false) {
      this.setState({
        senior_executive: true,
      });
    } else {
      this.setState({
        senior_executive: false,
      });
    }
  };

  handleConfirmationCodeChange = (event) => {
    this.setState({
      confirmationCode: event.target.value,
    });
  };

  handleStripeClose = (event) => {
    this.setState({
      openStripe: false,
    });
  };

  handleSubmit = (event) => {
    if (this.state.verified) {
      this.confirmSignUp();
      this.props.history.push(`${Routes.Login}`);
    } else {
      if (
        this.state.aspire_premium === true ||
        this.state.aspire_platinum === true
      ) {
        this.setState({
          openStripe: true,
        });
      } else {
        this.signUp(0, "FREE");
      }
    }
  };

  readConditions = (event) => {
    this.setState({
      open: true,
    });
  };

  handleAspireFreeClick = (event) => {
    this.setState({
      aspire_free: true,
      aspire_premium: false,
      aspire_platinum: false,
    });
  };

  handleAspirePremiumClick = (event) => {
    this.setState({
      aspire_premium: true,
      aspire_free: false,
      aspire_platinum: false,
    });
  };

  handleAspirePlatimumClick = (event) => {
    this.setState({
      aspire_platinum: true,
      aspire_premium: false,
      aspire_free: false,
    });
  };

  render() {
    const classes = this.props.classes;
    if (this.state.verified) {
      return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
          </div>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <div style={{ alignContent: "center" }}>
                <Typography component="h1" variant="body1">
                  An email has been sent to <b>{this.state.email}</b>. Please
                  enter the verification code below:
                </Typography>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    id="confirmationCode"
                    label="Confirmation Code"
                    name="confirmationCode"
                    autoFocus
                    value={this.state.confirmationCode}
                    onChange={this.handleConfirmationCodeChange}
                  />
                </Grid>
                <Button
                  disabled={!this.state.checked}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  <b>Submit</b>
                </Button>
              </div>
            </Grid>
          </div>
        </Container>
      );
    } else {
      return (
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
          </div>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Membership
                appContext={this.props.appContext}
                landing={false}
                freeButtonText={"Try for Free"}
                premiumButtonText={"Sign Up for Premium"}
                platinumButtonText={"Sign Up for Platinum"}
                freeFunction={this.handleAspireFreeClick}
                premiumFunction={this.handleAspirePremiumClick}
                platinumFunction={this.handleAspirePlatimumClick}
              />
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.senior_executive}
                      onChange={this.handleUserChoice}
                      name="checkedD"
                    />
                  }
                  label={
                    <Tooltip
                      title={
                        <p>
                          Senior Executive means the chief executive officer,
                          chief operating officer, chief financial officer, or
                          anyone in charge of a principal business unit or
                          function.
                        </p>
                      }
                    >
                      <b>I would like to be considered as a Senior Executive</b>
                    </Tooltip>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checked}
                      onChange={(event) => {
                        this.setState({ checked: !this.state.checked });
                      }}
                      name="checkedD"
                    />
                  }
                  label={
                    <b>
                      I agree to the{" "}
                      <Tooltip title={"Click to read the Terms and Conditions"}>
                        <u
                          onClick={this.readConditions}
                          style={{ color: "red" }}
                        >
                          {" "}
                          terms and conditions{" "}
                        </u>
                      </Tooltip>{" "}
                    </b>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Tooltip
                  title={
                    <p>
                      MAX Aspire will only reach out to you for important
                      updates including (but not limited to) subscription
                      expiration, new features, security concerns, and other
                      important updates. We may also reach out to inform you
                      about big events MAX is hosting and other major updates in
                      the Muslim Community.
                    </p>
                  }
                >
                  <b>
                    If you would like to be added to the MAX Aspire mailing
                    service, please confirm your email!
                  </b>
                </Tooltip>
                <MailchimpSubscribe url={this.state.url} />
              </Grid>
            </Grid>
            <LinearWithValueLabel progress={this.state.progress} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit_back}
              onClick={this.changeToPage3}
            >
              <b>Previous</b>
            </Button>
            <Button
              disabled={!this.state.checked}
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              <b>Submit</b>
            </Button>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={"paper"}
            fullWidth={true}
            maxWidth={"md"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              <div>
                <h2>Terms and Conditions</h2>
              </div>
            </DialogTitle>
            <DialogContent style={{ overflowX: "hidden" }}>
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
                component={"span"}
              >
                <div style={{ margin: "auto" }}>
                  <p>Terms and Conditions File</p>
                  <Document
                    file="../Files/terms_and_conditions.pdf"
                    onLoadSuccess={this.onTocDocumentLoad}
                  >
                    {Array.from(
                      new Array(this.state.tocNumPages),
                      (el, index) => (
                        <Page
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          width={Math.min(900, window.innerWidth - 100)}
                        />
                      )
                    )}
                  </Document>
                </div>
                <p>Privacy Policy File</p>
                <Document
                  file="../Files/privacy_policy_no_cookie_policy.pdf"
                  onLoadSuccess={this.onPrivacyDocumentLoad}
                >
                  {Array.from(
                    new Array(this.state.privacyNumPages),
                    (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={Math.min(900, window.innerWidth - 100)}
                      />
                    )
                  )}
                </Document>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.disagree}
              >
                <b>Disagree</b>
              </Button>
              <Button
                onClick={this.handleAccept}
                variant="contained"
                type="submit"
                color="primary"
                className={classes.agree}
              >
                <b>Agree</b>
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            maxWidth={"md"}
            fullWidth={true}
            disableEscapeKeyDown
            disableBackdropClick
            onClose={this.handleStripeClose}
            aria-labelledby="stripe-dialog"
            open={this.state.openStripe}
          >
            <Stripe appContext={this.props.appContext} finalPage={this} />
          </Dialog>
        </Container>
      );
    }
  }
}

FinalPage = withMyHook(FinalPage);
FinalPage = withRouter(FinalPage);
export default withSnackbar(FinalPage);
