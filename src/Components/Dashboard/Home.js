import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
import JobApplicationCard from "./Cards/JobApplicationCard";
import JobPostingCard from "./Cards/JobPostingCard";
import Grid from "@material-ui/core/Grid";
import TestData from "./CoffeeChatsTestData";
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";

const useStyles = makeStyles(() => ({
  home_page: { 
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    marginLeft:"20px",
    
  },
  booking_history: {
    fontFamily: 'PT Sans',
    fontSize: '20px',
    textAlign: 'left',
    color: '#58595b',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '0px'
  },
  section_title: {
  
    fontFamily: 'PT Sans',
    fontSize: '15px',
    margin: '5px',
    marginBottom: '10px',
    marginTop: '15px',
    textAlign: 'left',
    color: 'black'
  },
  jobPostingLarge: {
    '@media (max-width: 960px)': {display:'None !important;'},
    fontFamily: 'PT Sans',
    fontSize: '15px',
    margin: '5px',
    marginBottom: '10px',
    marginTop: '15px',
    textAlign: 'left',
    color: 'black'
  },
  jobPostingSmall: {
   '@media (min-width: 959px)': {display:'None '},
    fontFamily: 'PT Sans',
    fontSize: '15px',
    marginRight: '250px',
    marginLEft: '100px',
    marginBottom: '10px',
    marginTop: '15px',
    color: 'black'
  },
  example: {
    width: '1000px',
    height: '100px',
  }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffee_chats: TestData,
      job_applications: [],
      job_postings: []
    }
  }

  render() {
    const classes = this.props.classes;
    return (
    
        <div className={classes.home_page}>
        <PerfectScrollbar>
          <h1 className={classes.booking_history}>Your Booking History</h1>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
          >  
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Registered Coffee Chats</p>
              </Grid>
              {this.state.coffee_chats.map((chat, key) => (
                <Grid
                  key={key}
                  container
                  item xs={12} sm={12} md={12} lg={6}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <CoffeeChatCard data={chat}/>
                </Grid>
              ))}
            </Grid>

            {this.props.isSeniorExec ?
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={8} 
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Applications</p>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.jobPosting}>Job Postings</p>
                </Grid>
                <Grid
                  container
                  item xs={6} sm={6} md={6} lg={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobPostingCard/>
                </Grid>
                <Grid
                  container
                  item xs={6} sm={6} md={6} lg={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobPostingCard/>
                </Grid>
                <Grid
                  container
                  item xs={12} sm={12} md={12} lg={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobApplicationCard/>
                </Grid>
              </Grid>
            :
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={8}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Application</p>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.jobPostingLarge}>Job Postings</p>
                </Grid>
                <Grid
                  container
                  item xs={6} sm={6} md={4} lg={4}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <JobApplicationCard/>
                </Grid>
                <Grid
                  container
                  item xs={6} sm={6} md={4} lg={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobApplicationCard/>
                </Grid>
              
                  
              
                <Grid
                  container
                  item xs={8} sm={8} md={4} lg={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-end"
                >
                <p className={classes.jobPostingSmall}>Job Postings</p>
                  <JobPostingCard/>
                </Grid>
              </Grid>
          
            }
          </Grid>

      </PerfectScrollbar>
      </div>
    )
  }
}

Home = withMyHook(Home);
export default Home;
