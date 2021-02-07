import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CoffeeChatSelfCard from "./Cards/CoffeeChatSelfCard";
import EmptyCard from "./Cards/EmptyCard";
import JobApplicationSelfCard from "./Cards/JobApplicationSelfCard";
import JobPostingCard from "./Cards/JobPostingCard";
import Grid from "@material-ui/core/Grid";
import CardTypes from "./CardTypes";
// import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import { httpGet } from "../../lib/dataAccess";
import jwtDecode from "jwt-decode";
import Skeleton from "@material-ui/lab/Skeleton";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(30),
    },
  },
  cardCoffeeLoader: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "5px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#B5A165",
    color: "white",
    boxShadow: "0px 6px 6px #00000029",
  },
  cardAppLoader: {
    width: "100%",
    maxWidth: "350px",
    height: "180px",
    borderStyle: "solid",
    borderRadius: "20px",
    backgroundColor: "#6EA0B5",
    color: "white",
    borderColor: "#6EA0B5",
    textAlign: "left",
    fontWeight: "100",
    fontFamily: "Arial",
    marginBottom: "5%",
    marginRight: "5%",
    "@media (max-width: 480px)": {
      marginRight: "0px",
    },
    boxShadow: "0px 6px 6px #00000029",
    overflow: "hidden",
  },
  cardPostLoader: {
    width: "100%",
    minHeight: "130px",
    maxWidth: "350px",
    height: "180px",
    marginBottom: "20px",
    borderRadius: "20px",
    backgroundColor: "#58595B",
    boxShadow: "0px 6px 6px #00000029",
  },
  home_page: {
    paddingLeft: "5%",
    paddingRight: "0%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "90vh",
    marginLeft: "10px",
  },
  booking_history: {
    fontFamily: "PT Sans",
    fontSize: "30px",
    textAlign: "left",
    color: "#58595b",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "20px",
  },
  section_title: {
    width: "100%",
    fontFamily: "PT Sans",
    fontSize: "15px",
    margin: "5px",
    marginBottom: "10px",
    marginTop: "15px",
    textAlign: "left",
    color: "black",
  },
  example: {
    width: "1000px",
    height: "100px",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffee_chats: [],
      isChatsLoaded: false,
      job_applications: [],
      job_app_temp: [],
      isJobappsLoaded: false,
      job_postings: [],
      isJobpostsLoaded: false,
      user_type: jwtDecode(localStorage.getItem("idToken"))["custom:user_type"],
    };
  }

  fetchJobs = async () => {
    const idTokeninfo = jwtDecode(
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    const jobsData = await httpGet(
      "job-applications?userId=" + idTokeninfo.email,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );

    const cutOff = this.props.isSeniorExec ? 2 : 5;
    const data =
      jobsData.data.length > cutOff
        ? jobsData.data.slice(0, cutOff)
        : jobsData.data;

    const jobAppData = [];
    // data should never return an empty string, but it is currently
    // backend team should fix this so it returns either undefined or [], [] being more preferred
    if (data !== undefined && data !== "") {
      for (let i = 0; i < data.length; i++) {
        const jobData = await httpGet(
          "jobs/" + data[i].job_id,
          (await Auth.currentSession()).getIdToken().getJwtToken()
        );
        if (jobData.data) {
          jobAppData.push(jobData.data);
        }
      }
      this.setState({
        isJobappsLoaded: true,
        job_applications: jobAppData,
      });
    }
  };

  fetchChats = async () => {
    const idTokeninfo = jwtDecode(
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    const chatsData = await httpGet(
      "chats?email=" + idTokeninfo.email,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    if (chatsData.data.chats !== undefined) {
      this.setState({
        isChatsLoaded: true,
        coffee_chats: chatsData.data.chats,
      });
    }
  };

  fetchPostings = async () => {
    const idTokeninfo = jwtDecode(
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    const jobsData = await httpGet(
      "jobs?user_id=" + idTokeninfo.email,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );

    const cutOff = this.props.isSeniorExec ? 5 : 3;
    if (jobsData.data.jobs !== undefined) {
      this.setState({
        isJobpostsLoaded: true,
        job_postings:
          jobsData.data.jobs.length > cutOff
            ? jobsData.data.jobs.slice(0, cutOff)
            : jobsData.data.jobs,
      });
    }
  };

  componentDidMount() {
    this.fecthData();
  }
  fecthData = () => {
    this.fetchJobs();
    this.fetchChats();
    this.fetchPostings();
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {/* <PerfectScrollbar> */}
        <div className={classes.home_page}>
          <h1 className={classes.booking_history}>Dashboard</h1>
          <Grid container alignItems="flex-start" justify="flex-start">
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <h5 className={classes.section_title}>Coffee Chats</h5>
              {this.state.user_type === "MENTOR" ? (
                <Grid
                  container
                  item
                  xs={12}
                  spacing={1}
                  alignItems="center"
                  justify="flex-start"
                >
                  <p style={{ textAlign: "left" }}>
                    Once every two to three months, your coffee chat will be
                    made available to MAX Aspiring Professionals.
                  </p>
                  <p style={{ textAlign: "left" }}>
                    Once you have been booked, the details will appear where you
                    click 'View Details'. You will also receive an email
                    notification when a Coffee Chat is booked with you by an
                    Aspiring Professional
                  </p>
                </Grid>
              ) : (
                ""
              )}

              {this.state.isChatsLoaded ? (
                this.state.coffee_chats &&
                this.state.coffee_chats.length > 0 ? (
                  this.state.coffee_chats.map((chat, key) => (
                    <Grid
                      key={key}
                      container
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      spacing={1}
                      alignItems="center"
                      justify="flex-start"
                    >
                      <CoffeeChatSelfCard data={chat} />
                    </Grid>
                  ))
                ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={4}
                    spacing={1}
                    alignItems="center"
                    justify="flex-start"
                  >
                    <EmptyCard type={CardTypes.coffeeChat} filtered={false} />
                  </Grid>
                )
              ) : (
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={4}
                  spacing={1}
                  alignItems="center"
                  justify="flex-start"
                >
                  <Skeleton
                    variant="rect"
                    className={classes.cardCoffeeLoader}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>

          {this.props.isSeniorExec ? (
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              direction="column"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                direction="row"
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Your Job Applications</p>
                {this.state.isJobappsLoaded ? (
                  this.state.job_applications &&
                  this.state.job_applications.length > 0 ? (
                    this.state.job_applications.map((jobData, key) => (
                      <Grid
                        key={jobData.job_id}
                        container
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobApplicationSelfCard data={jobData} />
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard
                        type={CardTypes.jobApplication}
                        filtered={false}
                      />
                    </Grid>
                  )
                ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Skeleton
                      variant="rect"
                      className={classes.cardAppLoader}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <h5 className={classes.section_title}>Job Postings</h5>

                {this.state.isJobpostsLoaded ? (
                  this.state.job_postings &&
                  this.state.job_postings.length > 0 ? (
                    this.state.job_postings.map((posting, key) => (
                      <Grid
                        key={key}
                        container
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobPostingCard
                          refresh={() => this.fecthData()}
                          data={posting}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard type={CardTypes.jobPosting} filtered={false} />
                    </Grid>
                  )
                ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Skeleton
                      variant="rect"
                      className={classes.cardPostLoader}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              alignItems="flex-start"
              justify="flex-start"
              direction="column"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                direction="row"
                alignItems="flex-start"
                justify="flex-start"
              >
                <h5 className={classes.section_title}>Your Job Application</h5>
                {this.state.isJobappsLoaded ? (
                  this.state.job_applications &&
                  this.state.job_applications.length > 0 ? (
                    this.state.job_applications.map((jobData, key) => (
                      <Grid
                        key={jobData.job_id}
                        container
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobApplicationSelfCard data={jobData} />
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard
                        type={CardTypes.jobApplication}
                        filtered={false}
                      />
                    </Grid>
                  )
                ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Skeleton
                      variant="rect"
                      className={classes.cardAppLoader}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <h5 className={classes.section_title}>Job Postings</h5>
                {this.state.isJobpostsLoaded ? (
                  this.state.job_postings &&
                  this.state.job_postings.length > 0 ? (
                    this.state.job_postings.map((posting, key) => (
                      <Grid
                        key={key}
                        container
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        spacing={1}
                        alignItems="flex-start"
                        justify="flex-start"
                      >
                        <JobPostingCard
                          refresh={() => this.fecthData()}
                          data={posting}
                        />
                      </Grid>
                    ))
                  ) : (
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <EmptyCard type={CardTypes.jobPosting} filtered={false} />
                    </Grid>
                  )
                ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <Skeleton
                      variant="rect"
                      className={classes.cardPostLoader}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </div>
        {/* </PerfectScrollbar> */}
      </div>
    );
  }
}

Home = withMyHook(Home);
export default withSnackbar(Home);
