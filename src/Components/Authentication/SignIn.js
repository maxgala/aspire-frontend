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
import Registration from "../Registration/Registration";
import Landing from "../LandingPage/Landing";
import signInImage from "../Images/aboutMax.jpg";
import Dashboard from "../Dashboard/Dashboard";
import { authenticate } from "../../lib/authentication";
import jwtDecode from "jwt-decode";
import AdminDashboard from "../Admin/Dashboard";

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
    width: "80vw",
    justifyContent: "start",
  },
  // this css element describes the size of the image
  img: {
    float: "left",
    align: "left",
    "@media (max-width: 480px)": { width: "125px" },
    width: "175px",
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
  toolbar: {
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
    };
  }

  changeToLanding = (event) => {
    this.props.appContext.setState({
      currentScreen: <Landing appContext={this.props.appContext} />,
    });
  };

  changeToSignUp = (event) => {
    this.props.appContext.setState({
      currentScreen: <Registration appContext={this.props.appContext} />,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleClick2 = () => {
    this.props.appContext.setState({
      currentScreen: (
        <AdminDashboard
          appContext={this.props.appContext}

        />
      ),
    });
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleClick = async (event) => {
    if (
      this.state.username === "" ||
      this.state.username === undefined ||
      this.state.password === "" ||
      this.state.password === undefined
    ) {
      window.alert("Not filled in");
      return;
    }

    try {
      await authenticate(
        this.state.username,
        this.state.password
      );
      var userProfile = jwtDecode(localStorage.getItem("idToken"));
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    } catch (err) {
      // TODO: Block user from continuing
      console.error("Authentication failed. " + err);
    }

    // TODO: Get information from AWS cognito pool
    // TODO: Check what role the user is, will redirect to different dashboard
    let isSeniorExec = false; // will set this based on role
    this.props.appContext.setState({
      currentScreen: (
        <Dashboard
          appContext={this.props.appContext}
          isSeniorExec={isSeniorExec}
        />
      ),
    });
  };

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
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
              onClick={this.handleClick}
            >
              Sign In
            </Button>
            <Button
              className={classes.button}
              onClick={this.handleClick2}
            >
              Admin
            </Button>
            <br />
            <Grid container>
              <Grid item xs={12}>
                <Link href="#" variant="body1">
                  <b>Forgot your password?</b>
                </Link>
              </Grid>
              <Grid item xs={12}>
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
export default SignIn;
