import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
import EmptyCard from "./Cards/EmptyCard";
import JobApplicationCard from "./Cards/JobApplicationCard";
import JobPostingCard from "./Cards/JobPostingCard";
import Grid from "@material-ui/core/Grid";
import CardTypes from "./CardTypes";
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import { httpGet } from "../../lib/dataAccess";
import jwtDecode from "jwt-decode";

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
      coffee_chats: [],
      job_applications: [],
      job_postings: []
    }
  }

  fetchJobs = async () => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    const jobsData = await httpGet("job-applications?userId=" + userInfo.username, localStorage.getItem("idToken"));
    const cutOff = this.props.isSeniorExec ? 1 : 2
    const data = jobsData.data.length > cutOff ? jobsData.data.slice(0, cutOff) : jobsData.data

    const jobAppData = []
    data.forEach(async job => {
      const jobData = await httpGet("jobs/" + job.job_id, localStorage.getItem("idToken"));
      jobAppData.push(jobData.data)
    })
    this.setState({
      job_applications: jobAppData
    });
  }

  fetchChats = async () => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    const chatsData = await httpGet("chats?user_id=" + userInfo.username, localStorage.getItem("idToken"));
    this.setState({
      coffee_chats: chatsData.data.chats.length > 4 ? chatsData.data.chats.slice(0, 4) : chatsData.data.chats
    });
  }

  fetchPostings = async () => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    const jobsData = await httpGet("jobs?user_id=" + userInfo.username, localStorage.getItem("idToken"));
    const cutOff = this.props.isSeniorExec ? 2 : 1
    this.setState({
      job_postings: jobsData.data.jobs.length > cutOff ? jobsData.data.jobs.slice(0, cutOff) : jobsData.data.jobs
    });
  }

  componentDidMount() {
    this.fetchJobs();
    this.fetchChats();
    this.fetchPostings();
    // TODO: implement dynamic data for job postings too (filter on posted_by attribute)
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <PerfectScrollbar>
        <div className={classes.home_page}>
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
                    alignItems="center"
                    justify="center"
                  >
                    <CoffeeChatCard data={chat}/>
                  </Grid>
                ))
              :
                <Grid
                  container
                  item xs={12} sm={12} md={12} lg={6} xl={4}
                  spacing={1}
                  alignItems="center"
                  justify="center"
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
                <Grid
                  container
                  item xs={8} 
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Applications</p>
                  {this.state.job_applications && this.state.job_applications.length > 0 ?
                    this.state.job_applications.map((jobData, key) => (
                      <Grid
                        key={jobData.job_id}
                        container
                        item xs={12}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobApplicationCard data={jobData}/>
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
                        <JobPostingCard data={posting}/>
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
                <Grid
                  container
                  item xs={12} sm={12} md={12} lg={8}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <p className={classes.section_title}>Your Job Application</p>
                  {this.state.job_applications && this.state.job_applications.length > 0 ?
                    this.state.job_applications.map((jobData, key) => (
                      <Grid
                        key={jobData.job_id}
                        container
                        item xs={12} sm={6}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobApplicationCard data={jobData}/>
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
                  item xs={12} sm={8} md={6} lg={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Job Postings</p>
                  {this.state.job_postings && this.state.job_postings.length > 0 ?
                    this.state.job_postings.map((posting, key) => (
                      <Grid
                        key={posting.job_id}
                        container
                        item xs={12}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobPostingCard data={posting}/>
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
      </div>
      </PerfectScrollbar>
    </div>
    )
  }
}

Home = withMyHook(Home);
export default Home;