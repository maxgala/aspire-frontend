import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import Container from "@material-ui/core/Container";
import UserProfile from "./UserProfile";
import AboutMax from "../LandingPage/AboutMax.js";
import Features from "../LandingPage/Features.js";
import ScrollToTop from "../LandingPage/ScrollToTop.js";
import Footer from "../LandingPage/Footer.js";
import Membership from "../LandingPage/Membership.js";
import Carousal from "../LandingPage/Carousal.js";
import SeniorExecGrid from '../LandingPage/SeniorExecGrid';
import JobSection from "../LandingPage/JobSection.js";

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
    width: '175px'
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
}));

// writing a hook just to incorporate the CSS defined outside under classes
// feel free to use this function in any other function
function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Dashboard extends Component{
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
                  </Toolbar>
                  
                  <AboutMax/>
                  <Features/>
                  <SeniorExecGrid/>
                  <JobSection/>
                  <Membership/>
                  <Carousal/>

                  {/* Scroll to top and footer components at bottom */}
                  <Footer/>
                  <ScrollToTop/>
                </Container>
              </Grid>
            </main>
          </div>
        );
    }
}

Dashboard = withMyHook(Dashboard);
export default Dashboard;
