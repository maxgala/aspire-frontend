import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import { Auth } from "aws-amplify";

import Home from "./SeniorExecs";
import Professionals from "./AspiringProfessionals";
import Jobs from "./JobPosts";
import AdminCoffeeChats from "./AdminCoffeeChats";
import Escalations from "./Escalations";
import Onboarding from "./Onboarding";
import { withRouter } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../../entry/routes/Routes";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  navLogo: {
    display: "flex",
    justifyContent: "start",
  },
  img: {
    float: "left",
    align: "left",
    "@media (max-width: 480px)": { width: "125px" },
    width: "150px",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "#eaeaea",
    height: "100vh",
  },
  profile_container: {
    "@media (max-width: 750px)": {
      width: "0px",
      display: "None",
    },
    width: "300px",
    paddingTop: theme.spacing(0),
    paddingLeft: "0px",
    paddingRight: "0px",
    position: "relative",
  },
  dashboard_container: {
    "@media (max-width: 750px)": { maxWidth: "100%" },
    //maxWidth: 'calc(100vw - 299px)',
    width: "100%",
    paddingTop: theme.spacing(0),
    paddingLeft: "0px",
    paddingRight: "0px",
    position: "relative",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-start",
    height: "10vh",
    backgroundColor: "black",
    boxShadow: "none",
    width: "100%",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  coffee_chat_text: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    marginLeft: "auto",
    fontSize: "18px",
    color: "#F1F1F1",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  text: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    color: "#F1F1F1",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  dashboard_text: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    color: "#F1F1F1",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  user_profile: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    color: "#F1F1F1",
    borderRadius: "100%",
    align: "right",
    "&:hover": {
      backgroundColor: "red",
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.changeToProfessionals = this.changeToProfessionals.bind(this);
    this.changeToJobs = this.changeToJobs.bind(this);
    this.changeToSeniorExecs = this.changeToSeniorExecs.bind(this);
    this.changeToAdminCoffeeChats = this.changeToAdminCoffeeChats.bind(this);
    this.changeToEscalations = this.changeToEscalations.bind(this);
    this.changeToOnboarding = this.changeToOnboarding.bind(this);
  }

  changeToEscalations() {
    this.props.history.push(`${Routes.AdminDashboard}/escalation`);
  }

  changeToAdminCoffeeChats() {
    this.props.history.push(`${Routes.AdminDashboard}/coffee`);
  }

  changeToProfessionals() {
    this.props.history.push(`${Routes.AdminDashboard}/professional`);
  }

  changeToJobs() {
    this.props.history.push(`${Routes.AdminDashboard}/jobs`);
  }

  changeToSeniorExecs() {
    this.props.history.push(`${Routes.AdminDashboard}`);
  }

  changeToOnboarding() {
    this.props.history.push(`${Routes.AdminDashboard}/onboarding`);
  }

  signout = async () => {
    try {
      await Auth.signOut();
      this.props.history.push(Routes.Landpage);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.navLogo} onClick={this.handleClick}>
            <img
              src={MaxLogo}
              alt="MAX_logo"
              className={classes.img}
              onClick={this.changeToSeniorExecs}
            />
          </div>
          <Button
            variant="outlined"
            className={classes.text}
            onClick={this.changeToAdminCoffeeChats}
          >
            <b>Coffee Chats</b>
          </Button>

          <Button
            variant="outlined"
            className={classes.text}
            onClick={this.changeToProfessionals}
          >
            <b>Aspiring Professional</b>
          </Button>
          <Button
            variant="outlined"
            className={classes.text}
            onClick={this.changeToJobs}
          >
            <b>Job Posts</b>
          </Button>
          <Button
            variant="outlined"
            className={classes.dashboard_text}
            onClick={this.changeToSeniorExecs}
          >
            <b>Senior Execs</b>
          </Button>
          <Button
            variant="outlined"
            className={classes.text}
            onClick={this.changeToOnboarding}
          >
            <b>Onboarding</b>
          </Button>
          <Button
            variant="outlined"
            className={classes.user_profile}
            onClick={this.signout}
          >
            <b>Log out</b>
          </Button>
        </Toolbar>
        <Switch>
          <div className="Dashboard">
            <Route path={`${Routes.AdminDashboard}/escalation`}>
              <Escalations appContext={this} />
            </Route>
            <Route path={`${Routes.AdminDashboard}/coffee`}>
              <AdminCoffeeChats appContext={this} />
            </Route>
            <Route path={`${Routes.AdminDashboard}/professional`}>
              <Professionals appContext={this} />
            </Route>
            <Route path={`${Routes.AdminDashboard}/jobs`}>
              <Jobs appContext={this} />
            </Route>
            <Route exact path={`${Routes.AdminDashboard}`}>
              <Home appContext={this} />
            </Route>
            <Route path={`${Routes.AdminDashboard}/onboarding`}>
              <Onboarding appContext={this} />
            </Route>
          </div>
        </Switch>
      </div>
    );
  }
}

Dashboard = withMyHook(Dashboard);
Dashboard = withRouter(Dashboard);
export default Dashboard;
