import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import { withRouter } from "react-router-dom";
import { Routes } from "../../entry/routes/Routes";
import { withSnackbar } from "notistack";
import MenuItem from "@material-ui/core/MenuItem";
import Industries from "../Registration/industry";
import IndustryTags from "../Registration/industry_tags";
import Country from "../Registration/Country";
import States from "../Registration/States";
import Education from "../Registration/Education";
import Province from "../Registration/Provinces";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Auth } from "aws-amplify";
import Tooltip from "@material-ui/core/Tooltip";
import S3FileUpload from "react-s3";
import { DropzoneDialog } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "15vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titlePaper: {
    margin: theme.spacing(0, 0, 3),
  },
  avatar: {
    marginTop: "3vh",
    width: "100px",
    height: "100px",
    padding: "1vw",
  },
  choiceText: {
    margin: theme.spacing(2, 0, 1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit_back: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "5%",
    marginRight: "5%",
    height: 50,
    width: "30%",
    borderRadius: 50,
    backgroundColor: "#1A1A1A",
    borderStyle: "solid",
    color: "#F1F1F1",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "5%",
    height: 50,
    width: "30%",
    borderStyle: "solid",
    borderRadius: 50,
    backgroundColor: "#b5a165",
    color: "white",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  disagree: {
    margin: theme.spacing(3, 0, 2),
    width: "30%",
    backgroundColor: "#1A1A1A",
    borderStyle: "solid",
    color: "#F1F1F1",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  agree: {
    margin: theme.spacing(3, 0, 2),
    width: "30%",
    backgroundColor: "#b5a165",
    color: "white",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  payButton: {
    borderRadius: 50,
    backgroundColor: "#6EA0B5",
    borderStyle: "solid",
    color: "#F1F1F1",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  choice: {
    width: "25%",
  },
  term: {
    color: "black",
    "&:hover": {
      color: "red",
    },
  },
  cardRoot: {
    margin: theme.spacing(0, 2, 1),
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
  membership_options: {
    "@media (min-width: 480px)": {
      display: "inline-flex",
    },
    margin: "auto",
  },
  grid: {
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "30px",
  },
  features_title: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "48px",
    margin: "0px",
    paddingTop: "60px",
    paddingBottom: "30px",
    color: "black",
  },
  autoComplete: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  formControl: {
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  label: {
    fontSize: "larger",
  },
  uploadText: {
    margin: theme.spacing(2, 0, 1),
    "@media (max-width: 480px)": { width: "180px" },
    width: "200px",
  },
  uploadImage: {
    marginLeft: theme.spacing(1, 0, 1),
    backgroundColor: "#6EA0B5",
    height: 50,
    color: "white",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  profilePic: {
    margin: theme.spacing(3, 0, 2),
    width: "120px",
    height: "auto",
    borderRadius: "50%",
  },
}));

const IndustryLabels = [];
for (let i = 0; i < Industries.length; ++i) {
  IndustryLabels.push(Industries[i]["name"]);
}

const IndustryTagsLabels = [];
for (let i = 0; i < IndustryTags.length; ++i) {
  IndustryTagsLabels.push(IndustryTags[i]["name"]);
}

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      year_of_birth: "",
      industry: "",
      industry_tags: [],
      title: "",
      company: "",
      education: "",
      province: "",
      city: "",
      country: "",
      states: "",
      displayProvince: "none",
      displayStates: "",
      imageFiles: [],
      resumeFiles: [],
      profilePicPreviewText: "Upload your Profile Photo",
      profilePicButtonText: "Upload",
      resumeUploadText: "Upload your Resume ",
      resumeButtonText: "Upload",
      filePreview: [],
      resume: "",
      picture: "",
    };
  }

  componentDidMount() {
    // Get the latest user's data, then parse and store it into state.
    this.getUser().then((userResponseData) => {
      const userData = userResponseData.attributes;

      let addressData = JSON.parse(userData.address);

      if (addressData.country === "CA") {
        // Show Provinces if Canada
        this.setState({
          province: addressData.region,
          displayProvince: "",
          displayStates: "none",
        });
      } else if (addressData.country === "USA") {
        // Show states by if USA
        this.setState({
          displayProvince: "none",
          displayStates: "",
          states: addressData.region,
        });
      }

      this.setState({
        email: userData.email,
        firstName: userData.given_name,
        lastName: userData.family_name,
        phone: userData.phone_number,
        year_of_birth: userData.birthdate,
        industry: userData["custom:industry"],
        industry_tags: userData["custom:industry_tags"].split(","),
        title: userData["custom:position"],
        company: userData["custom:company"],
        education: userData["custom:education_level"],
        city: addressData.locality,
        country: addressData.country,
      });
    });
  }

  onTagsChange = (event, values) => {
    this.setState({
      industry_tags: values,
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

  handleProvinceChange = (event) => {
    this.setState({
      states: "",
      province: event.target.value,
    });
  };

  handleStateChange = (event) => {
    this.setState({
      states: event.target.value,
      province: "",
    });
  };

  handleCountryChange = (event) => {
    this.setState({
      country: event.target.value,
      displayStates: event.target.value === "USA" ? "" : "None",
      displayProvince: event.target.value === "CA" ? "" : "None",
    });
  };

  handleCityChange = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  handleIndustryChange = (event) => {
    this.setState({
      industry: event.target.value,
    });
  };

  handleEducationChange = (event) => {
    this.setState({
      education: event.target.value,
    });
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleCompanyChange = (event) => {
    this.setState({
      company: event.target.value,
    });
  };

  handleFirstNameChange = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastNameChange = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleYearChange = (event) => {
    this.setState({
      year_of_birth: event.target.value,
    });
  };

  handlePhoneChange = (value) => {
    this.setState({
      phone: value,
    });
  };

  uploadToS3(file, folder, resume = true) {
    let config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: this.state.email + "/" + folder /* will change based on users */,
      region: "us-east-1",
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };
    let page = this;
    S3FileUpload.uploadFile(file, config)
      .then((data) => {
        if (!resume) {
          page.setState({
            picture: data.location,
          });
        } else {
          page.setState({
            resume: data.location,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  handleResumeSave(resume) {
    this.setState({
      resumeUploadText: resume[0]["name"],
      resumeButtonText: "Upload Again",
      fileDialogOpen: false,
      resumeFiles: resume,
    });
    this.uploadToS3(resume[0], "resumes", true);
  }

  handlePicSave(files) {
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    let page = this;
    reader.onload = function () {
      // Saving files to state for further use and closing Modal.
      document = reader.result;
      page.setState({
        profilePicPreviewText: files[0].name,
        profilePicButtonText: "Upload Again",
        imageFiles: [document],
        open: false,
      });
      page.uploadToS3(files[0], "pictures", false);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleDialog = (event) => {
    this.setState({
      dialogueOpen: !this.state.dialogueOpen,
    });
  };

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  /**
   * This function will get the latest information from the currently logged in user.
   * @return object user
   */
  getUser = async () => {
    let user = await Auth.currentAuthenticatedUser();

    return user;
  };

  /**
   * This function will submit the user profile changes provided in the form.
   */
  submitChanges = async () => {
    let updateUserData = {};

    // Translate data from state to Cognito object
    updateUserData.given_name = this.state.firstName;
    updateUserData.family_name = this.state.lastName;
    updateUserData.phone_number = this.state.phone;
    updateUserData.birthdate = this.state.year_of_birth;
    updateUserData["custom:company"] = this.state.company;
    updateUserData["custom:industry_tags"] = this.state.industry_tags.join(",");
    updateUserData["custom:industry"] = this.state.industry;
    updateUserData["custom:position"] = this.state.title;
    updateUserData["custom:education_level"] = this.state.education;
    updateUserData["picture"] = this.state.picture;
    updateUserData["custom:resume"] = this.state.resume;

    // Data formatted for Cognito
    let formatted = {};

    formatted.locality = this.state.city;
    if (this.state.province.length > 0) {
      formatted.region = this.state.province;
    } else {
      formatted.region = this.state.states;
    }
    formatted.country = this.state.country;

    updateUserData["address"] = JSON.stringify(formatted);

    // Get the current authenticated user
    let user = await Auth.currentAuthenticatedUser();

    // Update the current user with data stored in the state
    Auth.updateUserAttributes(user, updateUserData)
      .then(() => {
        // Update was success, redirect user.
        this.props.history.push(`${Routes.Dashboard}`);
      })
      .catch((e) =>
        // Update failed alert user with error info.
        alert(`There was issue updating the User data, please create an escalation with the following message
    '${JSON.stringify(e)}'`)
      );
  };

  render() {
    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit User Profile
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoComplete="lastName"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <MuiPhoneNumber
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  value={this.state.phone}
                  defaultCountry={"ca"}
                  preferredCountries={["ca", "us"]}
                  disableAreaCodes={true}
                  onChange={this.handlePhoneChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    inputProps: { min: "1900-01-01", max: "3000-12-30" },
                  }}
                  id="date"
                  label="Date of birth"
                  type="date"
                  format="MM/dd/yyyy"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  value={this.state.year_of_birth}
                  onChange={this.handleYearChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-education"
                  required
                  fullWidth
                  select
                  label="Industry"
                  value={this.state.industry}
                  onChange={this.handleIndustryChange}
                  variant="outlined"
                >
                  {IndustryLabels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  fullWidth
                  options={IndustryTags.map((option) => option.name)}
                  defaultValue={[]}
                  freeSolo
                  value={this.state.industry_tags}
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
                      variant="outlined"
                      label="Select Tags (Up to 3)"
                      error={this.state.showError}
                      helperText={this.state.errorText}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title/Position"
                  name="title"
                  autoComplete="title"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  name="company"
                  autoComplete="company"
                  value={this.state.company}
                  onChange={this.handleCompanyChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-education"
                  required
                  fullWidth
                  select
                  label="Highest Level of Education"
                  value={this.state.education}
                  onChange={this.handleEducationChange}
                  variant="outlined"
                >
                  {Education.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-select-education"
                  required
                  fullWidth
                  select
                  label="Country"
                  value={this.state.country}
                  onChange={this.handleCountryChange}
                  variant="outlined"
                >
                  {Country.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid style={{ display: this.state.displayStates }} item xs={12}>
                <TextField
                  id="outlined-select-education"
                  required
                  fullWidth
                  select
                  label="State"
                  value={this.state.states}
                  onChange={this.handleStateChange}
                  variant="outlined"
                >
                  {States.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                style={{ display: this.state.displayProvince }}
                item
                xs={12}
              >
                <TextField
                  id="outlined-select-education"
                  required
                  fullWidth
                  select
                  label="Province/Territories"
                  value={this.state.province}
                  onChange={this.handleProvinceChange}
                  variant="outlined"
                >
                  {Province.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={this.state.city}
                  onChange={this.handleCityChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                {this.state.imageFiles.map((file, i) => {
                  return (
                    <img
                      key={i}
                      src={file}
                      alt={"profile-pic"}
                      className={classes.profilePic}
                    />
                  );
                })}
              </Grid>
              <Grid item xs={12} className={classes.textAlignment}>
                <div style={{ display: "inline-flex" }}>
                  <Typography
                    className={classes.uploadText}
                    component="h6"
                    variant="subtitle2"
                  >
                    <b>{this.state.profilePicPreviewText}</b>
                    <Tooltip
                      title={
                        "It will be displayed along with your profile for our community members to see"
                      }
                    >
                      <Typography
                        variant="caption"
                        style={{ color: "grey", cursor: "pointer" }}
                        display="block"
                        gutterBottom
                      >
                        Why am I being asked about this?
                      </Typography>
                    </Tooltip>
                  </Typography>
                  <Button
                    className={classes.uploadImage}
                    onClick={this.handleOpen.bind(this)}
                  >
                    <b>{this.state.profilePicButtonText}</b>
                  </Button>
                </div>
                <DropzoneDialog
                  open={this.state.open}
                  onSave={this.handlePicSave.bind(this)}
                  acceptedFiles={["image/*"]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={this.handleClose.bind(this)}
                  filesLimit={1}
                  fileObjects={this.state.files}
                />
              </Grid>

              <Grid item xs={12} className={classes.textAlignment}>
                <div style={{ display: "inline-flex" }}>
                  <Typography
                    className={classes.uploadText}
                    component="h6"
                    variant="subtitle2"
                  >
                    <b>{this.state.resumeUploadText}</b>
                    <Tooltip
                      title={
                        "It will be used when you apply for jobs and for hosting on our resume bank"
                      }
                    >
                      <Typography
                        variant="caption"
                        style={{ color: "grey", cursor: "pointer" }}
                        display="block"
                        gutterBottom
                      >
                        Why am I being asked about this?
                      </Typography>
                    </Tooltip>
                  </Typography>
                  <Button
                    className={classes.uploadImage}
                    onClick={(event) => this.setState({ fileDialogOpen: true })}
                  >
                    <b>{this.state.resumeButtonText}</b>
                  </Button>
                </div>
                <DropzoneDialog
                  open={this.state.fileDialogOpen}
                  onSave={this.handleResumeSave.bind(this)}
                  acceptedFiles={[
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessing",
                  ]}
                  maxFileSize={5000000}
                  onClose={(event) => {
                    this.setState({ fileDialogOpen: false });
                  }}
                  filesLimit={1}
                  fileObjects={this.state.resumeFiles}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.submitChanges}
            >
              <b>SUBMIT</b>
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}

EditProfile = withMyHook(EditProfile);
EditProfile = withRouter(EditProfile);
export default withSnackbar(EditProfile);
