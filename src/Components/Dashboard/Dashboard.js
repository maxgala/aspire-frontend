import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { Route, Switch, Redirect } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import MaxLogo from "../Images/max_logo.png";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import Home from "./Home";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import MenuIcon from "@material-ui/icons/Menu";
import home from "../Images/navbar/home.svg";
import homeLabel from "../Images/navbar/home_web.svg";
import community from "../Images/navbar/community.svg";
import communityLabel from "../Images/navbar/community_web.svg";
import jobs from "../Images/navbar/jobs.svg";
import jobsLabel from "../Images/navbar/jobs_web.svg";
import chats from "../Images/navbar/chats.svg";
import chatsLabel from "../Images/navbar/chats_web.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Hidden } from "@material-ui/core";
import { Auth } from "aws-amplify";
import CoffeeChats from "./CoffeeChats";
import JobBoard from "./Jobs";
import ResumeBank from "./ResumeBank";
import Community from "./Community";
import Submissions from "./Submissions";
import { Routes } from "../../entry/routes/Routes";
import jwtDecode from "jwt-decode";

const drawerWidth = 300;

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
    "@media (max-width: 480px)": { width: "125px", height: "42px" },
    width: "150px",
    height: "50.21px",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  profile_container: {
    "@media (max-width: 963px)": {
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
    "@media (max-width: 963px)": { maxWidth: "100%" },
    maxWidth: "calc(100vw - 299px)",
    paddingTop: theme.spacing(0),
    paddingLeft: "0px",
    paddingRight: "0px",
    position: "relative",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-start",
    height: "10px",
    backgroundColor: "black",
    boxShadow: "none",
    width: "100%",
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },

  coffee_chats: {
    height: "80%",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
  },

  coffee_chats_focus: {
    height: "80%",
    padding: "0px",
    backgroundColor: "#B5A165",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
  },

  jobs: {
    height: "80%",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
  },

  jobs_focus: {
    height: "80%",
    padding: "0px",
    backgroundColor: "#B5A165",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
  },

  community: {
    height: "80%",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
  },

  community_focus: {
    height: "80%",
    padding: "0px",
    backgroundColor: "#B5A165",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
  },

  dashboard: {
    height: "80%",
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",

    "@media (max-width: 480px)": {
      marginLeft: "0px",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
    "&_focus": {
      backgroundColor: "#B5A165",
    },
  },

  dashboard_focus: {
    height: "80%",
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#B5A165",

    "@media (max-width: 480px)": {
      marginLeft: "0px",
    },
    "@media (max-width: 320px)": {
      minWidth: "50px",
    },
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
  },

  navbar_icons: {
    width: "20px",
    height: "20px",
    padding: "0px",
    "@media (min-width: 480px)": {
      display: "none",
    },
  },

  navbar_icons_with_Label: {
    width: "80px",
    height: "80px",
    padding: "0px",
    "@media (max-width: 480px)": {
      display: "none",
    },
  },

  user_profile: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    color: "#F1F1F1",
    borderRadius: "100%",
    padding: "0px",
    width: "60px",
    height: "60px",
    marginLeft: "20px",
    "&:hover": {
      backgroundColor: "#A9A9A9",
    },
    "@media (max-width: 480px)": {
      marginLeft: "0px",
      width: "45px",
      height: "45px",
    },
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "@media (max-width: 480px)": { marginRight: "0px" },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    const theme = useTheme();
    return <Component {...props} classes={classes} theme={theme} />;
  };
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      jobsAnchorEl: null,
      communityAnchorEl: null,
      signoutAnchorEl: null,
      user_type: jwtDecode(localStorage.getItem("idToken"))["custom:user_type"],
      editUserProfileAnchorEl: null,
      onFocus: "dashboard",
    };

    this.changeToCoffeeChats = this.changeToCoffeeChats.bind(this);
    this.changeToJobs = this.changeToJobs.bind(this);
    this.changeToSubmissions = this.changeToSubmissions.bind(this);
    this.changeToDashboard = this.changeToDashboard.bind(this);
    this.changeToCommunity = this.changeToCommunity.bind(this);
    this.changeToResumeBank = this.changeToResumeBank.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.changeToEditProfile = this.changeToEditProfile.bind(this);
  }

  handleJobsClick = (event) => {
    this.setState({ jobsAnchorEl: event.currentTarget });
  };

  handleCommunityClick = (event) => {
    this.setState({ communityAnchorEl: event.currentTarget });
  };

  handleSignoutClick = (event) => {
    this.setState({ signoutAnchorEl: event.currentTarget });
  };

  handleSelect = () => {
    this.setState({ jobsAnchorEl: null });
    this.setState({ communityAnchorEl: null });
    this.setState({ signoutAnchorEl: null });
  };

  setOpen(toggleValue) {
    this.setState({ open: toggleValue });
  }

  handleDrawerOpen = () => {
    this.setOpen(true);
  };

  handleDrawerClose = () => {
    this.setOpen(false);
  };

  changeToResumeBank() {
    this.handleSelect();
    this.state.onFocus = "community";
    this.props.history.push(Routes.ResumeBank);
  }

  changeToCommunity() {
    this.handleSelect();
    this.state.onFocus = "community";
    this.props.history.push(Routes.Members);
  }

  changeToCoffeeChats() {
    this.handleSelect();
    this.state.onFocus = "coffeechat";
    this.props.history.push(Routes.Coffee);
  }

  changeToJobs() {
    this.handleSelect();
    this.state.onFocus = "jobs";
    this.props.history.push(Routes.Jobs);
  }

  changeToSubmissions() {
    this.handleSelect();
    this.props.history.push(Routes.Submissions);
  }

  changeToDashboard() {
    this.handleSelect();
    this.state.onFocus = "dashboard";
    this.props.history.push(Routes.Dashboard);
  }

  changeToEditProfile = () => {
    this.handleSelect();
    this.props.history.push(Routes.EditProfile);
  };

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
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <Tooltip title="User Profile">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuOpenIcon />
              </IconButton>
            </Tooltip>
            <Hidden xsDown>
              <div className={classes.navLogo} onClick={this.handleClick}>
                <img
                  src={MaxLogo}
                  alt="MAX_logo"
                  className={classes.img}
                  onClick={this.changeToDashboard}
                />
              </div>
            </Hidden>
            <Button
              variant="outlined"
              className={
                this.state.onFocus === "dashboard"
                  ? classes.dashboard_focus
                  : classes.dashboard
              }
              onClick={this.changeToDashboard}
            >
              {/*Icons without labels appear only when screen width <= 480px */}
              <img
                className={classes.navbar_icons}
                src={home}
                alt={"Home Tab"}
              />

              {/*Icons with labels appear only when screen width > 480px */}
              <img
                className={classes.navbar_icons_with_Label}
                src={homeLabel}
                alt={"Home Tab"}
              />
            </Button>
            <Button
              variant="outlined"
              className={
                this.state.onFocus === "coffeechat"
                  ? classes.coffee_chats_focus
                  : classes.coffee_chats
              }
              onClick={this.changeToCoffeeChats}
            >
              <img
                className={classes.navbar_icons}
                src={chats}
                alt={"Coffee Chats Tab"}
              />

              <img
                className={classes.navbar_icons_with_Label}
                src={chatsLabel}
                alt={"Coffee Chats Tab"}
              />
            </Button>
            <Button
              variant="outlined"
              className={
                this.state.onFocus === "jobs"
                  ? classes.jobs_focus
                  : classes.jobs
              }
              onClick={this.handleJobsClick}
            >
              <img
                className={classes.navbar_icons}
                src={jobs}
                alt={"Jobs Tab"}
              />

              <img
                className={classes.navbar_icons_with_Label}
                src={jobsLabel}
                alt={"Jobs Tab"}
              />
            </Button>
            <Menu
              id="simple-menu2"
              anchorEl={this.state.jobsAnchorEl}
              keepMounted
              open={Boolean(this.state.jobsAnchorEl)}
              onClose={() => {
                this.setState({ jobsAnchorEl: null });
              }}
              style={{ marginTop: "45px" }}
            >
              <MenuItem key={"postings"} onClick={this.changeToJobs}>
                Job Board
              </MenuItem>
              <MenuItem
                key={"view_submissions"}
                onClick={this.changeToSubmissions}
              >
                View Submissions
              </MenuItem>
            </Menu>
            <Button
              variant="outlined"
              className={
                this.state.onFocus === "community"
                  ? classes.community_focus
                  : classes.community
              }
              onClick={this.handleCommunityClick}
            >
              <img
                className={classes.navbar_icons}
                src={community}
                alt={"Community Tab"}
              />

              <img
                className={classes.navbar_icons_with_Label}
                src={communityLabel}
                alt={"Community Tab"}
              />
            </Button>
            <Menu
              id="simple-menu1"
              anchorEl={this.state.communityAnchorEl}
              keepMounted
              open={Boolean(this.state.communityAnchorEl)}
              onClose={() => {
                this.setState({ communityAnchorEl: null });
              }}
              style={{ marginTop: "45px" }}
            >
              <MenuItem key={"community"} onClick={this.changeToCommunity}>
                Show Members
              </MenuItem>
              {this.state.user_type === "MENTOR" ? (
                <MenuItem key={"resume_bank"} onClick={this.changeToResumeBank}>
                  Resume Bank
                </MenuItem>
              ) : null}
            </Menu>
            <Button
              variant="outlined"
              className={classes.user_profile}
              onClick={this.handleSignoutClick}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu3"
              anchorEl={this.state.signoutAnchorEl}
              keepMounted
              open={Boolean(this.state.signoutAnchorEl)}
              onClose={() => {
                this.setState({ signoutAnchorEl: null });
              }}
              style={{ marginTop: "45px" }}
            >
              <MenuItem key={"userprofile"} onClick={this.changeToEditProfile}>
                User Profile
              </MenuItem>
              <MenuItem key={"signout"} onClick={this.signout}>
                Sign Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={this.state.open}
          onClose={this.handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <MenuOpenIcon />
            </IconButton>
          </div>
          <UserProfile />
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div className="Dashboard">
            <Switch>
              <Route exact={true} path={Routes.Coffee}>
                <CoffeeChats appContext={this} />
              </Route>
              <Route exact={true} path={Routes.Jobs}>
                <JobBoard appContext={this} />
              </Route>
              <Route exact={true} path={Routes.Submissions}>
                <Submissions appContext={this} />
              </Route>
              <Route exact={true} path={Routes.Members}>
                <Community appContext={this} />
              </Route>
              <Route exact={true} path={Routes.ResumeBank}>
                <ResumeBank appContext={this} />
              </Route>
              <Route exact={true} path={Routes.Dashboard}>
                <Home />
              </Route>
              <Route exact={true} path={Routes.EditProfile}>
                <EditProfile appContext={this} />
              </Route>
              <Redirect to={Routes.Dashboard} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

Dashboard = withMyHook(Dashboard);
Dashboard = withRouter(Dashboard);

export default Dashboard;
