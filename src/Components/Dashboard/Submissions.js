import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import JobPostingCard from "./Cards/JobPostingCard";
// TODO: Hiding filters until they get implemented
// import Filter from "./Cards/FilterCard";
// import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import EmptyCard from "./Cards/EmptyCard";
import CardTypes from "./CardTypes";
import { withRouter } from "react-router";
import { httpGet } from "../../lib/dataAccess";
import { Auth } from "aws-amplify";
import Skeleton from "@material-ui/lab/Skeleton";
import jwtDecode from "jwt-decode";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PostJobPopup from "./Popups/PostJobPopup";

const useStyles = makeStyles((theme) => ({
  mainPage: {
    paddingLeft: "8%",
    paddingRight: "8%",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
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

  JobBoard: {
    fontFamily: "PT Sans",
    fontSize: "30px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
    marginTop: "40px",
  },

  addJobButton: {
    marginTop: "30px",
    textAlign: "right",
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  padding: {
    marginLeft: "20px",
  },

  grid: {
    justifyContent: "center",
    alignItems: "center",
  },

  section_title: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    margin: "5px",
    marginBottom: "10px",
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
  },

  select: {
    background: "#EAEAEA",
    borderColor: "#EAEAEA",
    outline: "none",
    color: "#6EA0B5",
    fontWeight: "800",
  },

  sort: {
    alignItems: "flex-start",
    textAlign: "left",
    marginBottom: "40px",
  },

  date: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    fontWeight: "bold",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      isJobAppsLoaded: false,
      openPostJob: false,
    };
  }

  postJob = (event) => {
    this.setState({
      openPostJob: true,
    });
  };

  handlePostJobClose = (event) => {
    this.setState({
      openPostJob: false,
    });
  };

  fetchPostings = async () => {
    const idTokeninfo = jwtDecode(
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    const jobsData = await httpGet(
      "jobs?user_id=" + idTokeninfo.email,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );

    if (jobsData.data.jobs !== undefined) {
      this.setState({
        jobs: jobsData.data.jobs,
        isJobAppsLoaded: true,
      });
    }
  };

  componentDidMount() {
    this.fetchPostings();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {/* <PerfectScrollbar> */}
        <div className={classes.mainPage}>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={9}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <h1 className={classes.JobBoard}>Job Board</h1>
            </Grid>
            {jwtDecode(localStorage.getItem("idToken"))["custom:user_type"] !==
            "FREE" ? (
              <Grid
                container
                item
                xs={3}
                spacing={1}
                alignItems="flex-end"
                justify="flex-end"
                className={classes.addJobButton}
              >
                <Fab variant="extended" onClick={this.postJob}>
                  <AddIcon className={classes.extendedIcon} />
                  Post Job
                </Fab>
              </Grid>
            ) : null}
            <PostJobPopup
              openPostJob={this.state.openPostJob}
              handlePostJobClose={this.handlePostJobClose}
            />
          </Grid>
          {/* TODO: Hiding filters until they get implemented
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Job Title</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Location</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Job Type</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Additional Filters</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>
          </Grid>

          <div className={classes.sort}>
            <p className={classes.date}>
              {" "}
              Sort date posted by:
              <select className={classes.select}>
                <option value="Ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </p>
          </div>
          */}

          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="flex-start"
          >
            {this.state.isJobAppsLoaded === true ? (
              this.state.jobs && this.state.jobs.length > 0 ? (
                this.state.jobs.map((jobData, key) => (
                  <Grid
                    key={key}
                    container
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <JobPostingCard data={jobData} />
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  item
                  xs={12}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <EmptyCard type={CardTypes.jobApplication} />
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
                <Skeleton variant="rect" className={classes.cardAppLoader} />
              </Grid>
            )}
          </Grid>
        </div>
        {/* </PerfectScrollbar> */}
      </div>
    );
  }
}

JobBoard = withMyHook(JobBoard);
JobBoard = withRouter(JobBoard);
export default JobBoard;
