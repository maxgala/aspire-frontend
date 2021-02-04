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
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
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

class TempPasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm_password: "",
      current_password: "",
      passwordStrength: this.props.prev ? this.props.prev.passwordStrength : "",
      errorDisplay: "",
      showLoader: false,
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

  handleCurrentPasswordChange = (event) => {
    this.setState({ current_password: event.target.value });
  };

  handleConfirmCheck = (event) => {
    this.setState({
      confirm_password: event.target.value,
    });
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

  changePassword = () => {
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.current_password === "" ||
      this.state.confirm_password === ""
    ) {
      this.props.enqueueSnackbar("Please fill out all the fields", {
        variant: "error",
      });
      return;
    }
    if (this.state.password !== this.state.confirm_password) {
      this.props.enqueueSnackbar(
        "New password and confirm password fields do not match!",
        {
          variant: "error",
        }
      );
      return;
    }

    this.setState({
      showLoader: true,
    });
    Auth.signIn(this.state.username, this.state.current_password)
      .then((user) => {
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          Auth.completeNewPassword(
            user, // the Cognito User Object
            this.state.password // the new password
          )
            .then((user) => {
              this.props.enqueueSnackbar("Successfully updated your password", {
                variant: "success",
              });
              this.setState({
                showLoader: false,
              });
              this.props.history.push(Routes.Login);
            })
            .catch((err) => {
              console.log(err);
              this.props.enqueueSnackbar(
                "Unable to update your password: " + err.message,
                {
                  variant: "error",
                }
              );
              this.setState({
                showLoader: false,
              });
            });
        }
      })
      .catch((err) => {
        this.setState({
          showLoader: false,
        });
        console.log(err);
        this.props.enqueueSnackbar(
          "Unexpected error. Please contact support at aspire@maxgala.com",
          {
            variant: "error",
          }
        );
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img src={MaxBrand} alt="MAX_brand" className={classes.avatar} />
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <p>{"\n"}</p>
            <Typography component="h5" variant="subtitle1">
              Temporary passwords must be changed to login
            </Typography>
            <p>{"\n"}</p>
            <div className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="username"
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    id="email-address"
                    autoComplete="email-address"
                    onChange={this.handleUsernameChange}
                  />
                  <p>{"\n"}</p>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="temporary password"
                    label="Enter Temporary Password"
                    placeholder="Enter Temporary Password"
                    type="password"
                    id="temporary-password"
                    autoComplete="temporary-password"
                    onChange={this.handleCurrentPasswordChange}
                  />
                  <PasswordField
                    fieldId="password"
                    label="Password"
                    placeholder="Enter New Password*"
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
                    label="Confirm New Password"
                    placeholder="Confirm New Password"
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
                  {this.state.showLoader ? (
                    <CircularProgress className={classes.circleProgress} />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.changePassword}
                    >
                      <b>Change Password</b>
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

TempPasswordChange = withMyHook(TempPasswordChange);
TempPasswordChange = withRouter(TempPasswordChange);
export default withSnackbar(TempPasswordChange);
