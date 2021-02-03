import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import JobApplicationCard from "./Cards/JobApplicationCard";
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
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const JobTypeLabels = [];
JobTypeLabels.push("All");
JobTypeLabels.push("Regular Jobs");
JobTypeLabels.push("Board Roles");

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
    marginLeft: "200px",
    "@media (max-width: 1270px)": {
      marginLeft: "140px",
    },
    "@media (max-width: 600px)": {
      marginLeft: "50%",
    },
    "@media (max-width: 420px)": {
      marginLeft: "50px",
    },
  },

  PostJobText: {
    fontSize: "14px",
    textAlign: "left",
    "@media (max-width: 730px)": {
      fontSize: "9px",
    },
    "@media (max-width: 420px)": {
      display: "none",
    },
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
    "@media (max-width: 420px)": {
      marginRight: "0px",
    },
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

  filter: {
    marginBottom: "40px",
  },

  filterText: {
    fontFamily: "PT Sans",
    fontSize: "18px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
  },

  filterOption: {
    padding: "12px",
    margin: "0px",
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
      jobType: "",
      unfilteredJobs: [],
      jobTitle: "",
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

  fetchJobs = async () => {
    const existingJobsData = await httpGet(
      "jobs?status=ACTIVE",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    if (existingJobsData.data.jobs !== undefined) {
      this.setState({
        jobs: existingJobsData.data.jobs,
        isJobAppsLoaded: true,
        filteredJobs: existingJobsData.data.jobs,
      });
    }
  };

  filterJobs = async () => {
    let jobType = this.state.jobType;
    let jobTitle = this.state.jobTitle;
    let filteredJobs = this.state.filteredJobs;

    if (jobType !== "" && jobType !== "All") {
      if (jobType === "Regular Jobs") {
        jobType = "REGULAR_JOB";
      } else {
        jobType = "BOARD_POSITION";
      }
      filteredJobs = filteredJobs.filter((job) => job.job_type === jobType);
    }

    if (jobTitle !== "") {
      filteredJobs = filteredJobs.filter((job) => job.title.includes(jobTitle));
    }

    this.setState({
      isChatsLoaded: true,
      jobs: filteredJobs,
    });
  };

  handleTypeChange = async (event) => {
    await this.setState({ jobType: event.target.value });
    this.filterJobs();
  };

  handleJobTitleChange = async (event) => {
    await this.setState({ jobTitle: event.target.value });
    this.filterJobs();
  };

  componentDidMount() {
    this.fetchJobs();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
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
              xs={8}
              sm={6}
              md={8}
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
                xs={4}
                sm={6}
                md={4}
                spacing={1}
                alignItems="center"
                justify="flex-start"
              >
                <Fab
                  className={classes.addJobButton}
                  variant="extended"
                  onClick={this.postJob}
                >
                  <AddIcon className={classes.extendedIcon} />
                  <span className={classes.PostJobText}>Post Job</span>
                </Fab>
              </Grid>
            ) : null}
            <PostJobPopup
              openPostJob={this.state.openPostJob}
              handlePostJobClose={this.handlePostJobClose}
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <h1 className={classes.filterText}>Filter by</h1>
            </Grid>
            <Grid container item xs={12} className={classes.filter}>
              <Grid item xs={4} className={classes.filterOption}>
                <TextField
                  id="outlined-select-education"
                  fullWidth
                  select
                  label="Type"
                  value={this.state.jobType}
                  onChange={this.handleTypeChange}
                  variant="outlined"
                >
                  {JobTypeLabels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={4} className={classes.filterOption}>
                <TextField
                  variant="outlined"
                  margin="0"
                  fullWidth
                  id="job_title"
                  label="Job Title"
                  name="job_title"
                  autoComplete="Job Title"
                  autoFocus
                  value={this.state.job_title}
                  onChange={this.handleJobTitleChange}
                />
              </Grid>
            </Grid>
          </Grid>
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
                    key={jobData.job_id}
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
                    <JobApplicationCard data={jobData} />
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
      </div>
    );
  }
}

JobBoard = withMyHook(JobBoard);
JobBoard = withRouter(JobBoard);
export default JobBoard;
