import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_SES_REGION,
});

const useStyles = makeStyles((theme) => ({
  cardEscalation: {
    width: "95%",
    maxWidth: "500px",
    marginLeft: "5px",
    marginTop: "10px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    backgroundColor: "#455E6A",
    color: "white",
    boxShadow: "0px 6px 6px #00000029",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "10px",
    marginRight: "20px",
    display: "inline-block",
  },
  image2: {
    width: "225px",
    height: "225px",
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "20px",
    marginRight: "20px",
    display: "inline-block",
  },
  title: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bolder",
    width: "100%",
    textAlign: "center",
    paddingTop: "5px",
    fontSize: "20px",
    color: "white",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  title2: {
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "30px",
    width: "100%",
    textAlign: "left",
    paddingTop: "5px",
    color: "#7D7D7D",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "15px",
  },
  subtitle: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    color: "white",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
    marginBottom: "10px",
  },
  subtitle2: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    color: "black",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  name: {
    fontStyle: "italic",
    paddingRight: "5px",
    margin: "0px",
    marginTop: "5px",
  },
  date: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    fontSize: "15px",
    color: "white",
    margin: "0px",
    float: "left",
  },
  date2: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    fontSize: "15px",
    color: "black",
    margin: "0px",
    float: "left",
  },
  button_container: {
    alignItems: "flex-end",
    justify: "flex-end",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#A9A9A9",
    marginBottom: "1vh",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1.5vh",
    borderRadius: 50,
    color: "#white",
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
  bar: {
    width: "90%",
    textAlign: "right",
    marginLeft: "0%",
    marginTop: "1%",
    marginBottom: "1%",
    height: 1,
    paddingBottom: "0",
  },
  container: {
    display: "inline-block",
    // transform: "translate(0%, -65%)",
  },
  containerCard: {
    display: "inline-block",
    alignItems: "center",
  },
  company_icon: {
    width: "18px",
    height: "18px",
    marginRight: "15px",
  },
  outer_grid: {
    height: "180px",
  },
  toolbar: {
    height: "8vh",
    backgroundColor: "#455E6A",
    boxShadow: "0px 0px 0px",
    width: "100%",
  },
  closes: {
    position: "absolute",
    right: "5%",
  },
  button2: {
    textTransform: "none",
    backgroundColor: "#000000",
    marginBottom: "2%",
    marginRight: "auto",
    marginTop: "20px",
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
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  formControl: {
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

/**
 * This function will send an email using AWS's Simple Email Service
 * @param {object} data an object holding email information to be sent
 * @return {boolean} true or false depending on if sending the email was successful
 */
async function sendEmail(data) {
  // Create sendEmail params
  var params = {
    Destination: {
      CcAddresses: [data.ccAddress],
      ToAddresses: [data.toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: data.body,
        },
        Text: {
          Charset: "UTF-8",
          Data: data.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: data.subject,
      },
    },
    Source: data.source,
  };

  // Create the promise and SES service object
  var emailSendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  // Handle email send status success / failure for handling in createEscalation
  emailSendPromise
    .then(function (data) {})
    .catch(function (err) {
      console.error(err, err.stack);
      return false;
    });
  return true;
}

class EscalationsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: "",
      description: "",
      title: "",
      snackBarOpen: false,
      snackBarText: "",
    };
  }

  /**
   * This function will handle the create escalation event.
   * @return void
   */
  handleEscalation = (event) => {
    // Build the email information object from state.
    let emailData = {};
    if (this.state.title !== null) {
      emailData.subject = "[ESCALATIONS] " + this.state.title;
    } else {
      emailData.subject = "[ESCALATIONS] TITLE N/A";
    }

    if (this.state.type !== null) {
      emailData.body = "Type:" + this.state.type;
    }

    if (this.state.description != null) {
      emailData.body += "<br>Description<br>" + this.state.description;
    }

    // For now we're just going to hard code the address to mine, otherwise it is the support email.
    emailData.ccAddress = "aspire@maxgala.com";
    emailData.toAddress = "aspire@maxgala.com";
    emailData.source = "aspire@maxgala.com";

    // Get and store data from where the escalation is being created.
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    let emailFrom = `${userProfile.given_name} ${userProfile.family_name} ${userProfile.email}`;

    if (emailFrom !== null) {
      emailData.body += "<br><br>From:" + emailFrom;
    }

    // Keep track of current context of this for nested function to be able to access state
    const self = this;

    sendEmail(emailData).then(function (emailSendSuccess) {
      // If we sent the email successfully, hide the modal.
      if (emailSendSuccess) {
        self.handleClose();
        self.setSnackBarMessage("Escalation sent successfully.");
        self.openSnackBar();
      } else {
        self.handleClose();
        self.setSnackBarMessage("Failed to create Escalation.");
        self.openSnackBar();
      }
    });
  };
  openEscalation = (event) => {
    this.setState({
      open: true,
    });
  };

  openSnackBar = (event) => {
    this.setState({
      snackBarOpen: true,
    });
  };
  handleClose = (event) => {
    this.setState({
      open: false,
      // Reset fields
      description: "",
      title: "",
      type: "",
    });
  };

  handleSnackBarClose = (event) => {
    this.setState({
      snackBarOpen: false,
    });
  };

  setSnackBarMessage = (message) => {
    this.setState({
      snackBarText: message,
    });
  };
  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={this.openEscalation}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Contact Us
        </Button>

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
              <h2 style={{ margin: "0px", marginTop: "10px", color: "white" }}>
                Contact Us
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
                xs={3}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                style={{ marginBottom: "15px", marginTop: "10px" }}
              >
                <TextField
                  id="titleTextField"
                  variant="outlined"
                  label="Title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  inputProps={{
                    name: "title",
                    id: "titleTextField",
                  }}
                />
              </Grid>
              <Grid
                container
                item
                xs={3}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                style={{ marginBottom: "15px", marginTop: "10px" }}
              >
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="typeLabel">Type</InputLabel>
                  <Select
                    labelId="typeLabel"
                    label="Type"
                    value={this.state.type}
                    onChange={this.handleChange}
                    id="typeSelect"
                    inputProps={{
                      name: "type",
                      id: "typeLabel",
                    }}
                  >
                    <MenuItem aria-label="None" value="" />
                    <MenuItem value={"coffechat"}>Account</MenuItem>
                    <MenuItem value={"coffechat"}>Coffee Chat</MenuItem>
                    <MenuItem value={"resume"}>Resume </MenuItem>
                    <MenuItem value={"payment"}>Payment</MenuItem>
                    <MenuItem value={"query"}>Query</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid
                container
                item
                xs={12}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                style={{ marginBottom: "15px", marginTop: "10px" }}
              >
                <TextField
                  fullWidth={true}
                  multiline
                  id="descriptionTextField"
                  variant="outlined"
                  label="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  inputProps={{
                    maxLength: 500,
                    style: { height: 200 },
                    name: "description",
                    id: "titleTdescriptionTextFieldextField",
                  }}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={0}
                alignItems="flex-end"
                justify="flex-end"
              >
                <DialogActions style={{ marginRight: "5%" }}>
                  <Button
                    className={classes.button2}
                    variant="contained"
                    onClick={this.handleEscalation}
                  >
                    Create
                  </Button>
                </DialogActions>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={this.state.snackBarOpen}
          onClose={this.handleSnackBarClose}
          message={this.state.snackBarText}
          autoHideDuration={6000}
        />
      </div>
    );
  }
}

EscalationsCard = withMyHook(EscalationsCard);
export default EscalationsCard;
