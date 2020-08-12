import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
import EmptyCard from "./Cards/EmptyCard";
import JobApplicationCard from "./Cards/JobApplicationCard";
import JobPostingCard from "./Cards/JobPostingCard";
import Grid from "@material-ui/core/Grid";
import TestData from "./CoffeeChatsTestData";
import CardTypes from "./CardTypes";
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
    width: '100%',
    fontFamily: 'PT Sans',
    fontSize: '15px',
    margin: '5px',
    marginBottom: '10px',
    marginTop: '15px',
    textAlign: 'left',
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
      job_applications: props.isSeniorExec ? ["1"] : ["1", "2"],
      job_postings: props.isSeniorExec ? ["1", "2"] : ["1"]
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
              {this.state.coffee_chats && this.state.coffee_chats.length > 0 ?
                this.state.coffee_chats.map((chat, key) => (
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
                ))
              :
                <Grid
                  container
                  item xs={12} sm={12} md={12} lg={6}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <EmptyCard type={CardTypes.coffeeChat}/>
                </Grid>
              }
            </Grid>

            {this.props.isSeniorExec ?
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                {/* TODO: cap at 2 job postings and 1 job application for senior exec */}
                <Grid
                  container
                  item xs={8} 
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Applications</p>
                  {this.state.job_applications && this.state.job_applications.length > 0 ?
                    this.state.job_applications.map((app, key) => (
                      <Grid
                        key={key}
                        container
                        item xs={12}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobApplicationCard/>
                      </Grid>
                    ))
                  :
                    <Grid
                      container
                      item xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard type={CardTypes.jobApplication}/>
                    </Grid>
                  }
                </Grid>
                <Grid
                  container
                  item xs={8}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Job Postings</p>
                  {this.state.job_postings && this.state.job_postings.length > 0 ?
                    this.state.job_postings.map((posting, key) => (
                      <Grid
                        key={key}
                        container
                        item xs={6}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobPostingCard/>
                      </Grid>
                    ))
                  :
                    <Grid
                      container
                      item xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard type={CardTypes.jobPosting}/>
                    </Grid>
                  }
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
                {/* TODO: cap at 2 job applications and 1 job posting for senior exec */}
                <Grid
                  container
                  item xs={12} sm={12} md={8}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Application</p>
                  {this.state.job_applications && this.state.job_applications.length > 0 ?
                    this.state.job_applications.map((app, key) => (
                      <Grid
                        key={key}
                        container
                        item xs={6}
                        spacing={1}
                        alignItems="center"
                        justify="center"
                      >
                        <JobApplicationCard/>
                      </Grid>
                    ))
                  :
                    <Grid
                      container
                      item xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard type={CardTypes.jobApplication}/>
                    </Grid>
                  }
                </Grid>
                <Grid
                  container
                  item xs={8} sm={8} md={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Job Postings</p>
                  {this.state.job_postings && this.state.job_postings.length > 0 ?
                    this.state.job_postings.map((posting, key) => (
                      <Grid
                        key={key}
                        container
                        item xs={12}
                        spacing={1}
                        alignItems="center"
                        justify="center"
                      >
                        <JobPostingCard/>
                      </Grid>
                    ))
                  :
                    <Grid
                      container
                      item xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard type={CardTypes.jobPosting}/>
                    </Grid>
                  }
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