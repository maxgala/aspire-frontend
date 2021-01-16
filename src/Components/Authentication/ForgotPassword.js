import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import MaxBrand from "../Images/max_brand_logo.png";
import AppBar from "@material-ui/core/AppBar";
import signInImage from "../Images/aboutMax.jpg";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router";
import { Routes } from "../../entry/routes/Routes";
import FormHelperText from "@material-ui/core/FormHelperText";
import PasswordField from "../Registration/PasswordField";
import Tooltip from "@material-ui/core/Tooltip";
import { withSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  appBarSpacer: theme.mixins.toolbar,
  // appBar background restrictions for transparency
  appBar: {
    backgroundColor: "rgba(0,0,0, 0.9)",
    boxShadow: "none",
  },
  // this css element is for the div containing the image
  // this is used so that we can align the image to the right
  imageLogo: {
    display: "flex",
    justifyContent: "start",
  },
  // this css element describes the size of the image
  img: {
    float: "left",
    align: "left",
    "@media (max-width: 480px)": { width: "125px", height: "42px" },
    width: "175px",
    height: "58.58px",
    "&:hover": {
      cursor: "pointer",
      filter: "sepia(60%)",
    },
  },
  image: {
    backgroundImage: `url(${signInImage})`, //'url(https://i.picsum.photos/id/1003/1181/1772.jpg)',
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: "10vh",
    width: "100px",
    height: "100px",
    padding: "1vw",
  },
  circleProgress: {
    marginTop: "2%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-start",
    height: "10vh",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    backgroundColor: "#6EA0B5",
    marginTop: "2%",
    height: 50,
    width: "50%",
    borderRadius: 50,
    color: "white",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verification_code: "",
      code_sent: false,
      passwordStrength: this.props.prev ? this.props.prev.passwordStrength : "",
      errorDisplay: "",
    };
  }

  changeToLanding = (event) => {
    this.props.history.push(Routes.Landpage);
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleVerificationCodeChange = (event) => {
    this.setState({ verification_code: event.target.value });
  };

  handleConfirmCheck = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({
        errorDisplay: "None",
      });
    } else {
      this.setState({
        errorDisplay: "",
      });
    }
  };

  forgotPassword = async () => {
    await Auth.forgotPassword(this.state.username)
      .then((data) => {
        this.setState({ code_sent: true });
      })
      .catch((err) => console.log(err));
  };

  resetPassword = async () => {
    await Auth.forgotPasswordSubmit(
      this.state.username,
      this.state.verification_code,
      this.state.password
    )
      .then((data) => {
        this.props.enqueueSnackbar("Successfully reset your password");
        this.props.history.push(Routes.Landpage);
      })
      .catch((err) => {
        console.log(err);
        this.props.enqueueSnackbar("Unable to reset your password");
        this.props.history.push(Routes.Landpage);
      });
  };

  fieldStateChanged = (field) => (state) => {
    if (field !== "passwordStrength") {
      this.setState({ [field]: state.errors.length === 0 });
    } else if (field === "passwordStrength") {
      this.setState({
        passwordStrength: state.errors.length === 0,
        password: state.value,
      });
    }
  };

  passwordChanged = this.fieldStateChanged("passwordStrength");

  render() {
    const classes = this.props.classes;
    if (this.state.code_sent === true) {
      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.imageLogo}>
                <img
                  src={MaxLogo}
                  alt="MAX_logo"
                  onClick={this.changeToLanding}
                  className={classes.img}
                />
              </div>
            </Toolbar>
          </AppBar>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <img src={MaxBrand} alt="MAX_brand" className={classes.avatar} />
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <p>{"\n"}</p>
              <Typography component="h7">
                Enter the verification code and the new password
              </Typography>
              <div className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="verification_code"
                      label="Verficiation Code"
                      name="verification_code"
                      autoComplete="verification_code"
                      autoFocus
                      value={this.state.verification_code}
                      onChange={this.handleVerificationCodeChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <PasswordField
                      fieldId="password"
                      label="Password"
                      placeholder="Enter Password*"
                      onStateChanged={this.passwordChanged}
                      thresholdLength={7}
                      minStrength={3}
                      required
                    />
                    <Tooltip
                      title={`Password strength-bar must be 4/5 filled. Passwords need to be at least 7 characters long and
                      contain a combination of at least 1 lowercase, uppercase, number, & special
                      character`}
                    >
                      <Typography
                        variant="caption"
                        style={{ color: "grey", cursor: "pointer" }}
                        display="block"
                        gutterBottom
                      >
                        Hover here to view our Password Criteria
                      </Typography>
                    </Tooltip>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirm password"
                      label="Confirm Password"
                      placeholder="Enter Password"
                      type="password"
                      id="password-confirm"
                      autoComplete="current-password"
                      onChange={this.handleConfirmCheck}
                    />
                    <FormHelperText
                      style={{
                        display: this.state.errorDisplay,
                        color: "#c00",
                        marginLeft: "30%",
                      }}
                      id="component-error-text"
                    >
                      {" "}
                      <b>Passwords do not match </b>
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.resetPassword}
                    >
                      <b>Reset Password</b>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <div className={classes.imageLogo}>
                <img
                  src={MaxLogo}
                  alt="MAX_logo"
                  onClick={this.changeToLanding}
                  className={classes.img}
                />
              </div>
            </Toolbar>
          </AppBar>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <img src={MaxBrand} alt="MAX_brand" className={classes.avatar} />
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <p>{"\n"}</p>
              <Typography component="h7">
                Enter your email address and we will send you a link with a code
                to reset your password
              </Typography>
              <div className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={this.state.username}
                      onChange={this.handleUsernameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.forgotPassword}
                    >
                      <b>Send Code</b>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      );
    }
  }
}

ForgotPassword = withMyHook(ForgotPassword);
ForgotPassword = withRouter(ForgotPassword);
export default withSnackbar(ForgotPassword);
