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
import AddIcon from "@material-ui/icons/Add";
import { httpPost } from "../../../lib/dataAccess";
import Snackbar from "@material-ui/core/Snackbar";
import AWS from "aws-sdk";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import { IconButton } from "@material-ui/core";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SES_SECRET_ACCESS_KEY,
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

class CreateCoffeeChatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      type: "",
      description: "",
      title: "",
      tags: [],
      seniorExecEmail: "",
      dateTimeStamp: 0,
      dateFormatted: "",
      snackBarOpen: false,
      snackBarText: "",
      maxCharacters: 150,
    };
  }

  handleTagsChange = (event) => {
    this.setState({
      tags: event.target.value.split(""),
    });
  };
  openChatCreate = (event) => {
    this.setState({
      open: true,
    });
  };

  openSnackBar = (event) => {
    this.setState({
      snackBarOpen: true,
    });
  };

  handleCoffeeChatTypeChange = () => (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
      type: "",
      dateFormatted: "",
      description: "",
      title: "",
      tags: [],
      seniorExecEmail: "",
      fixedDate: 0,
      snackBarOpen: false,
      snackBarText: "",
    });
  };

  submitCoffeeChat = async () => {
    // Ensure that all required fields are filled.
    if (
      this.state.type === "" ||
      this.state.type === undefined ||
      this.state.seniorExecEmail === "" ||
      this.state.seniorExecEmail === undefined ||
      this.state.description === "" ||
      this.state.description === undefined ||
      this.state.dateFormatted === "" ||
      this.state.dateFormatted === undefined
    ) {
      alert(
        "One of the required fields is not set (title, type, senior exec email, date)."
      );
      return;
    }

    // Get data for Coffee Chat creation
    let coffeeChatPostData = {};
    coffeeChatPostData.chat_type = this.state.type;
    coffeeChatPostData.senior_executive = this.state.seniorExecEmail;

    // Convert formatted date to unix timestamp
    coffeeChatPostData.fixed_date = Date.parse(this.state.dateFormatted) / 1000;
    coffeeChatPostData.description = this.state.description;
    if (this.state.tags.length > 0) {
      coffeeChatPostData.tags = this.state.tags;
    }

    // Keep track of current context of this for nested function to be able to access state
    const self = this;

    await httpPost("chats", localStorage.getItem("idToken"), coffeeChatPostData)
      .then((res) => {
        // Display successful creation
        self.handleClose();
        self.setSnackBarMessage("Coffee Chat created successfully!");
        self.openSnackBar();
      })
      .catch((err) => {
        // Display failed creation
        self.handleClose();
        self.setSnackBarMessage("Coffee Chat failed to create.");
        self.openSnackBar();
      });
  };

  handleDateChange = (event) => {
    this.setState({
      dateFormatted: event.target.value,
    });
  };

  handleSeniorExecChange = (event) => {
    this.setState({
      seniorExecEmail: event.target.value,
    });
  };

  handleTagsChange = (event) => {
    let tags = event.target.value.split(",");
    this.setState({
      tags: tags,
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
        <IconButton
          onClick={this.openChatCreate}
          aria-label="Create Coffee Chat"
        >
          Create Coffee Chat
          <AddIcon />
        </IconButton>

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
                Create Coffee Chat
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
              <div className={classes.grid}>
                <Grid container item xs={12} spacing={3}>
                  {/* Grid for Senior Exec */}
                  <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ marginTop: "10px" }}
                    fullWidth={true}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <TextField
                        id="titleTextField"
                        variant="outlined"
                        label="Senior Exec Email"
                        value={this.state.seniorExecEmail}
                        onChange={this.handleSeniorExecChange}
                        inputProps={{
                          name: "title",
                          id: "titleTextField",
                        }}
                        fullWidth={true}
                      />
                    </Grid>
                  </Grid>
                  {/* Grid for Tags */}
                  <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ marginTop: "10px" }}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      spacing={1}
                      alignItems="flex-start"
                      justify="flex-start"
                    >
                      <TextField
                        id="titleTextField"
                        variant="outlined"
                        label="Tags ( separate by comma)"
                        value={this.state.tags.join()}
                        onChange={this.handleTagsChange}
                        inputProps={{
                          name: "title",
                          id: "titleTextField",
                        }}
                        fullWidth={true}
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
                      xs={4}
                      spacing={0}
                      alignItems="center"
                      justify="center"
                    >
                      <div className={classes.radioButton}>
                        <FormControlLabel
                          checked={this.state.type === "ONE_ON_ONE"}
                          value="ONE_ON_ONE"
                          control={<Radio color="primary" />}
                          label="One on One"
                          onChange={this.handleCoffeeChatTypeChange()}
                        />
                      </div>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      spacing={0}
                      alignItems="center"
                      justify="center"
                    >
                      <div className={classes.radioButton}>
                        <FormControlLabel
                          checked={this.state.type === "FOUR_ON_ONE"}
                          value="FOUR_ON_ONE"
                          control={<Radio color="primary" />}
                          label="One On Four"
                          onChange={this.handleCoffeeChatTypeChange()}
                        />
                      </div>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={4}
                      spacing={0}
                      alignItems="center"
                      justify="center"
                    >
                      <div className={classes.radioButton}>
                        <FormControlLabel
                          checked={this.state.type === "MOCK_INTERVIEW"}
                          value="MOCK_INTERVIEW"
                          control={<Radio color="primary" />}
                          label="Mock Interview"
                          onChange={this.handleCoffeeChatTypeChange()}
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
                      <TextField
                        id="date"
                        label="Date"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        required
                        fullWidth={true}
                        value={this.state.dateFormatted}
                        onChange={this.handleDateChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ marginBottom: "15px", marginTop: "10px" }}
                  >
                    <TextField
                      fullWidth={true}
                      rows={4}
                      id="descriptionTextField"
                      variant="outlined"
                      label="Description"
                      multiline={true}
                      value={this.state.description}
                      onChange={this.handleChange}
                      helperText={`${this.state.description.length}/${this.state.maxCharacters} Characters`}
                      inputProps={{
                        maxLength: this.state.maxCharacters,
                        style: { height: 100 },
                        name: "description",
                        id: "titleTdescriptionTextFieldextField",
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
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
                        onClick={this.submitCoffeeChat}
                      >
                        Create
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </div>
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

CreateCoffeeChatCard = withMyHook(CreateCoffeeChatCard);
export default CreateCoffeeChatCard;
