import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatTypes from "../ChatTypes";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";
import { httpPut } from "../../../lib/dataAccess";
import Moment from "react-moment";
import "moment-timezone";
import { withSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Auth } from "aws-amplify";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles(() => ({
  cardOne: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "5px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#B5A165",
    color: "white",
    boxShadow: "0px 6px 6px #00000029",
  },
  cardFour: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "5px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#455e6a",
    color: "white",
    boxShadow: "0px 6px 6px #00000029",
  },
  cardInterview: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "5px",
    // margin: 'auto',
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "left",
    // need designs for mock interview card  "#944848"
    backgroundColor: "#558B72",
    color: "white",
  },
  cardBooked: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "5px",
    // margin: 'auto',
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#9D9D9D",
    color: "white",
  },
  image: {
    width: "120px",
    height: "120px",
    "@media (max-width: 520px)": {
      width: "80px",
      height: "80px",
      marginRight: "5px",
      marginTop: "5px",
    },
    "@media (max-width: 380px)": {
      width: "50px",
      height: "50px",
      marginRight: "0px",
      marginTop: "5px",
    },
    borderRadius: "50%",
    margin: "auto",
    marginTop: "10px",
    marginLeft: "10px",
    marginRight: "20px",
    display: "inline-block",
    objectFit: "cover",
  },
  image2: {
    width: "20vw",
    height: "20vw",
    "@media (min-width: 1125px)": {
      width: "225px",
      height: "225px",
    },
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "20px",
    marginRight: "20px",
    display: "inline-block",
    objectFit: "cover",
  },
  title: {
    fontFamily: "PT Sans",
    fontWeight: "bolder",
    width: "100%",
    textAlign: "left",
    paddingTop: "5px",
    fontSize: "20px",
    "@media (max-width: 520px)": {
      fontSize: "16px",
    },
    color: "white",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  title2: {
    fontFamily: "PT Sans",
    fontSize: "3vw",
    "@media (min-width: 1125px)": {
      fontSize: "30px",
    },
    "@media (max-width: 640px)": {
      fontSize: "18px",
    },
    "@media (max-width: 320px)": {
      fontSize: "15px",
    },
    width: "100%",
    textAlign: "left",
    paddingTop: "5px",
    color: "#7D7D7D",
    margin: "0px",
    // marginLeft: "5px"
    marginTop: "15px",
  },
  subtitle: {
    fontFamily: "PT Sans",
    fontWeight: "bold",
    "@media (max-width: 520px)": {
      width: "80%",
      fontSize: "12px",
    },
    "@media (max-width: 320px)": {
      fontSize: "10px",
      marginTop: "3px",
    },
    width: "50%",
    textAlign: "left",
    display: "flex",
    color: "white",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },

  //to be applied to span elements to avoid overflow
  overflowText: {
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  subtitle2: {
    fontSize: "16px",
    "@media (max-width: 480px)": {
      fontSize: "14px",
      marginLeft: "0px",
    },
    fontFamily: "PT Sans",
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
  company: {
    fontFamily: "PT Sans",
    fontWeight: "bold",
    "@media (max-width: 520px)": {
      fontSize: "10px",
    },
    width: "100%",
    textAlign: "left",
    margin: "5px",
    color: "white",
  },
  date: {
    fontFamily: "PT Sans",
    fontWeight: "bold",
    "@media (max-width: 520px)": {
      fontSize: "10px",
      marginBottom: "5px",
    },
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
  credits: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    fontSize: "22px",
    "@media (max-width: 480px)": {
      fontSize: "16px",
    },
    textAlign: "left",
    color: "#B6A165",
    margin: "0px",
    float: "left",
  },
  booked: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    textAlign: "right",
    margin: "5px",
    "@media (max-width: 320px)": {
      display: "none",
    },
    paddingTop: "5px",
    fontSize: "8px",
    color: "white",
    float: "right",
  },
  booked2: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    textAlign: "right",
    margin: "5px",
    paddingTop: "5px",
    fontSize: "8px",
    color: "black",
    float: "right",
  },
  button_container: {
    alignItems: "flex-end",
    justify: "flex-end",
  },
  button: {
    fontSize: "8px",
    fontWeight: "400",
    marginLeft: "8px",
    "@media (max-width: 480px)": {
      marginLeft: "0px",
    },
    borderRadius: 50,
    backgroundColor: "white",
    color: "#58595B",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  tag_container: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: "0.5px",
    borderRadius: 50,
    borderColor: "white",
    margin: "5px",
    marginLeft: "0px",
  },
  tag: {
    paddingLeft: "8px",
    paddingRight: "8px",
    paddingTop: "3px",
    paddingBottom: "3px",
    left: "15px",
    right: "15px",
    float: "left",
    fontSize: "8px",
    fontWeight: "100",
    color: "white",
    display: "flex",
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
    paddingTop: "20px",
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

  dialogLabel: {
    fontSize: "21px",
    "@media (max-width: 480px)": {
      fontSize: "16px",
      marginTop: "5px",
    },
    margin: "0px",
    marginTop: "10px",
    color: "white",
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

  reservedText: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    "@media (max-width: 480px)": {
      fontSize: "12px",
    },
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class CoffeeChatCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      chat_status: this.props.data.chat_status,
      barDisplay: false,
      userType: jwtDecode(localStorage.getItem("idToken"))["custom:user_type"],
    };
  }

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };

  openCoffeeChat = (event) => {
    this.setState({
      open: true,
    });
  };

  registerForChat = async () => {
    this.setState({
      barDisplay: true,
    });
    httpPut(
      "chats/" + this.props.data.chat_id + "/reserve",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    )
      .then(() => {
        this.props.enqueueSnackbar("Successfully registered for coffee chat", {
          variant: "success",
        });
        this.setState({
          open: false,
          chat_status: "RESERVED",
        });
      })
      .catch((err) => {
        this.props.enqueueSnackbar("Failed:" + err.message, {
          variant: "error",
        });
        this.setState({
          barDisplay: false,
        });
      });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div
        className={
          this.props.data.chat_status === "ChatStatus.RESERVED"
            ? classes.cardBooked
            : this.props.data.chat_type === ChatTypes.oneOnOne
            ? classes.cardOne
            : this.props.data.chat_type === ChatTypes.fourOnOne
            ? classes.cardFour
            : classes.cardInterview
        }
      >
        <div className={classes.container}>
          <Grid
            container
            item
            xs={12}
            spacing={0}
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
            className={classes.outer_grid}
          >
            <Grid
              container
              item
              xs={4}
              spacing={0}
              alignItems="center"
              justify="center"
            >
              <img
                className={classes.image}
                src={this.props.data.picture}
                alt={"Coffee Chat Card"}
              />
            </Grid>

            <Grid
              container
              item
              xs={8}
              spacing={0}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={12}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
              >
                <h1 className={classes.title}>
                  <p style={{ width: "80%" }} className={classes.subtitle}>
                    <span className={classes.name}>
                      {this.props.data.given_name} {this.props.data.family_name}
                    </span>{" "}
                    {this.props.data.title}
                  </p>
                </h1>
                <p className={classes.subtitle}>
                  <span>
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className={classes.company_icon}
                    />
                  </span>{" "}
                  <span className={classes.overflowText}>
                    {this.props.data["custom:company"]}
                  </span>
                  {this.props.data.title}
                </p>
                <span className={classes.subtitle}>
                  {this.props.data.chat_type === ChatTypes.oneOnOne
                    ? "One on One"
                    : this.props.data.chat_type === ChatTypes.fourOnOne
                    ? "Four on One"
                    : "Mock Interview"}
                </span>

                {this.props.data &&
                  this.props.data.chat_tags &&
                  this.props.data.chat_tags.map((tag, key) => (
                    <span key={key} className={classes.tag_container}>
                      <span className={classes.tag}>{tag}</span>
                    </span>
                  ))}
              </Grid>

              <Grid
                container
                item
                xs={12}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={7}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <hr className={classes.bar}></hr>
                  {this.props.data.fixed_date ? (
                    <span className={classes.date}>
                      Date:{" "}
                      <Moment unix local format="ddd, MMM Do YYYY, hh:mm A">
                        {this.props.data.fixed_date}
                      </Moment>
                    </span>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  sm={5}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <span className={classes.button_container}>
                    {this.state.chat_status === "ACTIVE" ||
                    this.state.chat_status === "RESERVED_PARTIAL" ? (
                      <Button
                        onClick={this.openCoffeeChat}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                      >
                        View Booking
                      </Button>
                    ) : (
                      <h3 className={classes.reservedText}>
                        {this.state.chat_status === "RESERVED" ||
                        this.state.chat_status === "RESERVED_CONFIRMED"
                          ? "RESERVED"
                          : this.state.chat_status}
                      </h3>
                    )}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

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
              <h2 className={classes.dialogLabel}>
                Register for a Coffee Chat
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
                xs={12}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={4}
                  spacing={0}
                  alignItems="flex-start"
                  justify="center"
                >
                  <img
                    className={classes.image2}
                    src={this.props.data.picture}
                    alt={"Coffee Chat Card"}
                  />
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  spacing={0}
                  alignItems="center"
                  justify="flex-start"
                  className={classes.outer_grid}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <h1 className={classes.title2}>
                      {this.props.data.chat_type === ChatTypes.oneOnOne
                        ? "One on One"
                        : this.props.data.chat_type === ChatTypes.fourOnOne
                        ? "Four on One"
                        : "Mock Interview"}
                      {this.props.data.booked ? (
                        <span className={classes.booked}>booked</span>
                      ) : (
                        ""
                      )}{" "}
                      with&nbsp;
                      <span className={classes.name2}>
                        {this.props.data.given_name}{" "}
                        {this.props.data.family_name}
                      </span>
                    </h1>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.subtitle2}>
                      Company: {this.props.data["custom:company"]}
                    </span>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.subtitle2}>
                      Price:{" "}
                      {this.props.data.chat_type === ChatTypes.fourOnOne
                        ? "3 Credits"
                        : "5 Credits"}
                    </span>
                  </Grid>

                  <Grid
                    container
                    item
                    xs={6}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    {this.props.data.fixed_date ? (
                      <span className={classes.subtitle2}>
                        Date:{" "}
                        <Moment unix local format="ddd, MMM Do YYYY, hh:mm A">
                          {this.props.data.fixed_date}
                        </Moment>
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>

                  <Grid
                    container
                    item
                    xs={6}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    {this.props.data.chat_type === ChatTypes.fourOnOne &&
                    this.props.data.aspiring_professionals !== null ? (
                      <span className={classes.subtitle2}>
                        Available spots:{" "}
                        {4 - this.props.data.aspiring_professionals.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </Grid>

                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.date2}>
                      {this.props.data.description}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={0}
                alignItems="center"
                justify="center"
              >
                <DialogActions>
                  {this.state.userType === "MENTOR" ? null : this.state
                      .barDisplay === false ? (
                    <Button
                      className={classes.button2}
                      variant="contained"
                      onClick={this.registerForChat}
                    >
                      Register
                    </Button>
                  ) : (
                    <CircularProgress className={classes.circleProgress} />
                  )}
                </DialogActions>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CoffeeChatCard = withMyHook(CoffeeChatCard);
export default withSnackbar(CoffeeChatCard);
