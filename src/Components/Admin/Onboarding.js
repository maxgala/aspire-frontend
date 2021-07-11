import React, { Component } from "react";
import { Auth } from "aws-amplify";
import MuiPhoneNumber from "material-ui-phone-number";
import { DropzoneDialog } from "material-ui-dropzone";
import S3FileUpload from "react-s3";
import { httpPost } from "../../lib/dataAccess";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InfoIcon from "@material-ui/icons/Info";

import EmailField from "../Registration/EmailField";
import Industries from "../Registration/industry";
import IndustryTags from "../Registration/industry_tags";
import Country from "../Registration/Country";
import States from "../Registration/States";
import Education from "../Registration/Education";
import Province from "../Registration/Provinces";

import { Routes } from "../../entry/routes/Routes";

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
  choiceText: {
    margin: theme.spacing(2, 0, 1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "5%",
    height: 50,

    width: "70%",
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //contact and basic info
      firstName: this.props.prev ? this.props.prev.firstName : "",
      lastName: this.props.prev ? this.props.prev.lastName : "",
      phone: this.props.prev ? this.props.prev.phone : "",
      email: this.props.prev ? this.props.prev.email : "",
      emailStrength: this.props.prev ? this.props.prev.emailStrength : "",
      password: this.props.prev ? this.props.prev.password : "",
      passwordStrength: this.props.prev ? this.props.prev.passwordStrength : "",
      year_of_birth: this.props.prev ? this.props.prev.year_of_birth : "",

      //professional info
      industry: this.props.prev ? this.props.prev.industry : "",
      industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
      title: this.props.prev ? this.props.prev.title : "",
      company: this.props.prev ? this.props.prev.company : "",
      education: this.props.prev ? this.props.prev.education : "",
      customIndustryDisplay: "None",

      //location info
      province: this.props.prev ? this.props.prev.province : "",
      city: this.props.prev ? this.props.prev.city : "",
      country: this.props.prev ? this.props.prev.country : "",
      states: this.props.prev ? this.props.prev.states : "",
      displayProvince: "None",
      displayStates: "None",

      //resources
      resumeURL: this.props.prev ? this.props.prev.resumeURL : "",
      profilePicURL: this.props.prev ? this.props.prev.profilePicURL : "",
      fileDialogOpen: false,
      imageFiles: [],
      resumeFiles: [],
      profilePicPreviewText: "Upload your Profile Photo *",
      profilePicButtonText: "Upload",
      resumeUploadText: "Upload your Resume *",
      resumeButtonText: "Upload",
      filePreview: [],
      loader: false,

      //attributes of account
      senior_executive: false,
      aspire_email_consent: this.props.prev
        ? this.props.prev.aspire_email_consent
        : false,
      aspire_free: true,
      aspire_premium: false,
      aspire_platinum: false,

      progress: 100,
      checked: false,
      open: false,
      mentor: false,

      //third party attributes
      verified: false,
      confirmationCode: "",
      openStripe: false,
      tocNumPages: null,
      privacyNumPages: null,
      url: process.env.REACT_APP_MAILCHIMP_URL,
      isDialogOpen: false,

      //error attributes
      showEmailError: false,
      errorDisplay: "",
      dialogueOpen: false,
      showError: false,
      errorText: "",
    };
    //function binding
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  //password and emails
  fieldStateChanged = (field) => (state) => {
    if (field !== "passwordStrength") {
      this.setState({ [field]: state.errors.length === 0 });
    } else if (field === "passwordStrength") {
      this.setState({
        passwordStrength: state.errors.length === 0,
        password: state.value,
      });
    }
    if (field !== "emailStrength") {
      this.setState({ [field]: state.errors.length === 0 });
    } else if (field === "emailStrength") {
      this.setState({
        emailStrength: state.errors.length === 0,
        email: state.value,
      });
    }
  };
  emailChanged = this.fieldStateChanged("emailStrength");

  //handles change in fields
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

  handlePhoneChange(value) {
    this.setState({
      phone: value,
    });
  }

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

  //error handling
  handleDialog = (event) => {
    this.setState({
      dialogueOpen: !this.state.dialogueOpen,
    });
  };

  handleConfirmCheck = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({
        errorDisplay: "None",
      });
    } else {
      this.setState({
        errorDisplay: "",
      });
    }
  };

  handleDialog = (event) => {
    this.setState({
      dialogueOpen: !this.state.dialogueOpen,
    });
  };

  componentDidMount() {
    if (this.state.country === "CA") {
      this.setState({
        displayProvince: "",
        states: "",
      });
    } else if (this.state.country === "USA") {
      this.setState({
        displayStates: "",
        province: "",
      });
    }
  }

  handleOpen() {
    if (this.state.email === undefined || this.state.email === "") {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }

    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  uploadToS3(file, folder, resume = true, info = false) {
    if (this.state.email === undefined || this.state.email === "") {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }

    let config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: this.state.email + folder /* will change based on users */,
      region: "us-east-1",
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };

    let page = this;
    S3FileUpload.uploadFile(file, config)
      .then((data) => {
        if (!resume && info === false) {
          page.setState({
            profilePicURL: data.location,
            open: false,
          });
        } else if (info === false) {
          page.setState({
            resumeURL: data.location,
            fileDialogOpen: false,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  handleResumeSave(resume) {
    this.uploadToS3(resume[0], "/resumes", true);
    this.setState({
      resumeUploadText: resume[0]["name"],
      resumeButtonText: "Upload Again",
      resumeFiles: resume,
    });
  }

  handleSave(files) {
    let document = "";
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    let page = this;
    reader.onload = function () {
      // Saving files to state for further use and closing Modal.
      document = reader.result;
      page.uploadToS3(files[0], "/pictures", false);
      page.setState({
        profilePicPreviewText: files[0].name,
        profilePicButtonText: "Upload Again",
        imageFiles: [document],
      });
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  async handleSubmit(event) {
    const {
      firstName,
      lastName,
      phone,
      email,
      year_of_birth,
      industry_tags,
      industry,
      title,
      company,
      education,
      country,
      city,
      province,
      states,
    } = this.state;

    if (industry_tags.length > 3) {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }

    if (
      firstName === "" ||
      firstName === undefined ||
      lastName === "" ||
      lastName === undefined ||
      phone === "" ||
      phone === undefined ||
      email === "" ||
      email === undefined ||
      year_of_birth === "" ||
      year_of_birth === undefined ||
      industry === "" ||
      industry === undefined ||
      title === "" ||
      title === undefined ||
      company === "" ||
      company === undefined ||
      education === "" ||
      education === undefined ||
      country === "" ||
      country === undefined ||
      city === "" ||
      city === undefined ||
      (country === "CA" && province === "") ||
      (country === "CA" && province === undefined) ||
      (country === "USA" && states === "") ||
      (country === "USA" && states === undefined)
    ) {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }

    let phone_val = this.state.phone
      .replace(/\s/g, "")
      .replace("(", "")
      .replace(")", "")
      .replace("-", "");
    phone_val = phone_val.replace("(", "");
    phone_val = phone_val.replace(")", "");

    let body = {
      address: {
        locality: this.state.city,
        region: this.state.province ? this.state.province : this.state.states,
        country: this.state.country,
      },
      birthdate: this.state.year_of_birth,
      email: this.state.email,
      family_name: this.state.lastName,
      given_name: this.state.firstName,
      phone_number: phone_val,
      picture: this.state.profilePicURL,
      industry: this.state.industry,
      industry_tags: this.state.industry_tags,
      position: this.state.title,
      company: this.state.company,
      education_level: this.state.education,

      //defaulted standard values
      gender: "N/A",
      middle_name: "",
      name: this.state.firstName + " " + this.state.lastName,
      preferred_username: this.state.email,
      profile: "",

      //default custom values
      prefix: "",
      linkedin: "",
    };

    let info = {
      name: this.state.firstName + " " + this.state.lastName,
      current_employer: this.state.company,
      designation: "",
      education: this.state.education,
      education_2: "",
      current_company: this.state.company,
      company_2: "",
      company_3: "",
      linkedin: "",
      email: this.state.email,
      bio: "",
    };

    let infoFile = new File(
      [new Blob([JSON.stringify(info)], { type: "application/json" })],
      "info.json",
      {
        type: "application/json",
      }
    );

    let reader = new FileReader();
    let page = this;
    reader.readAsBinaryString(infoFile);
    reader.onload = function () {
      console.log("Result: ", reader.result);
      console.log(infoFile.name);
      page.uploadToS3(infoFile, "", true, true);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };

    let accessToken = (await Auth.currentSession()).getIdToken().getJwtToken();

    console.log(this.state.phone);
    await httpPost("admin/mentor", accessToken, body)
      .then((response) => {
        console.log("Success");
        console.log(response);
        console.log(body);
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
        console.log(body);
      });

    //window.location.reload();
  }

  render() {
    const classes = this.props.classes;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Onboarding
          </Typography>

          {/*Actual Form */}
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
                <EmailField
                  label="Email"
                  name="email"
                  fieldId="email"
                  variant="outlined"
                  id="email"
                  fullWidth
                  placeholder="Enter Email Address*"
                  onStateChanged={this.emailChanged}
                  required
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
                {/*}
                <Tooltip title="Custom tags can be added by typing and hitting Enter">
                  <InfoIcon />
                </Tooltip>
                  */}
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
                  label="States"
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
              <Grid item xs={12}>
                <div style={{ display: "inline-flex" }}>
                  <Typography
                    className={classes.uploadText}
                    component="h6"
                    variant="subtitle2"
                  >
                    <b>{this.state.profilePicPreviewText}</b>
                    <Tooltip title="For best results, we recommend using a BMP, JPG or PNG file">
                      <InfoIcon />
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
                  onSave={this.handleSave.bind(this)}
                  acceptedFiles={["image/*"]}
                  showPreviews={true}
                  maxFileSize={5000000}
                  onClose={this.handleClose.bind(this)}
                  filesLimit={1}
                  fileObjects={this.state.files}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={this.state.checked}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit.bind(this)}
                >
                  <b>Submit</b>
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>

        {/*code for error response*/}
        <Dialog
          open={this.state.dialogueOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Required fields are not filled in properly"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <b>Please fill out all the required fields properly</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialog} color="primary">
              <b>Close</b>
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

Onboarding = withMyHook(Onboarding);

export default Onboarding;
