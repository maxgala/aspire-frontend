import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import blankProfile from "../Images/faceShot/blank_profile.png";
import { Button } from "@material-ui/core";
import { faMapMarker, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EscalationsCard from "./Cards/EscalationsCard";
import { httpGet } from "../../lib/dataAccess";
import jwtDecode from "jwt-decode";
import Dialog from "@material-ui/core/Dialog";
// import IndustryTags from "../Registration/industry_tags";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import Chip from "@material-ui/core/Chip";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";
import Stripe from "../Payment/StripeCredits";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import FAQPopup from "./Popups/FAQPopup";
import PostJobPopup from "./Popups/PostJobPopup";

const useStyles = makeStyles((theme) => ({
  root: {
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

  numCoffeeChat: {
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
    width: "170px",
    height: "170px",
    padding: "1vh",
    left: "10%",
    borderRadius: "50%",
    marginTop: "2vh",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    objectFit: "cover",
  },

  creditsButton: {
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

  postButton: {
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

  faq: {
    margin: "1vh 40px 1vh 40px",
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "12px",
    textAlign: "center",
    display: "block",
    color: "#6EA0B5",
    cursor: "pointer",
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
      max_characters: 3000,
      numJobs: 0,
      numChats: 0,
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

  postJob = (event) => {
    this.setState({
      openPostJob: true,
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
      <div className={classes.root}>
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
            <p className={classes.numCoffeeChat}>
              {userProfile.numCoffeeChats} Coffee Chats
            </p>
            <p className={classes.numCoffeeChat}>
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
                className={classes.creditsButton}
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
              className={classes.postButton}
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
          <PostJobPopup
            openPostJob={this.state.openPostJob}
            handlePostJobClose={this.handlePostJobClose}
          />
          <FAQPopup
            openFaq={this.state.openFaq}
            handleFaqClose={this.handleFaqClose}
          />
        </div>
      </div>
    );
  }
}

Landing = withMyHook(Landing);
export default withSnackbar(Landing);
