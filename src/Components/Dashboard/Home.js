import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
import JobApplicationCard from "./Cards/JobApplicationCard";
import JobPostingCard from "./Cards/JobPostingCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  home_page: { 
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  booking_history: {
    fontFamily: 'PT Sans',
    fontSize: '20px',
    textAlign: 'left',
    color: '#58595b',
    fontWeight: 'bold',
    marginTop: '50px',
  },
  section_title: {
    fontFamily: 'PT Sans',
    fontSize: '15px',
    margin: '5px',
    textAlign: 'left',
    color: 'black'
  }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Home extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.home_page}>
          <h1 className={classes.booking_history}>Your Booking History</h1>
          <Grid
            container
            spacing={1}
            alignItems="left"
            justify="left"
          >  
            <Grid
              container
              item xs={6}
              spacing={1}
              alignItems="left"
              justify="left"
            >
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <p className={classes.section_title}>Registered Coffee Chats</p>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <CoffeeChatCard/>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <CoffeeChatCard/>
              </Grid>

              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <p className={classes.section_title}>Job Postings</p>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <JobPostingCard/>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <JobPostingCard/>
              </Grid>
            </Grid>
            <Grid
              container
              item xs={6}
              spacing={1}
              alignItems="left"
              justify="left"
            >
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <p className={classes.section_title}>Your Job Application</p>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <JobApplicationCard/>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <JobApplicationCard/>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <JobApplicationCard/>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="left"
                justify="left"
              >
                <JobApplicationCard/>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Home = withMyHook(Home);
export default Home;
