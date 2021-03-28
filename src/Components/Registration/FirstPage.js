import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearWithValueLabel from "./linearprogress";
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MuiPhoneNumber from "material-ui-phone-number";
import { Routes } from "../../entry/routes/Routes";
import { withRouter } from "react-router-dom";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import Tooltip from "@material-ui/core/Tooltip";
import S3FileUpload from "react-s3";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "15vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginTop: "3vh",
    width: "100px",
    height: "100px",
    padding: "1vw",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "5%",
    height: 50,
    width: "50%",
    borderRadius: 50,
    backgroundColor: "#b5a165",
    color: "white",
    borderColor: "#484848",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  error: {
    color: "red",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.prev ? this.props.prev.firstName : "",
      lastName: this.props.prev ? this.props.prev.lastName : "",
      phone: this.props.prev ? this.props.prev.phone : "",
      email: this.props.prev ? this.props.prev.email : "",
      emailStrength: this.props.prev ? this.props.prev.emailStrength : "",
      password: this.props.prev ? this.props.prev.password : "",
      passwordStrength: this.props.prev ? this.props.prev.passwordStrength : "",
      year_of_birth: this.props.prev ? this.props.prev.year_of_birth : "",
      bio: this.props.prev ? this.props.prev.bio : "",
      industry: this.props.prev ? this.props.prev.industry : "",
      industry_tags:
        this.props.prev.industry_tags !== undefined
          ? this.props.prev.industry_tags
          : [],
      title: this.props.prev ? this.props.prev.title : "",
      company: this.props.prev ? this.props.prev.company : "",
      education: this.props.prev ? this.props.prev.education : "",
      province: this.props.prev ? this.props.prev.province : "",
      city: this.props.prev ? this.props.prev.city : "",
      country: this.props.prev ? this.props.prev.country : "",
      states: this.props.prev ? this.props.prev.states : "",
      senior_executive: this.props.prev
        ? this.props.prev.senior_executive
        : false,
      showEmailError: false,
      progress: 25,
      errorDisplay: "",
      dialogueOpen: false,
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

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
  passwordChanged = this.fieldStateChanged("passwordStrength");

  changeToPage2 = (event) => {
    const {
      emailStrength,
      passwordStrength,
      email,
      firstName,
      password,
      lastName,
      phone,
      year_of_birth,
      errorDisplay,
    } = this.state;

    const formValidated = emailStrength && passwordStrength;

    if (
      firstName === "" ||
      firstName === undefined ||
      password === "" ||
      password === undefined ||
      lastName === "" ||
      lastName === undefined ||
      email === "" ||
      email === undefined ||
      phone === "" ||
      phone === undefined ||
      year_of_birth === "" ||
      year_of_birth === undefined ||
      errorDisplay !== "None" ||
      errorDisplay === undefined ||
      !formValidated
    ) {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }
    this.props.setPrev(this.state);
    this.props.history.push(`${Routes.Register}/2`);
    this.bioUpload();
  };

  uploadToS3(file) {
    let config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: this.state.email,
      region: "us-east-1",
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    };
    S3FileUpload.uploadFile(file, config);
  }

  bioUpload() {
    var obj = {};
    obj.name = this.state.firstName + " " + this.state.lastName;
    obj.bio = this.state.bio;
    let jsonString = JSON.stringify(obj);

    // write JSON string to a file
    var file = new File([jsonString], "info.json", {
      type: "application/json",
    });

    this.uploadToS3(file, null);
  }

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

  handleBioChange = (event) => {
    this.setState({
      bio: event.target.value,
    });
  };

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

  handleYearChange = (event) => {
    this.setState({
      year_of_birth: event.target.value,
    });
  };

  changeToSignIn = (event) => {
    this.props.history.push(Routes.Login);
  };

  handlePhoneChange(value) {
    this.setState({
      phone: value,
    });
  }

  render() {
    const classes = this.props.classes;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registration
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
                  variant="outlined"
                  required
                  fullWidth
                  multiline={true}
                  rows={5}
                  id="bio"
                  label="Bio"
                  name="bio"
                  autoComplete="bio"
                  value={this.state.bio}
                  onChange={this.handleBioChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <EmailField
                  fieldId="email"
                  label="Email"
                  placeholder="Enter Email Address*"
                  onStateChanged={this.emailChanged}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <PasswordField
                  fieldId="password"
                  label="Password"
                  placeholder="Enter Password*"
                  onStateChanged={this.passwordChanged}
                  thresholdLength={7}
                  minStrength={3}
                  required
                />
                <Tooltip
                  title={`Password strength-bar must be 4/5 filled. Passwords need to be at least 7 characters long and
                    contain a combination of at least 1 lowercase, uppercase, number, & special
                    character`}
                >
                  <Typography
                    variant="caption"
                    style={{ color: "grey", cursor: "pointer" }}
                    display="block"
                    gutterBottom
                  >
                    Hover here to view our Password Criteria
                  </Typography>
                </Tooltip>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  placeholder="Enter Password"
                  type="password"
                  id="password-confirm"
                  autoComplete="current-password"
                  onChange={this.handleConfirmCheck}
                />
                <FormHelperText
                  style={{
                    display: this.state.errorDisplay,
                    color: "#c00",
                    marginLeft: "30%",
                  }}
                  id="component-error-text"
                >
                  {" "}
                  <b>Passwords do not match </b>
                </FormHelperText>
              </Grid>
            </Grid>
            <LinearWithValueLabel progress={this.state.progress} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.changeToPage2}
            >
              <b>Next</b>
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link variant="body1" onClick={this.changeToSignIn}>
                  <b>Already have an account? Sign in</b>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
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

FirstPage = withMyHook(FirstPage);
FirstPage = withRouter(FirstPage);
export default FirstPage;
