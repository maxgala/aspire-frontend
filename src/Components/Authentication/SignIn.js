import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import jwtDecode from "jwt-decode";
import { withRouter } from "react-router";
import { Routes } from "../../entry/routes/Routes";
import { UserStore } from "../../stores/UserStore";

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
  circleProgress: {
    marginTop: "2%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-start",
    height: "10vh",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
      isSeniorExec: false,
      signedIn: false,
      barDisplay: "None",
      buttonDisplay: "",
      errorMessage: "",
      verified: true,
      verfiedCode: "",
      codeMessage: "Resend the code?",
    };
  }

  changeToLanding = (event) => {
    this.props.history.push(Routes.Landpage);
  };

  changeToSignUp = (event) => {
    this.props.history.push(Routes.Register);
  };

  handleVerififedCodeChange = (event) => {
    this.setState({ verfiedCode: event.target.value });
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  signIn() {
    const username = this.state.username;
    const password = this.state.password;
    return Auth.signIn({
      username: username,
      password: password,
    })
      .then(async () => {
        await Auth.currentSession().then((res) => {
          let jwt = res.getAccessToken().getJwtToken();
          localStorage.setItem("idToken", res.getIdToken().getJwtToken());
          localStorage.setItem("accessToken", jwt);

          let userProfile = jwtDecode(localStorage.getItem("idToken"));
          localStorage.setItem("userProfile", JSON.stringify(userProfile));

          let userGroups = res.getIdToken().payload["custom:user_type"];
          if (userGroups.includes("ADMIN")) {
            this.setState({
              isAdmin: true,
            });
          } else if (userGroups.includes("MENTOR")) {
            this.setState({
              isSeniorExec: true,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "UserNotConfirmedException") {
          this.setState({
            verified: false,
            barDisplay: "None",
            buttonDisplay: "",
          });
          return null;
        }
        this.setState({
          errorMessage: err.message,
          barDisplay: "None",
          buttonDisplay: "",
        });
        return null;
      });
  }

  resendCode = async (event) => {
    await Auth.resendSignUp(this.state.username).then(() => {
      this.setState({
        codeMessage: "Code has been emailed to you. Click here to resend code",
      });
    });
  };

  handleVerify = async (event) => {
    this.setState({
      errorMessage: "",
      codeMessage: "Resend Code",
    });
    await Auth.confirmSignUp(this.state.username, this.state.verfiedCode)
      .then(() => {
        this.setState({ signedIn: true });
        if (this.state.isAdmin === true) {
          this.props.history.push(Routes.AdminDashboard);
        } else {
          this.props.history.push(Routes.Dashboard);
          UserStore.isSeniorExec = this.state.isSeniorExec;
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: "Wrong Code",
        });
        return;
      });
  };

  handleClick = async (event) => {
    this.setState({
      errorMessage: "",
    });
    if (
      this.state.username === "" ||
      this.state.username === undefined ||
      this.state.password === "" ||
      this.state.password === undefined
    ) {
      this.setState({
        errorMessage: "Not all fields are filled in",
      });
      return;
    }
    try {
      this.setState({
        buttonDisplay: "None",
        barDisplay: "",
      });
      await this.signIn().then((val) => {
        if (val === null) {
          return;
        }
        this.setState({ signedIn: true });
        if (this.state.isAdmin === true) {
          this.props.history.push(Routes.AdminDashboard);
        } else {
          UserStore.isSeniorExec = this.state.isSeniorExec;
          this.props.history.push(Routes.Dashboard);
        }
      });
    } catch (err) {
      window.alert(`Error singing in - ${err}`);
      return;
    }
  };

  //"UserNotConfirmedException"
  render() {
    const classes = this.props.classes;
    if (this.state.verified === false) {
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
              <Typography component="h1" variant="body1">
                <b style={{ color: "Red" }}>{this.state.username}</b> has not
                been verifed. <br />
                Please enter the verification code below:
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                id="code"
                label="Verification Code"
                name="code"
                autoFocus
                value={this.state.verfiedCode}
                onChange={this.handleVerififedCodeChange}
              />
              <CircularProgress
                style={{ display: this.state.barDisplay }}
                className={classes.circleProgress}
              />
              <Button
                type="submit"
                style={{ display: this.state.buttonDisplay }}
                variant="contained"
                className={classes.button}
                onClick={this.handleVerify}
              >
                Verify User
              </Button>
              <br />
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    component="h1"
                    variant="body1"
                    color={"secondary"}
                  >
                    <b> {this.state.errorMessage}</b>
                  </Typography>
                </Grid>
                <Grid
                  style={{ display: this.state.buttonDisplay }}
                  item
                  xs={12}
                >
                  <Link
                    style={{ cursor: "Pointer" }}
                    variant="body1"
                    color={"secondary"}
                    onClick={this.resendCode}
                  >
                    <b>{this.state.codeMessage}</b>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      );
    }
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
              Sign in
            </Typography>
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.handleClick();
                }
              }}
            />
            <CircularProgress
              style={{ display: this.state.barDisplay }}
              className={classes.circleProgress}
            />
            <Button
              type="submit"
              style={{ display: this.state.buttonDisplay }}
              variant="contained"
              className={classes.button}
              onClick={this.handleClick}
            >
              Sign In
            </Button>
            <br />
            <Grid container>
              <Grid item xs={12}>
                <Typography component="h1" variant="body1" color={"secondary"}>
                  <b> {this.state.errorMessage}</b>
                </Typography>
              </Grid>
              <Grid style={{ display: this.state.buttonDisplay }} item xs={12}>
                <Link href="#" variant="body1">
                  <b>Forgot your password?</b>
                </Link>
              </Grid>
              <Grid style={{ display: this.state.buttonDisplay }} item xs={12}>
                <Link
                  href="#"
                  variant="body1"
                  color={"secondary"}
                  onClick={this.changeToSignUp}
                >
                  <b>Don't have an account?</b>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SignIn = withMyHook(SignIn);
SignIn = withRouter(SignIn);
export default SignIn;
