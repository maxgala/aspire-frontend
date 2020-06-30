import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import Container from "@material-ui/core/Container";
import UserProfile from "./UserProfile";
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from "./Home";
import CoffeeChats from "./CoffeeChats";
import Jobs from "./Jobs";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  // this css element is for the div containing the image
  // this is used so that we can align the image to the right
  navLogo:{
    display: 'flex',
    justifyContent: 'start'
  },
  // this css element describes the size of the image
  img: {
    float: 'left',
    align: 'left',
    '@media (max-width: 480px)': {width: '125px'},
    width: '150px'
  },
  content: {
    flexGrow: 1,
    width: '100vw',
    overflow: 'hidden'
  },
  profile_container: {
    '@media (max-width: 700px)': {
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
    '@media (max-width: 700px)': {maxWidth: '100%'},
    maxWidth: 'calc(100% - 300px)',
    paddingTop: theme.spacing(0),
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'relative'
  },
  // for containing the logo and the sign in buttons
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '10vh',
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
}));

// writing a hook just to incorporate the CSS defined outside under classes
// feel free to use this function in any other function
function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentScreen: []
    }
    this.changeToCoffeeChats = this.changeToCoffeeChats.bind(this);
    this.changeToJobs = this.changeToJobs.bind(this);
    this.changeToDashboard = this.changeToDashboard.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentScreen: <Home appContext={this}/>
    })
  }

  changeToCoffeeChats() {
    this.setState({
      currentScreen: <CoffeeChats appContext={this}/>
    }) 
  }

  changeToJobs() {
    this.setState({
      currentScreen: <Jobs appContext={this}/>
    }) 
  }

  changeToDashboard() {
    this.setState({
      currentScreen: <Home appContext={this}/>
    }) 
  }

  render(){
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <Grid
            container
            item
            spacing={1}
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Container className={classes.profile_container}>
              <UserProfile/>
            </Container>

            <Container className={classes.dashboard_container}>
              <Toolbar className={classes.toolbar}>
                <div className={classes.navLogo} onClick={this.handleClick}>
                  <img src={MaxLogo} alt="MAX_logo" className={classes.img}/>
                </div>
                <Button
                  variant="outlined"
                  className={classes.coffee_chat_text}
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
              <div className="Dashboard">
                {this.state.currentScreen}
              </div>
            </Container>
          </Grid>
        </main>
      </div>
    );
  }
}

Dashboard = withMyHook(Dashboard);
export default Dashboard;
