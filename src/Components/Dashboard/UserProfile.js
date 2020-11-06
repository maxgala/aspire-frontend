import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import pic0 from "../Images/faceShot/pic0.png";
import close from "../Images/close.png";
import { Button } from "@material-ui/core";
import { faMapMarker, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EscalationsCard from "./Cards/EscalationsCard";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { httpGet, httpPost } from "../../lib/dataAccess";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root1: {
    display: "flex",
    flex: "1",
    overflowX: "hidden",
    width: "100%",
    position: "relative",
    textAlign: "justify",
    borderRadius: "0% 0% 3% 3%",
    boxShadow: " 0px 1.1px 8px #00000052",
    backgroundColor: "white",
  },

  name: {
    fontFamily: "minion-pro, serif",
    fontWeight: "bolder",
    fontSize: "30px",
    margin: "2% 20px 10px 20px",
    textAlign: "center",
    display: "block",
  },

  occupation: {
    margin: "3% 30px 3% 30px",
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "550",
    fontSize: "15px",
    textAlign: "center",
    display: "block",
  },
  city: {
    margin: "2vh 40px 1vh 40px",
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "550",
    fontSize: "15px",
    textAlign: "center",
    display: "block",
  },

  company: {
    margin: "1vh 40px 2vh 40px",
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "18px",
    textAlign: "center",
    display: "block",
    fontWeight: "bold",
  },

  numCoffeChat: {
    margin: "1vh 40px 1vh 40px",
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "15px",
    textAlign: "center",
    display: "block",
  },

  circle: {
    position: "relative",
    textAlign: "justify",
    height: "130px",
    width: "130px",
    margin: "2vh 85px 2vh 85px",
    borderRadius: "50%",
    backgroundColor: "#B5A165",
    display: "inline-block",
    boxShadow: "0px 6px 6px #00000029",
  },

  credits: {
    fontFamily: "minion-pro, serif",
    fontWeight: "bolder",
    fontSize: "40px",
    color: "#FFFFFF",
    margin: "30px 20px 0px 20px",
    textAlign: "center",
  },

  available: {
    fontFamily: "minion-pro, serif",
    fontWeight: "bolder",
    fontSize: "10px",
    color: "#FFFFFF",
    margin: "0px 20px 10px 20px",
    textAlign: "center",
  },

  image: {
    width: "60%",
    height: "auto",
    padding: "1vh",
    left: "10%",
    borderRadius: "50%",
    marginTop: "2vh",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },

  button: {
    textTransform: "none",
    backgroundColor: "#B5A165",
    marginBottom: "1vh",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 50,
    color: "#000000",
    position: "relative",
    display: "block",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },

    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "myriad-pro, sans-serif",
    paddingLeft: "50px",
    paddingRight: "50px",
  },

  button1: {
    textTransform: "none",
    backgroundColor: "#000000",
    marginBottom: "1vh",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1.5vh",
    borderRadius: 50,
    color: "#FFFFFF",
    position: "relative",
    display: "block",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "myriad-pro, sans-serif",
    paddingLeft: "75px",
    paddingRight: "75px",
  },
  updateProfile: {
    margin: "2vh 40px 1vh 40px",
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "12px",
    textAlign: "center",
    display: "block",
    color: "#6EA0B5",
    cursor: "pointer",
  },
  contact: {
    marginTop: "1vh",
    marginLeft: "40px",
    marginBottom: "1vh",
    marginRight: "40px",
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "12px",
    textAlign: "center",
    display: "block",
    color: "#6EA0B5",
    cursor: "pointer",
  },
  faq: {
    margin: "1vh 40px 1vh 40px",
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "12px",
    textAlign: "center",
    display: "block",
    color: "#6EA0B5",
    cursor: "pointer",
  },

  toolbar: {
    height: "8vh",
    backgroundColor: "black",
    boxShadow: "0px 0px 0px",
    width: "100%",
  },

  dialog: {
    borderRadius: "40%",
  },

  textbox: {
    boxShadow: "0px 0px 0px",
    color: "white",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #B6A165 ",
    },
    "& .MuiInput-underline:after": {
      color: "#455E6A",
      borderBottom: "2px solid #B6A165 ",
    },
    "& label.Mui-focused": {
      color: "#455E6A",
    },
  },

  input: {
    boxShadow: "0px 0px ",
  },

  limit: {
    width: "90%",
    display: "block",
    margin: "0 auto",
    textAlign: "right",
    fontSize: "10px",
    color: "#58595B",
  },

  jobTitles: {
    margin: "0px 0px 5px 0px",
  },

  grid: {
    paddingLeft: "30px",
    paddingright: "30px",
  },

  text: {
    font: "Myriad Pro",
  },

  close: {
    position: "absolute",
    right: "8%",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `#B6A165 `,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "2px",
    borderColor: "#B6A165 ",
  },

  textField: {
    width: "111ch",
    margin: "5px 20px 5px 20px",
  },

  title: {
    width: "95%",
    display: "block",
    margin: "15px 10px 2px 10px",
    textAlign: "left",
    fontSize: "16px",
    color: "#58595B",
  },

  checkbox: {
    color: "#B6A165",
    "&$checked": {
      color: "#B6A165",
    },
  },

  checked: {},

  checkboxGrid: {
    fontSize: "7px",
    margin: "5px 5px 0px 14px",
  },

  radioButton: {
    color: "#58595B",
    margin: "5px 20px 0px 30px",
    fontSize: "16px",
  },

  radioMarginFirst: {
    margin: "15px 20px 5px 30px",
    width: "85%",
  },

  radioMarginSecond: {
    margin: "15px 20px 0px 30px",
    width: "85%",
  },

  contactBox: {
    fontSize: "7px",
    textAlign: "center",
    display: "block",
    color: "#58595B",
    cursor: "pointer",
    marginLeft: "4px",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCredits: false,
      openPostJob: false,
      openFaq: false,
      active: 0,
      value: "Full-Time",
      description: "",
      requirement: "",
      max_characters: 2000,
      checkedBox: false,
      numJobs: 0,
      numChats: 0,
      jobsData: {
        title: "Test Title",
        company: "Test Company",
        country: "Random Country",
        region: "Random Region",
        city: "Random City",
        description: "Description 123...",
        requirements: "Requirements 123...",
        posted_by: "ahmed.r.hamodi@gmail.com", // email
        poster_family_name: "Hamodi",
        poster_given_name: "Ahmed",
        people_contacted: 0,
        job_type: "REGULAR_JOB", // BOARD_POSITION or REGULAR_JOB
        job_tags: ["SOFTWARE"],
        salary: 30,
        deadline: 0,
      },
    };
  }

  componentDidMount() {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    httpGet(
      "jobs?user_id=" + userInfo.username,
      localStorage.getItem("idToken")
    ).then((jobs) => {
      this.setState({
        numJobs: jobs.data.count ? jobs.data.count : 0,
      });
    });
    httpGet(
      "chats?user_id=" + userInfo.username,
      localStorage.getItem("idToken")
    ).then((chats) => {
      this.setState({
        numChats: chats.data.count ? chats.data.count : 0,
      });
    });
  }

  handleJobTypeChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleContactMeChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };

  postJob = (event) => {
    this.setState({
      openPostJob: true,
    });
  };

  submitJob = () => {
    console.log("post job");
    httpPost("jobs", localStorage.getItem("idToken"), this.state.jobsData);
  };

  purchaseCredits = (event) => {
    this.setState({
      openCredits: true,
    });
  };

  openFaq = (event) => {
    this.setState({
      openFaq: true,
    });
  };

  handlePostJobClose = (event) => {
    this.setState({
      openPostJob: false,
    });
  };

  handleFaqClose = (event) => {
    this.setState({
      openFaq: false,
    });
  };

  handleDescriptionChange = (name) => (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleRequirementChange = (name) => (event) => {
    this.setState({
      requirement: event.target.value,
    });
  };

  getUserProfile = () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    let userLocation = "N/A";
    if (userProfile.address && userProfile.address.formatted) {
      const address = JSON.parse(userProfile.address.formatted);
      if (!address.country.includes("Other")) {
        userLocation = address.region + ", " + address.country;
      }
    }

    return {
      name: userProfile.given_name + " " + userProfile.family_name,
      occupation: userProfile["custom:position"],
      location: userLocation,
      company: userProfile["custom:company"] ?? "N/A",
      numCoffeeChats: this.state.numChats,
      numJobApplications: this.state.numJobs,
      numCredits: userProfile["custom:credits"],
    };
  };

  render() {
    const classes = this.props.classes;
    const userProfile = this.getUserProfile();
    return (
      <div className={classes.root1}>
        <div style={{ margin: "auto" }}>
          <img className={classes.image} src={pic0} alt={"User Profile"} />
          <span>
            <p className={classes.name}>{userProfile.name}</p>
            <p className={classes.occupation}>{userProfile.occupation}</p>
            <p className={classes.city}>
              <FontAwesomeIcon
                icon={faMapMarker}
                style={{
                  width: "14px",
                  height: "14px",
                  marginTop: "2px",
                  marginRight: "10px",
                }}
              />
              {userProfile.location}
            </p>
            <p className={classes.company}>
              <FontAwesomeIcon
                icon={faBuilding}
                style={{
                  width: "14px",
                  height: "14px",
                  margin: "2px",
                  marginRight: "10px",
                }}
              />
              <b>{userProfile.company} </b>
            </p>
            <p className={classes.numCoffeChat}>
              {userProfile.numCoffeeChats} Coffee Chats
            </p>
            <p className={classes.numCoffeChat}>
              {userProfile.numJobApplications} Jobs Applied To
            </p>
            <div className={classes.circle}>
              <p className={classes.credits}>{userProfile.numCredits}</p>
              <p className={classes.available}>Credits Available</p>
            </div>
          </span>

          <Button
            className={classes.button}
            variant="contained"
            onClick={this.changeToSignUp}
          >
            Purchase Credits
          </Button>
          <Button
            className={classes.button1}
            variant="contained"
            onClick={this.postJob}
          >
            Post a Job
          </Button>
          <EscalationsCard />
          <p className={classes.updateProfile}>Update your profile</p>
          <p className={classes.contact}>Contact Admin Support</p>
          <p className={classes.faq} onClick={this.openFaq}>
            FAQ
          </p>
          <Dialog
            open={this.state.openPostJob}
            onClose={this.handlePostJobClose}
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
                  Post a Job
                </h2>
              </div>
              <img
                onClick={this.handlePostJobClose}
                className={classes.close}
                style={{ width: "14px", height: "14px", cursor: "pointer" }}
                src={close}
                alt="Close button"
              />
            </Toolbar>
            <div className={classes.grid}>
              <Grid container item xs={12} spacing={1}>
                <Grid
                  container
                  item
                  xs={6}
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
                    <div className={classes.radioMarginFirst}>
                      <TextField
                        label="Job Title"
                        fullWidth
                        className={classes.textbox}
                        InputProps={{
                          classes: {
                            root: classes.outline,
                            focused: classes.cssFocused,
                            input: classes.input,
                          },
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={6}
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-end"
                    justify="flex-end"
                  >
                    <div className={classes.radioMarginFirst}>
                      <TextField
                        label="Location"
                        fullWidth
                        className={classes.textbox}
                        InputProps={{
                          classes: {
                            input: classes.input,
                          },
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={6}
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
                    <div className={classes.radioMarginSecond}>
                      <TextField
                        label="Company"
                        fullWidth
                        className={classes.textbox}
                        InputProps={{
                          classes: {
                            input: classes.input,
                          },
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={3}
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel
                        checked={this.state.value === "Full-Time"}
                        value="Full-Time"
                        control={<Radio color="primary" />}
                        label="Full-Time"
                        onChange={this.handleJobTypeChange}
                      />
                    </div>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="center"
                    justify="center"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel
                        checked={this.state.value === "Contract"}
                        value="Contract"
                        control={<Radio color="primary" />}
                        label="Contract"
                        onChange={this.handleJobTypeChange}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={3}
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
                    <div className={classes.radioButton}>
                      <FormControlLabel
                        checked={this.state.value === "Part-Time"}
                        value="Part-Time"
                        control={<Radio color="primary" />}
                        label="Part-Time"
                        onChange={this.handleJobTypeChange}
                      />
                    </div>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel
                        checked={this.state.value === "Internship"}
                        value="Internship"
                        control={<Radio color="primary" />}
                        label="Internship"
                        onChange={this.handleJobTypeChange}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <p className={classes.title}>Job Description</p>
                    <TextField
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        maxLength: this.state.max_characters,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      value={this.state.description}
                      helperText={`${this.state.description.length}/${this.state.max_characters} Characters`}
                      className={classes.textField}
                      onChange={this.handleDescriptionChange("name")}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <p className={classes.title}>Job Requirement</p>
                    <TextField
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        maxLength: this.state.max_characters,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      value={this.state.requirement}
                      helperText={`${this.state.requirement.length}/${this.state.max_characters} Characters`}
                      className={classes.textField}
                      onChange={this.handleRequirementChange("name")}
                    />
                  </Grid>
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
                  <div className={classes.contactBox}>
                    <FormControlLabel
                      className={classes.checkboxGrid}
                      control={
                        <Checkbox
                          checked={this.state.checkedBox}
                          onChange={this.handleContactMeChange("checkedBox")}
                          value="checkedBox"
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Allow candidates to contact me about the posting (maximum of 4) "
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <DialogActions>
              <Button
                className={classes.button1}
                variant="contained"
                onClick={this.submitJob}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.openFaq}
            onClose={this.handleFaqClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth={"md"}
            PaperProps={{
              style: { borderRadius: 12 },
            }}
          >
            <DialogTitle id="scroll-dialog-title">
              <div>
                <h2
                  style={{ margin: "0px", marginTop: "10px", color: "#B5A165" }}
                >
                  FAQ
                </h2>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
                component={"span"}
              >
                <p>TODO: Frequently asked questions section</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleFaqClose}
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "auto", backgroundColor: "#B5A165" }}
              >
                <b>Close</b>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

Landing = withMyHook(Landing);
export default Landing;
