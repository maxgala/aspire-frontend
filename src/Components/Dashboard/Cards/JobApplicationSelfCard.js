import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";
import { httpPost } from "../../../lib/dataAccess";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(() => ({
  card: {
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
  jobTitle: {
    fontFamily: "PT Sans",
    fontSize: "19px",
    "@media (max-width: 350px)": {
      fontSize: "16px",
      marginBottom: "0px",
    },
    fontWeight: "100",
    marginBottom: "1%",
  },
  text2: {
    fontFamily: "PT Sans",
    fontSize: "12px",
    "@media (max-width: 350px)": {
      fontSize: "10px",
    },
    marginLeft: "2%",
    marginTop: "10px",
    fontWeight: "100",
  },
  text3: {
    fontFamily: "PT Sans",
    fontSize: "12px",
    marginLeft: "7%",
    "@media (max-width: 350px)": {
      fontSize: "10px",
      marginLeft: "4%",
    },
    marginTop: "10px",
    fontWeight: "100",
    flexDirection: "row",
  },
  text4: {
    fontFamily: "PT Sans",
    marginTop: "10%",
    fontSize: "10px",
    fontWeight: "100",
    float: "left",
  },
  button: {
    fontSize: "10px",
    "@media (max-width: 350px)": {
      fontSize: "8px",
      marginTop: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    position: "absolute",
    fontWeight: "400",
    borderRadius: 50,
    backgroundColor: "white",
    color: "#58595B",
    display: "flex",
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  tag1: {
    float: "left",
    borderStyle: "solid",
    fontSize: "7px",
    fontWeight: "100",
    color: "white",
    borderWidth: "0.5px",
    borderRadius: 50,
    marginTop: "20px",
    borderColor: "white",
    display: "flex",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  tag2: {
    float: "left",
    borderStyle: "solid",
    fontSize: "7px",
    fontWeight: "100",
    color: "white",
    borderWidth: "0.5px",
    borderRadius: 50,
    marginLeft: "10%",
    marginTop: "20px",
    borderColor: "white",
    display: "flex",
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingTop: "3px",
    paddingBottom: "3px",
  },
  largetext: {
    color: "black",
    textAlign: "left",
    marginLeft: "20px",
    fontWeight: "100",
  },
  descrip: {
    textAlign: "left",
    marginLeft: "20px",
    marginRight: "0px",
    fontWeight: "100",
    fontSize: "15px",
    "@media (max-width: 480px)": {
      fontSize: "12px",
      marginLeft: "0px",
    },
    color: "black",
  },
  descrip: {
    textAlign: "left",
    marginLeft: "20px",
    marginRight: "0px",
    fontWeight: "100",
    fontSize: "15px",
    "@media (max-width: 480px)": {
      fontSize: "12px",
      marginLeft: "0px",
    },
    color: "black",
  },
  header: {
    textAlign: "left",
    marginLeft: "20px",
    fontWeight: "100",
    fontSize: "18px",
    "@media (max-width: 480px)": {
      marginLeft: "0px",
    },
    color: "black",
  },
  writeup: {
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "100",
  },
  translate: {
    transform: "translate(0%, 0%)",
  },
  jobtitle: {
    fontSize: "30px",
    marginLeft: "10px",
    marginTop: "4%",
    color: "#000000",
  },
  textpopup: {
    fontSize: "15px",
    marginTop: "6px",
    fontWeight: "100",
    marginRight: "16%",
    color: "black",
  },
  textpopup2: {
    fontSize: "15px",
    marginLeft: "4%",
    marginRight: "16%",
    marginTop: "6px",
    fontWeight: "100",
    color: "black",
  },
  tagpopup: {
    float: "left",
    borderStyle: "solid",
    fontSize: "12px",
    fontWeight: "100",
    color: "black",
    borderWidth: "0.5px",
    borderRadius: 50,
    marginLeft: "4%",
    marginTop: "1%",
    borderColor: "black",
    display: "flex",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  button2: {
    marginLeft: "3%",
    color: "grey",
  },
  divStyle: {
    height: "20px",
  },
  card1: {
    marginLeft: "20px",
    marginTop: "15px",
    "@media (max-width: 350px)": {
      marginTop: "10px",
    },
  },
  toolbar: {
    height: "8vh",
    backgroundColor: "black",
    boxShadow: "0px 0px 0px",
    width: "100%",
  },
  closes: {
    position: "absolute",
    right: "5%",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class JobApplicationSelfCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  openApplication = (event) => {
    this.setState({
      open: true,
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };

  getResumeURL = () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    return userProfile["custom:resume"];
  };

  applyJob = async () => {
    let jobAppObj = {
      job_id: this.props.data.job_id.toString(),
      resumes: this.getResumeURL(),
      cover_letters: "coverletters2",
    };
    const appResponse = await httpPost(
      "job-applications",
      (await Auth.currentSession()).getIdToken().getJwtToken(),
      jobAppObj
    );
    if (appResponse.status === 200) {
      window.alert("Successfully applied for this job");
      this.setState({
        open: false,
      });
    } else {
      window.alert("Failed to apply for this job!");
    }
  };

  render() {
    Moment.globalFormat = "MMM DD, YYYY";
    const classes = this.props.classes;

    return (
      <div className={classes.card}>
        <div className={classes.card1}>
          <Grid container alignItems="flex-start" justify="flex-start">
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
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <h1 className={classes.jobTitle}>
                  {this.props.data && this.props.data.title}
                </h1>
              </Grid>
            </Grid>
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
                xs={1}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <span>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{
                      width: "9px",
                      height: "9px",
                      marginRight: "10%",
                      marginTop: "13px",
                    }}
                  />
                </span>
              </Grid>
              <Grid
                container
                item
                xs={11}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <span className={classes.text2}>
                  {this.props.data && this.props.data.company}
                </span>
                <span className={classes.text3}>
                  {this.props.data && this.props.data.city},{" "}
                  {this.props.data && this.props.data.region}
                </span>
              </Grid>
            </Grid>
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
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <hr
                  style={{
                    width: "40%",
                    textAlign: "left",
                    marginLeft: "0%",
                    marginTop: "30px",
                    marginBottom: "0",
                    height: 1,
                    paddingBottom: "0",
                  }}
                ></hr>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              spacing={2}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={7}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <span className={classes.text4}>
                  Posted{" "}
                  <Moment unix>
                    {this.props.data && this.props.data.created_on}
                  </Moment>
                </span>
              </Grid>
              <Grid
                container
                item
                xs={5}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <div className={classes.divStyle}>
                  <Button
                    className={classes.button}
                    onClick={this.openApplication}
                    variant="contained"
                    color="primary"
                  >
                    View Job
                  </Button>
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={10}
              spacing={0}
              alignItems="flex-start"
              justify="flex-start"
            >
              {this.props.data &&
                this.props.data.job_tags &&
                this.props.data.job_tags.map((tag, key) => (
                  <Grid
                    key={key}
                    container
                    item
                    xs={4}
                    sm={4}
                    md={3}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <div className={classes.divStyle}>
                      <span className={classes.tag1}>{tag}</span>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </Grid>

          <Dialog
            className={classes.translate}
            open={this.state.open}
            onClose={this.handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth={"md"}
            PaperProps={{
              style: { borderRadius: 12 },
            }}
          >
            <Toolbar className={classes.toolbar}>
              <div>
                <h2
                  style={{ margin: "0px", marginTop: "10px", color: "white" }}
                >
                  Job Title
                </h2>
              </div>
              <img
                onClick={this.handleClose}
                className={classes.closes}
                style={{ width: "14px", height: "14px", cursor: "pointer" }}
                src={close}
                alt="Close button"
              />
            </Toolbar>

            <DialogContent>
              <DialogContentText
                id="scroll-dialog-description"
                component={"span"}
              >
                <Grid
                  container
                  item
                  xs={12}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                  style={{ marginBottom: "15px", marginTop: "10px" }}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    sm={3}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.textpopup}>
                      <span style={{ marginLeft: "5px" }}>
                        <FontAwesomeIcon
                          icon={faBuilding}
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "7px",
                          }}
                        />
                      </span>
                      {this.props.data && this.props.data.company}
                    </span>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sm={3}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.textpopup2}>
                      {this.props.data && this.props.data.city},
                      {this.props.data && this.props.data.region}
                    </span>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    sm={3}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.textpopup2}>
                      {this.props.data &&
                      this.props.data.job_type &&
                      this.props.data.job_type === "REGULAR_JOB"
                        ? "Regular Job"
                        : "Board Position"}
                    </span>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <h2 className={classes.header}>Job Description:</h2>
                  <h2 className={classes.descrip}>
                    {this.props.data && this.props.data.description}
                  </h2>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <h2 className={classes.header}>Job Requirements:</h2>
                  <h2 className={classes.descrip}>
                    {this.props.data && this.props.data.requirements}
                  </h2>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <Grid
                    container
                    item
                    xs={8}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    {this.props.data &&
                      this.props.data.job_tags &&
                      this.props.data.job_tags.map((tag, key) => (
                        <span key={key} className={classes.tagpopup}>
                          {tag}
                        </span>
                      ))}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={4}
                    spacing={0}
                    alignItems="flex-end"
                    justify="flex-end"
                  ></Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
            <DialogActions />
          </Dialog>
        </div>
      </div>
    );
  }
}

JobApplicationSelfCard = withMyHook(JobApplicationSelfCard);
export default withSnackbar(JobApplicationSelfCard);
