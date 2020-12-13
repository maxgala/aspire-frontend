import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import blankProfile from "../Images/faceShot/blank_profile.png";
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
// import IndustryTags from "../Registration/industry_tags";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import Chip from "@material-ui/core/Chip";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";
import Stripe from "../Payment/StripeCredits";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

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
    "@media (max-width: 480px)": {
      fontSize: "25px",
    },
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

  infinite: {
    fontFamily: "minion-pro, serif",
    fontWeight: "bolder",
    fontSize: "40px",
    color: "#FFFFFF",
    margin: "30px 20px 0px 20px",
    textAlign: "center",
    display: "inline-block",
    width: "65%",
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
    "@media (max-width: 480px)": {
      width: "120px",
    },
    padding: "1vh",
    left: "10%",
    borderRadius: "50%",
    marginTop: "2vh",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    objectFit: "cover",
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
    "@media (max-width: 600px)": {
      margin: "0px",
      fontSize: "5px",
    },
    fontSize: "16px",
  },

  radioMarginFirst: {
    margin: "15px 20px 5px 30px",
    width: "85%",
    "@media (max-width: 600px)": {
      marginLeft: "0px",
    },
  },

  radioMarginSecond: {
    margin: "15px 20px 0px 30px",
    width: "85%",
    "@media (max-width: 600px)": {
      marginLeft: "0px",
    },
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
      max_characters: 2000,
      checkedBox: false,
      numJobs: 0,
      numChats: 0,
      showError: false,
      jobsData: {
        title: "",
        company: "",
        country: "",
        region: "",
        city: "",
        description: "",
        requirements: "",
        job_type: "REGULAR_JOB", // BOARD_POSITION or REGULAR_JOB
        job_tags: [],
        salary: 0,
        deadline: 0,
        can_contact: false,
      },
      credits: jwtDecode(localStorage.getItem("idToken"))["custom:credits"],
      userType: jwtDecode(localStorage.getItem("idToken"))["custom:user_type"],
    };
  }

  async componentDidMount() {
    Auth.currentUserInfo().then((res) => {
      this.setState({
        credits: res.attributes["custom:credits"],
      });
    });

    let idToken = (await Auth.currentSession())
      .getIdToken()
      .getJwtToken()
      .toString();
    const idTokeninfo = jwtDecode(idToken);
    await httpGet("jobs?user_id=" + idTokeninfo.email, idToken).then((jobs) => {
      this.setState({
        numJobs: jobs.data.count ? jobs.data.count : 0,
      });
    });

    await httpGet("chats?email=" + idTokeninfo.email, idToken).then((chats) => {
      this.setState({
        numChats: chats.data.count ? chats.data.count : 0,
      });
    });
  }

  onTagsChange = (event, values) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.job_tags = values;
    this.setState({
      jobsData: jobsDataObj,
    });
    if (values.length > 3) {
      this.setState({
        showError: true,
        errorText: "Please pick up to 3 tags",
      });
    } else {
      this.setState({
        showError: false,
        errorText: "",
      });
    }
  };

  handleJobTypeChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.job_type = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleContactMeChange = (name) => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.can_contact = !this.state.jobsData.can_contact;
    this.setState({
      [name]: event.target.checked,
      jobsData: jobsDataObj,
    });
  };

  postJob = (event) => {
    this.setState({
      openPostJob: true,
    });
  };

  submitJob = async () => {
    // check that all the required fields are set / properly set
    if (this.state.jobsData.job_tags.length > 3) {
      alert("There are more than 3 job tags selected.");
      return;
    }
    if (
      this.state.jobsData.title === "" ||
      this.state.jobsData.title === undefined ||
      this.state.jobsData.company === "" ||
      this.state.jobsData.company === undefined ||
      this.state.jobsData.country === "" ||
      this.state.jobsData.country === undefined ||
      this.state.jobsData.region === "" ||
      this.state.jobsData.region === undefined ||
      this.state.jobsData.city === "" ||
      this.state.jobsData.city === undefined ||
      this.state.jobsData.description === "" ||
      this.state.jobsData.description === undefined ||
      this.state.jobsData.requirements === "" ||
      this.state.jobsData.requirements === undefined
    ) {
      this.props.enqueueSnackbar(
        "One of the required fields is not set (title, company, country, region, city, description or requirements).",
        {
          variant: "warning",
        }
      );
      return;
    }

    let idToken = (await Auth.currentSession())
      .getIdToken()
      .getJwtToken()
      .toString();

    // get user info and update jobs data
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.posted_by = userProfile.email;
    jobsDataObj.poster_family_name = userProfile.family_name;
    jobsDataObj.poster_given_name = userProfile.given_name;

    // post job and close popup
    await httpPost("jobs", idToken, jobsDataObj)
      .then((res) => {
        this.props.enqueueSnackbar("Successfully submitted a job posting:", {
          variant: "success",
        });
      })
      .catch((err) => {
        this.props.enqueueSnackbar("Failed:" + err, {
          variant: "error",
        });
      });
    this.setState({
      openPostJob: false,
    });
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

  handleCreditsClose = () => {
    this.setState({
      openCredits: false,
    });
  };

  handleCreditsOpen = () => {
    this.setState({
      openCredits: true,
    });
  };

  handleTitleChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.title = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleCompanyChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.company = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleCountryChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.country = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleRegionChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.region = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleCityChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.city = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleSalaryChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.salary = event.target.value;
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleDescriptionChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.description = event.target.value
      .toString()
      .slice(0, this.state.max_characters);
    this.setState({
      jobsData: jobsDataObj,
    });
  };

  handleRequirementChange = () => (event) => {
    var jobsDataObj = { ...this.state.jobsData };
    jobsDataObj.requirements = event.target.value
      .toString()
      .slice(0, this.state.max_characters);
    this.setState({
      jobsData: jobsDataObj,
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

    let profilePicture = blankProfile;
    if (userProfile["picture"]) {
      profilePicture = userProfile["picture"];
    }

    return {
      name: userProfile.given_name + " " + userProfile.family_name,
      occupation: userProfile["custom:position"],
      location: userLocation,
      company: userProfile["custom:company"] ?? "N/A",
      numCoffeeChats: this.state.numChats,
      numJobApplications: this.state.numJobs,
      numCredits: userProfile["custom:credits"],
      profilePicture: profilePicture,
    };
  };

  render() {
    const classes = this.props.classes;
    const userProfile = this.getUserProfile();
    return (
      <div className={classes.root1}>
        <div style={{ margin: "auto" }}>
          <img
            className={classes.image}
            src={userProfile.profilePicture}
            alt={"User Profile"}
          />
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
              {this.state.userType === "MENTOR" ? (
                <AllInclusiveIcon className={classes.infinite} />
              ) : (
                <p className={classes.credits}>{this.state.credits}</p>
              )}
              <p className={classes.available}>Credits Available</p>
            </div>
          </span>

          {this.state.userType !== "MENTOR" ? (
            <span>
              <Button
                className={classes.button}
                variant="contained"
                onClick={this.handleCreditsOpen}
              >
                Purchase Credits
              </Button>
              <Dialog
                maxWidth={"md"}
                fullWidth={true}
                disableEscapeKeyDown
                disableBackdropClick
                onClose={this.handleCreditsClose}
                aria-labelledby="stripe-dialog"
                open={this.state.openCredits}
              >
                <Stripe appContext={this.props.appContext} landing={this} />
              </Dialog>
            </span>
          ) : null}

          {jwtDecode(localStorage.getItem("idToken"))["custom:user_type"] !==
          "FREE" ? (
            <Button
              className={classes.button1}
              variant="contained"
              onClick={this.postJob}
            >
              Post a Job
            </Button>
          ) : null}

          <EscalationsCard />
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
                  xs={12}
                  sm={6}
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
                        onChange={this.handleTitleChange()}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
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
                    <Grid
                      container
                      item
                      xs={4}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <div className={classes.radioMarginFirst}>
                        <TextField
                          label="Country"
                          fullWidth
                          className={classes.textbox}
                          InputProps={{
                            classes: {
                              input: classes.input,
                            },
                          }}
                          onChange={this.handleCountryChange()}
                        />
                      </div>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <div className={classes.radioMarginFirst}>
                        <TextField
                          label="Region"
                          fullWidth
                          className={classes.textbox}
                          InputProps={{
                            classes: {
                              input: classes.input,
                            },
                          }}
                          onChange={this.handleRegionChange()}
                        />
                      </div>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <div className={classes.radioMarginFirst}>
                        <TextField
                          label="City"
                          fullWidth
                          className={classes.textbox}
                          InputProps={{
                            classes: {
                              input: classes.input,
                            },
                          }}
                          onChange={this.handleCityChange()}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
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
                        onChange={this.handleCompanyChange()}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
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
                        label="Salary (optional)"
                        fullWidth
                        className={classes.textbox}
                        InputProps={{
                          classes: {
                            input: classes.input,
                          },
                        }}
                        onChange={this.handleSalaryChange()}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  <Grid
                    container
                    item
                    xs={6}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel
                        checked={this.state.jobsData.job_type === "REGULAR_JOB"}
                        value="REGULAR_JOB"
                        control={<Radio color="primary" />}
                        label="Regular Job"
                        onChange={this.handleJobTypeChange()}
                      />
                    </div>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    spacing={0}
                    alignItems="center"
                    justify="center"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel
                        checked={
                          this.state.jobsData.job_type === "BOARD_POSITION"
                        }
                        value="BOARD_POSITION"
                        control={<Radio color="primary" />}
                        label="Board Position"
                        onChange={this.handleJobTypeChange()}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  {/* <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <div className={classes.radioMarginFirst}>
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        fullWidth
                        options={IndustryTags.map((option) => option.name)}
                        defaultValue={[]}
                        freeSolo
                        onChange={this.onTagsChange}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Tags (Up to 3)"
                            error={this.state.showError}
                            helperText={this.state.errorText}
                            className={classes.textbox}
                          />
                        )}
                      />
                    </div>
                  </Grid> */}
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
                      helperText={`${this.state.jobsData.description.length}/${this.state.max_characters} Characters`}
                      className={classes.textField}
                      onChange={this.handleDescriptionChange()}
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
                      helperText={`${this.state.jobsData.requirements.length}/${this.state.max_characters} Characters`}
                      className={classes.textField}
                      onChange={this.handleRequirementChange()}
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
                <h3 style={{ color: "#B5A165" }}>Professional Career:</h3>
                <p>
                  <b>What kind of jobs are posted on MAX Aspire?</b>
                </p>
                <p>
                  Employers are eager to hire talented individuals from the MAX
                  Network. Jobs are posted from different kind of employers in
                  many sectors and industries. Apply to job opportunities posted
                  directly from a MAX Aspire member.
                </p>
                <p>
                  <b>How do I access the application portal?</b>
                </p>
                <p>
                  After you create an account, you can start accessing the
                  application portal by signing in and navigating through roles.
                </p>
                <p>
                  <b>What makes applying for jobs on MAX portal different?</b>
                </p>
                <p>
                  Jobs on the platform are posted directly from a MAX Aspire
                  member, giving you the ability to directly reach out to job
                  posters and increasing your chances of landing the job.
                </p>
                <p>
                  <b>Who posts the roles for the MAX Aspire platform?</b>
                </p>
                <p>
                  All jobs are posted by MAX Aspire members that include HR
                  professionals, and our carefully selected Senior executives.
                </p>
                <p>
                  <b>
                    Is there a limit on how many jobs I can post on the
                    platform?
                  </b>
                </p>
                <p>There is no limit to how many jobs you can post.</p>
                <p>
                  <b>Can I apply to multiple roles with the same employer?</b>
                </p>
                <p>
                  Yes, you can apply to multiple roles with the same employer.
                </p>
                <p>
                  <b>How many credits does it take to apply for roles?</b>
                </p>
                <p>
                  Applying for roles for premium members requires no credit.
                  However to directly contact the job poster requires 5 credits.
                </p>
                <br />
                <h3 style={{ color: "#B5A165" }}>Mock Interview:</h3>
                <p>
                  <b>What is a Mock Interview?</b>
                </p>
                <p>
                  A mock interview is a practice interview that aims to simulate
                  as closely as possible that actual interview environment with
                  the goal of preparing you and giving you the best chances to
                  land your dream job.
                </p>
                <p>
                  <b>What are the advantages of a Mock Interview?</b>
                </p>
                <ul>
                  <li>
                    Reduce all the stress and anxiety by being prepared and
                    ready
                  </li>
                  <li>
                    Provide you with the opportunity for feedback in a
                    low-stress environment
                  </li>
                  <li>Increase your confidence</li>
                  <li>
                    Learn from the tough questions and walk in your interview
                    prepared for all kinds of questions
                  </li>
                </ul>
                <p>
                  <b>How long should I prepare for a Mock interview?</b>
                </p>
                <ul>
                  <li>
                    Try your best to simulate the interview environment as much
                    as you can
                  </li>
                  <li>Dress for success</li>
                  <li>Bring your up to date resume</li>
                  <li>Research the company you are applying for</li>
                </ul>
                <p>
                  <b>Who will be conducting my Mock Interview?</b>
                </p>
                <p>
                  A member from the carefully selected Senior executives will be
                  conducting your mock interview.
                </p>
                <p>
                  <b>Where can I sign up for a Mock Interview?</b>
                </p>
                <p>
                  Once you create a premium account and sign in you will have
                  access to get started for Mock interviews through the Coffee
                  Chats dashboard. Alternatively, you can create a Free
                  membership then you can get started through pay per use
                  service.
                </p>
                <p>
                  <b>Can I sign up for multiple Mock Interviews?</b>
                </p>
                <p>Yes, as long as you have enough credits.</p>
                <p>
                  <b>
                    What are some of the tips for a successful Mock Interview?
                  </b>
                </p>
                <p>
                  Practice practice practice! Try to simulate the interview
                  setting and treat the interview like the actual interview by
                  doing all the preparation work and research before you start.
                </p>
                <p>
                  <b>How many credits does it take to book a Mock Interview?</b>
                </p>
                <p>5 credits are required.</p>
                <br />
                <h3 style={{ color: "#B5A165" }}>1 on 1:</h3>
                <p>
                  <b>Who are the Senior Executives?</b>
                </p>
                <p>
                  Our Senior Executives are high performing, accomplished Senior
                  Executive in their respective fields with 15+ years of
                  experience to help guide, mentor, and assist in shaping your
                  career.
                </p>
                <p>
                  <b>What are the advantages of a 1 on 1 session?</b>
                </p>
                <ul>
                  <li>
                    Connect and network with some of the highest achieving
                    Senior executives and get mentored by them
                  </li>
                  <li>Improve your communication and personal skills</li>
                  <li>Know the skills needed to land your dream job</li>
                </ul>
                <p>
                  <b>How should I prepare for a 1 on 1 session?</b>
                </p>
                <p>
                  Be prepared by doing research on the Senior executives in your
                  session and preparing a list of questions or set of Goals you
                  are looking to achieve from the session.
                </p>
                <p>
                  <b>How many credits does it take to book a 1 on 1?</b>
                </p>
                <p>5 credits are required.</p>
                <p>
                  <b>What is the process for scheduling a 1 on 1?</b>
                </p>
                <p>
                  Once you create a premium account and sign in, you will have
                  access to get started with 1 on 1 chats. Alternatively, you
                  can create a Free account and then use the pay per use model
                  to book coffee chats.
                </p>
                <br />
                <h3 style={{ color: "#B5A165" }}>4 on 1:</h3>
                <p>
                  <b>How should I prepare for a 4 on 1 session?</b>
                </p>
                <p>
                  Set clear goals of what you are looking to achieve in this
                  session.
                </p>
                <p>
                  <b>How many credits does it take to book a 4 on 1?</b>
                </p>
                <p>3 credits are required.</p>
                <p>
                  <b>What is the process for scheduling a 4 on 1?</b>
                </p>
                <p>
                  Once you create a premium account and sign in, you will have
                  access to get started with 4 on 1 chats. Alternatively, you
                  can create a Free account and then use the pay per use model
                  to book coffee chats.
                </p>
                <br />
                <h3 style={{ color: "#B5A165" }}>Board of Directors:</h3>
                <p>
                  <b>Who can apply for a board role?</b>
                </p>
                <p>
                  Please refer to the job postings. if you meet all the
                  requirements and eligibility criteria then click on the “Apply
                  Now” tab and follow the steps.
                </p>
                <p>
                  <b>
                    I submitted my application online but I did not receive a
                    confirmation email.
                  </b>
                </p>
                <p>
                  Please allow between 24-48hrs before reaching out to the
                  support team. Confirmation email is automatically generated.
                  Check your spam folder before reaching out to the support
                  team.
                </p>
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
export default withSnackbar(Landing);
