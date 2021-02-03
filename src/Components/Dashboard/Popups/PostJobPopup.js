import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import close from "../../Images/close.png";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { httpPost } from "../../../lib/dataAccess";
import { Auth } from "aws-amplify";
import { withSnackbar } from "notistack";
/* TODO: add back when industry tags is working
import IndustryTags from "../../Registration/industry_tags";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";*/

const useStyles = makeStyles((theme) => ({
  button: {
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
  toolbar: {
    height: "8vh",
    backgroundColor: "black",
    boxShadow: "0px 0px 0px",
    width: "100%",
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
  grid: {
    paddingLeft: "30px",
    paddingright: "30px",
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

class PostJobPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max_characters: 3000,
      min_characters: 350,
      checkedBox: false,
      showError: false,
      errorText: "",
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
        deadline_string: "",
        can_contact: false,
      },
    };
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

  submitJob = async () => {
    // check that all the required fields are set / properly set
    if (this.state.jobsData.description.length > this.state.max_characters) {
      this.props.enqueueSnackbar(
        "The job description exceeds the character limit of " +
          this.state.max_characters +
          " characters.",
        {
          variant: "warning",
        }
      );
      return;
    }
    if (this.state.jobsData.requirements.length > this.state.max_characters) {
      this.props.enqueueSnackbar(
        "The job requirements exceeds the character limit of " +
          this.state.max_characters +
          " characters.",
        {
          variant: "warning",
        }
      );
      return;
    }
    if (this.state.jobsData.description.length < this.state.min_characters) {
      this.props.enqueueSnackbar(
        "The job description needs to be at least " +
          this.state.min_characters +
          " characters.",
        {
          variant: "warning",
        }
      );
      return;
    }
    if (this.state.jobsData.requirements.length < this.state.min_characters) {
      this.props.enqueueSnackbar(
        "The job requirements needs to be at least " +
          this.state.min_characters +
          " characters.",
        {
          variant: "warning",
        }
      );
      return;
    }
    if (this.state.jobsData.job_tags.length > 3) {
      this.props.enqueueSnackbar("There are more than 3 job tags selected.", {
        variant: "warning",
      });
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
        this.props.enqueueSnackbar("Failed:" + err.response.data.message, {
          variant: "error",
        });
      });
    this.props.handlePostJobClose();
  };

  handleFormDataChange = (id) => (event) => {
    var jobsDataObj = { ...this.state.jobsData };

    if (id === "requirements") {
      jobsDataObj.requirements = event.target.value;
    } else if (id === "description") {
      jobsDataObj.description = event.target.value;
    } else if (id === "salary") {
      const re = /^[0-9\b]+$/;
      if (event.target.value === "" || re.test(event.target.value)) {
        jobsDataObj.salary = event.target.value;
      }
    } else if (id === "city") {
      jobsDataObj.city = event.target.value;
    } else if (id === "region") {
      jobsDataObj.region = event.target.value;
    } else if (id === "country") {
      jobsDataObj.country = event.target.value;
    } else if (id === "company") {
      jobsDataObj.company = event.target.value;
    } else if (id === "title") {
      jobsDataObj.title = event.target.value;
    } else if (id === "job_type") {
      jobsDataObj.job_type = event.target.value;
    } else if (id === "contact_me") {
      jobsDataObj.can_contact = !this.state.jobsData.can_contact;
      this.setState({
        checkedBox: event.target.checked,
      });
    } else if (id === "expiration_date") {
      jobsDataObj.deadline = parseInt(
        (new Date(event.target.value).getTime() / 1000).toFixed(0)
      );
      jobsDataObj.deadline_string = event.target.value;
    }

    this.setState({
      jobsData: jobsDataObj,
    });
  };

  render() {
    const classes = this.props.classes;

    return (
      <Dialog
        open={this.props.openPostJob}
        onClose={this.props.handlePostJobClose}
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
            <h2 style={{ margin: "0px", marginTop: "10px", color: "white" }}>
              Post a Job
            </h2>
          </div>
          <img
            onClick={this.props.handlePostJobClose}
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
                    onChange={this.handleFormDataChange("title")}
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
                      onChange={this.handleFormDataChange("country")}
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
                      onChange={this.handleFormDataChange("region")}
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
                      onChange={this.handleFormDataChange("city")}
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
                    onChange={this.handleFormDataChange("company")}
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
                    value={this.state.jobsData.salary}
                    fullWidth
                    className={classes.textbox}
                    InputProps={{
                      classes: {
                        input: classes.input,
                      },
                    }}
                    onChange={this.handleFormDataChange("salary")}
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
                xs={11}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <TextField
                  className={classes.textbox}
                  style={{ marginTop: "20px", marginLeft: "30px" }}
                  InputProps={{
                    inputProps: { min: "1900-01-01", max: "3000-12-30" },
                  }}
                  id="date"
                  label="Expiration Date (optional)"
                  type="date"
                  format="MM/dd/yyyy"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={this.state.jobsData.deadline_string}
                  onChange={this.handleFormDataChange("expiration_date")}
                />
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
                alignItems="flex-start"
                justify="flex-start"
              >
                <div className={classes.radioButton}>
                  <FormControlLabel
                    checked={this.state.jobsData.job_type === "REGULAR_JOB"}
                    value="REGULAR_JOB"
                    control={<Radio color="primary" />}
                    label="Regular Job"
                    onChange={this.handleFormDataChange("job_type")}
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
                    checked={this.state.jobsData.job_type === "BOARD_POSITION"}
                    value="BOARD_POSITION"
                    control={<Radio color="primary" />}
                    label="Board Position"
                    onChange={this.handleFormDataChange("job_type")}
                  />
                </div>
              </Grid>
            </Grid>
            {/*<Grid
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
                        error={showError}
                        helperText={errorText}
                        className={classes.textbox}
                      />
                    )}
                  />
                </div>
              </Grid>
            </Grid>*/}
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
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  value={this.state.jobsData.description}
                  helperText={`${this.state.jobsData.description.length}/${this.state.max_characters} Characters`}
                  className={classes.textField}
                  onChange={this.handleFormDataChange("description")}
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
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  value={this.state.jobsData.requirement}
                  helperText={`${this.state.jobsData.requirements.length}/${this.state.max_characters} Characters`}
                  className={classes.textField}
                  onChange={this.handleFormDataChange("requirements")}
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
                      onChange={this.handleFormDataChange("contact_me")}
                      value="checkedBox"
                      classes={{
                        root: classes.checkbox,
                        checked: classes.checked,
                      }}
                    />
                  }
                  label="Would you be interested in candidates contacting you in the future?"
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <DialogActions>
          <Button
            className={classes.button}
            variant="contained"
            onClick={this.submitJob}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PostJobPopup = withMyHook(PostJobPopup);
export default withSnackbar(PostJobPopup);
