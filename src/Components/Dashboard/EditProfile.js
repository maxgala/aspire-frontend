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
import jwtDecode from "jwt-decode";

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
    };
  }

  componentDidMount() {
    const userData = jwtDecode(localStorage.getItem("idToken"));
    var country;
    const formattedLocation = JSON.parse(userData.address.formatted);
    if (formattedLocation.country === "Canada") {
      country = "CA";
    } else if (formattedLocation.country === "United States") {
      country = "USA";
    }

    this.setState({
      firstName: userData.given_name,
      lastName: userData.family_name,
      phone: userData.phone_number,
      year_of_birth: userData.birthdate,
      industry: "", // userData["custom:industry_tags"], TODO: need to format different
      industry_tags: [], // find where this is stored
      title: userData["custom:position"],
      company: userData["custom:company"],
      education: "", //find where this is stored
      province: "", // userData.address.formatted.region, TODO: need to format different (ie. Ontario to ON)
      city: "", //find where this is stored
      country: country,
      states: "", //find where this is stored
    });
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

  handlePhoneChange = (value) => {
    this.setState({
      phone: value,
    });
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
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.changeToPage2}
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
