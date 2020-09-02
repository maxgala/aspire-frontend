import React, {Component} from 'react';

import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Home from "./SeniorExecs";
import Professionals from "./AspiringProfessionals";
import Jobs from "./JobPosts";
import AdminCoffeeChats from "./AdminCoffeeChats";
import Escalations from "./Escalations";

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
  content: {
    flexGrow: 1,
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: '#eaeaea',
    height: '100vh',
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
    //maxWidth: 'calc(100vw - 299px)',
    width:'100%',
    paddingTop: theme.spacing(0),
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'relative'
  },
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
  text: {
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
    this.changeToProfessionals = this.changeToProfessionals.bind(this);
    this.changeToJobs = this.changeToJobs.bind(this);
    this.changeToSeniorExecs = this.changeToSeniorExecs.bind(this);
    this.changeToAdminCoffeeChats=this.changeToAdminCoffeeChats.bind(this);
    this.changeToEscalations=this.changeToEscalations.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentScreen: <Home appContext={this}/>
    })
  }
  changeToEscalations() {
    this.setState({
      currentScreen: <Escalations appContext={this}/>
    })
  }

  changeToAdminCoffeeChats() {
    this.setState({
      currentScreen: <AdminCoffeeChats appContext={this} />
    })
  }

  changeToProfessionals() {
    this.setState({
      currentScreen: <Professionals appContext={this} />
    })
  }

  changeToJobs() {
    this.setState({
      currentScreen: <Jobs appContext={this}/>
    })
  }

  changeToSeniorExecs() {
    this.setState({
      currentScreen: <Home appContext={this}/>
    })
  }

  render(){
    const classes = this.props.classes;
    return (



            <div >
              <Toolbar className={classes.toolbar}>
                <div className={classes.navLogo} onClick={this.handleClick}>
                  <img src={MaxLogo} alt="MAX_logo" className={classes.img} onClick={this.changeToSeniorExecs}/>
                </div>
                <Button
                  variant="outlined"
                  className={classes.coffee_chat_text}
                  onClick={this.changeToEscalations}
                >
                  <b>Escalations</b>
                </Button>
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
                  className={classes.user_profile}
                  onClick={this.openUserProfile}
                >
                  <FontAwesomeIcon icon={faReact} style={{width: '40px', height: '40px'}}/>
                </Button>
              </Toolbar>
              <div className="Dashboard">
                {this.state.currentScreen}
              </div>
            </div>



    );
  }
}

Dashboard = withMyHook(Dashboard);
export default Dashboard;