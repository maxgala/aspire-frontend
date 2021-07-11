import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import { Route, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import FirstPage from "./FirstPage";
import { Routes } from "../../entry/routes/Routes";
import { withRouter } from "react-router-dom";
import SecondPage from "./SecondPage";
import ThirdPage from "./ThirdPage";
import FinalPage from "./FinalPage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
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
    "@media (max-width: 480px)": { width: "125px", height: "42px" },
    width: "175px",
    height: "58.58px",
    "&:hover": {
      cursor: "pointer",
      filter: "sepia(60%)",
    },
  },
  image: {
    backgroundImage: "url(https://i.picsum.photos/id/1003/1181/1772.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationScreen: [],
      prev: {},
    };
  }

  changeToLanding = () => {
    this.props.history.push(Routes.Landpage);
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
        <Switch>
          <Route exact={true} path={Routes.Register}>
            <FirstPage
              appContext={this}
              prev={this.state.prev}
              setPrev={(prev) => this.setState({ prev })}
            />
          </Route>
          <Route exact={true} path={`${Routes.Register}/2`}>
            <SecondPage
              appContext={this}
              prev={this.state.prev}
              setPrev={(prev) => this.setState({ prev })}
            />
          </Route>
          <Route exact={true} path={`${Routes.Register}/3`}>
            <ThirdPage
              appContext={this}
              prev={this.state.prev}
              setPrev={(prev) => this.setState({ prev })}
            />
          </Route>
          <Route exact={true} path={`${Routes.Register}/4`}>
            <FinalPage
              appContext={this}
              prev={this.state.prev}
              setPrev={(prev) => this.setState({ prev })}
            />
          </Route>
        </Switch>
      </Grid>
    );
  }
}

Registration = withMyHook(Registration);
Registration = withRouter(Registration);
export default Registration;
