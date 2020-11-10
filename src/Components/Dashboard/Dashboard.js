import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import UserProfile from "./UserProfile";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "./Home";
import CoffeeChats from "./CoffeeChats";
import Jobs from "./Jobs";
import Community from "./Community";
import ResumeBank from "./ResumeBank";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import home from "../Images/navbar/home_web.svg";
import community from "../Images/navbar/community_web.svg";
import jobs from "../Images/navbar/jobs_web.svg";
import chats from "../Images/navbar/chats_web.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Hidden } from "@material-ui/core";

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
    "@media (max-width: 480px)": { width: "125px" },
    width: "150px",
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
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
  },
  jobs: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
  },
  community: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "18px",
    padding: "0px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
  },
  dashboard: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    marginLeft: "auto",
    "@media (max-width: 480px)": {
      marginLeft: "0px",
    },
    padding: "0px",
    fontSize: "18px",
    "&:hover": {
      backgroundColor: "#B5A165",
    },
  },

  navbar_icons: {
    width: "80px",
    height: "50px",
    padding: "0px",
    "@media (max-width: 480px)": {
      width: "60px",
      height: "40px",
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
      currentScreen: [],
      open: true,
      jobsAnchorEl: null,
      communityAnchorEl: null,
    };

    this.changeToCoffeeChats = this.changeToCoffeeChats.bind(this);
    this.changeToJobs = this.changeToJobs.bind(this);
    this.changeToDashboard = this.changeToDashboard.bind(this);
    this.changeToCommunity = this.changeToCommunity.bind(this);
    this.changeToResumeBank = this.changeToResumeBank.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleJobsClick = (event) => {
    this.setState({ jobsAnchorEl: event.currentTarget });
  };

  handleCommunityClick = (event) => {
    this.setState({ communityAnchorEl: event.currentTarget });
  };

  handleSelect = () => {
    this.setState({ jobsAnchorEl: null });
    this.setState({ communityAnchorEl: null });
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

  componentDidMount() {
    this.setState({
      currentScreen: (
        <Home appContext={this} isSeniorExec={this.props.isSeniorExec} />
      ),
    });
  }

  changeToResumeBank() {
    this.handleSelect();
    this.setState({
      currentScreen: (
        <ResumeBank appContext={this} isSeniorExec={this.props.isSeniorExec} />
      ),
    });
  }

  changeToCommunity() {
    this.handleSelect();
    this.setState({
      currentScreen: (
        <Community appContext={this} isSeniorExec={this.props.isSeniorExec} />
      ),
    });
  }

  changeToCoffeeChats() {
    this.handleSelect();
    this.setState({
      currentScreen: (
        <CoffeeChats appContext={this} isSeniorExec={this.props.isSeniorExec} />
      ),
    });
  }

  changeToJobs() {
    this.handleSelect();
    this.setState({
      currentScreen: (
        <Jobs appContext={this} isSeniorExec={this.props.isSeniorExec} />
      ),
    });
  }

  changeToDashboard() {
    this.handleSelect();
    this.setState({
      currentScreen: (
        <Home appContext={this} isSeniorExec={this.props.isSeniorExec} />
      ),
    });
  }

  render() {
    const classes = this.props.classes;
    const theme = this.props.theme;
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
              <MenuIcon />
            </IconButton>
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
              className={classes.dashboard}
              onClick={this.changeToDashboard}
            >
              <img
                className={classes.navbar_icons}
                src={home}
                alt={"Home Tab"}
              />
            </Button>
            <Button
              variant="outlined"
              className={classes.coffee_chats}
              onClick={this.changeToCoffeeChats}
            >
              <img
                className={classes.navbar_icons}
                src={chats}
                alt={"Coffee Chats Tab"}
              />
            </Button>
            <Button
              variant="outlined"
              className={classes.jobs}
              onClick={this.handleJobsClick}
            >
              <img
                className={classes.navbar_icons}
                src={jobs}
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
                Postings
              </MenuItem>
              <MenuItem key={"view_submissions"} onClick={this.changeToJobs}>
                View Submissions
              </MenuItem>
            </Menu>
            <Button
              variant="outlined"
              className={classes.community}
              onClick={this.handleCommunityClick}
            >
              <img
                className={classes.navbar_icons}
                src={community}
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
              <MenuItem key={"resume_bank"} onClick={this.changeToResumeBank}>
                Resume Bank
              </MenuItem>
            </Menu>
            <Button
              variant="outlined"
              className={classes.user_profile}
              onClick={this.openUserProfile}
            >
              <FontAwesomeIcon
                icon={faReact}
                style={{ width: "35px", height: "35px" }}
              />
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
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
          <div className="Dashboard">{this.state.currentScreen}</div>
        </main>
      </div>
    );
  }
}

Dashboard = withMyHook(Dashboard);
export default Dashboard;
