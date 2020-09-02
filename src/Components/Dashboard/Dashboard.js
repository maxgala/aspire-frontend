import React, {Component} from 'react';
import clsx from 'clsx';

import {makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import UserProfile from "./UserProfile";
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from "./Home";
import CoffeeChats from "./CoffeeChats";
import Jobs from "./Jobs";
import Community from "./Community";
import ResumeBank from "./ResumeBank";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const drawerWidth = 300;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  navLogo:{
    display: 'flex',
    justifyContent: 'start'
  },
  img: {
    float: 'left',
    align: 'left',
    '@media (max-width: 480px)': {width: '125px'},
    width: '150px',
    cursor: 'pointer'
  },
  
  profile_container: {
    '@media (max-width: 750px)': {
      width: '0px',
      display: 'None'
    },
    width: '300px',
    paddingTop: theme.spacing(0),
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'relative'
  },
  dashboard_container: {
    '@media (max-width: 750px)': {maxWidth: '100%'},
    maxWidth: 'calc(100vw - 299px)',
    paddingTop: theme.spacing(0),
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'relative'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '10px',
    backgroundColor: 'black',
    boxShadow: 'none',
    width: '100%',
  },
  grid: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coffee_chat_text: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    marginLeft: 'auto',
    fontSize: '18px',
    color: "#F1F1F1",
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  jobs_text: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: '18px',
    color: "#F1F1F1",
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  dashboard_text: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: '18px',
    color: "#F1F1F1",
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  user_profile: {
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: '18px',
    color: "#F1F1F1",
    borderRadius: '100%',
    width: '60px',
    height: '60px',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    const theme= useTheme();
    return <Component {...props} classes={classes} theme={theme}/>
  }
}

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: [],
      open: true,
      
    }
    this.changeToCoffeeChats = this.changeToCoffeeChats.bind(this);
    this.changeToJobs = this.changeToJobs.bind(this);
    this.changeToDashboard = this.changeToDashboard.bind(this);
    this.changeToCommunity=this.changeToCommunity.bind(this);
    this.changeToResumeBank=this.changeToResumeBank.bind(this);

    this.setOpen = this.setOpen.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  setOpen(toggleValue) {
    this.setState({open: toggleValue})
  }

  handleDrawerOpen = () => {
    this.setOpen(true);
  };

  handleDrawerClose = () => {
    this.setOpen(false);
  };

  componentDidMount() {
    this.setState({
      currentScreen: <Home appContext={this} isSeniorExec={this.props.isSeniorExec}/>
    })
  }
  changeToResumeBank() {
    this.setState({
      currentScreen: <ResumeBank appContext={this} isSeniorExec={this.props.isSeniorExec}/>
    }) 
  }

  changeToCommunity() {
    this.setState({
      currentScreen: <Community appContext={this} isSeniorExec={this.props.isSeniorExec}/>
    }) 
  }

  changeToCoffeeChats() {
    this.setState({
      currentScreen: <CoffeeChats appContext={this} isSeniorExec={this.props.isSeniorExec}/>
    }) 
  }

  changeToJobs() {
    this.setState({
      currentScreen: <Jobs appContext={this} isSeniorExec={this.props.isSeniorExec}/>
    }) 
  }

  changeToDashboard() {
    this.setState({
      currentScreen: <Home appContext={this} isSeniorExec={this.props.isSeniorExec}/>
    }) 
  }

  render(){
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
                  className={clsx(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <div className={classes.navLogo} onClick={this.handleClick}>
                  <img src={MaxLogo} alt="MAX_logo" className={classes.img} onClick={this.changeToDashboard}/>
                </div>
                <Button
                  variant="outlined"
                  className={classes.coffee_chat_text}
                  onClick={this.changeToResumeBank}
                >
                  <b>Resume Bank</b>
                </Button>
                <Button
                  variant="outlined"
                  className={classes.jobs_text}
                  onClick={this.changeToCommunity}
                >
                  <b>Community</b>
                </Button>

                <Button
                  variant="outlined"
                  className={classes.jobs_text}
                  onClick={this.changeToCoffeeChats}
                >
                  <b>Coffee Chats</b>
                </Button>
                <Button
                  variant="outlined"
                  className={classes.jobs_text}
                  onClick={this.changeToJobs}
                >
                  <b>Jobs</b>
                </Button>
                <Button
                  variant="outlined"
                  className={classes.dashboard_text}
                  onClick={this.changeToDashboard}
                >
                  <b>Dashboard</b>
                </Button>
                <Button
                  variant="outlined"
                  className={classes.user_profile}
                  onClick={this.openUserProfile}
                >
                  <FontAwesomeIcon icon={faReact} style={{width: '40px', height: '40px'}}/>
                </Button>
              </Toolbar>
      </AppBar>

        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <UserProfile/>
      </Drawer>

        <main
        className={clsx(classes.content, {
          [classes.contentShift]: this.state.open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="Dashboard">
          {this.state.currentScreen}
        </div>
      </main>

      </div>
    );
  }
}

Dashboard = withMyHook(Dashboard);
export default Dashboard;
