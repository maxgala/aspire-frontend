import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LinearWithValueLabel from "./linearprogress";
import MenuItem from "@material-ui/core/MenuItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Industries from "./industry";
import IndustryTags from "./industry_tags";
import Country from "./Country";
import States from "./States";
import Education from "./Education";
import Province from "./Provinces";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withRouter } from "react-router-dom";
import { Routes } from "../../entry/routes/Routes";
import ThirdPage from "./ThirdPage";

const IndustryLabels = [];
for (let i = 0; i < Industries.length; ++i) {
  IndustryLabels.push(Industries[i]["name"]);
}

const IndustryTagsLabels = [];
for (let i = 0; i < IndustryTags.length; ++i) {
  IndustryTagsLabels.push(IndustryTags[i]["name"]);
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  autoComplete: {
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  paper: {
    marginTop: theme.spacing(10),
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
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  formControl: {
    width: "100%",
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
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
  label: {
    fontSize: "larger",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.prev ? this.props.prev.firstName : "",
      lastName: this.props.prev ? this.props.prev.lastName : "",
      phone: this.props.prev ? this.props.prev.phone : "",
      email: this.props.prev ? this.props.prev.email : "",
      password: this.props.prev ? this.props.prev.password : "",
      passwordStrength: this.props.prev ? this.props.prev.passwordStrength : "",
      year_of_birth: this.props.prev ? this.props.prev.year_of_birth : "",
      progress: 50,
      industry: this.props.prev ? this.props.prev.industry : "",
      industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
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
      dialogueOpen: false,
      displayProvince: "None",
      displayStates: "None",
      customIndustryDisplay: "None",
      showError: false,
      errorText: "",
    };
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

  changeToPage1 = (event) => {
    this.props.history.push(`${Routes.Register}`);
  };

  changeToPage3 = (event) => {
    console.log(this.state);
    if (this.state.industry_tags.length > 3) {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }
    if (
      this.state.industry === "" ||
      this.state.industry === undefined ||
      this.state.title === "" ||
      this.state.title === undefined ||
      this.state.company === "" ||
      this.state.company === undefined ||
      this.state.education === "" ||
      this.state.education === undefined ||
      this.state.country === "" ||
      this.state.country === undefined ||
      this.state.city === "" ||
      undefined
      //   ||
      //   (this.state.province === "" && this.state.states === "") Bug when clicking Other for country
    ) {
      this.setState({
        dialogueOpen: true,
      });
      return;
    }
    // this.setState(this.state);

    this.props.setPrev(this.state);
    this.props.history.push(`${Routes.Register}/3`);

    // this.props.appContext.setState({
    //   registrationScreen: (
    //     <ThirdPage appContext={this.props.appContext} prev={this.state} />
    //   ),
    // });
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

  render() {
    const classes = this.props.classes;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <img src={MaxBrand} alt="MAX_brand" className={classes.avatar} /> */}
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <div className={classes.form}>
            <Grid container spacing={2}>
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
            <LinearWithValueLabel progress={this.state.progress} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit_back}
              onClick={this.changeToPage1}
            >
              <b>Previous</b>
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.changeToPage3}
            >
              <b>Next</b>
            </Button>
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
              <b>
                {" "}
                Please fill out all the required fields with proper values{" "}
              </b>
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

SecondPage = withMyHook(SecondPage);
SecondPage = withRouter(SecondPage);
export default SecondPage;
