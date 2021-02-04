import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import CardTypes from "../CardTypes";
import PostJobPopup from "../Popups/PostJobPopup";

const useStyles = makeStyles(() => ({
  cardCoffee: {
    width: "100%",
    maxWidth: "350px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    backgroundColor: "#B5A165",
    color: "white",
    overflow: "hidden",
  },
  cardApp: {
    width: "100%",
    maxWidth: "350px",
    height: "180px",
    borderStyle: "solid",
    borderRadius: "20px",
    backgroundColor: "#6EA0B5",
    color: "white",
    borderColor: "#6EA0B5",
    overflow: "hidden",
  },
  cardPosting: {
    width: "100%",
    maxWidth: "350px",
    height: "180px",
    marginBottom: "20px",
    borderRadius: "20px",
    backgroundColor: "#58595B",
    overflow: "hidden",
  },
  title: {
    fontFamily: "PT Sans",
    fontWeight: "bolder",
    width: "100%",
    paddingTop: "5px",
    fontSize: "20px",
    "@media (max-width: 480px)": {
      fontSize: "15px",
    },
    color: "white",
    margin: "0px",
    marginTop: "5px",
  },
  subtitle: {
    fontFamily: "PT Sans",
    fontWeight: "bold",
    width: "100%",
    color: "white",
    margin: "0px",
    "@media (max-width: 480px)": {
      fontSize: "10px",
    },
    fontSize: "15px",
    marginTop: "5px",
    marginBottom: "20px",
  },
  button_container: {
    alignItems: "flex-end",
    justify: "flex-end",
  },
  button: {
    fontSize: "8px",
    "@media (max-width: 320px)": {
      fontSize: "6px",
    },
    fontWeight: "400",
    borderRadius: 50,
    backgroundColor: "white",
    color: "#58595B",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  container: {
    width: "95%",
    display: "inline-block",
    alignItems: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    overflow: "hidden",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class EmptyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPostJob: false,
    };
  }

  postJob = (event) => {
    this.setState({
      openPostJob: true,
    });
  };

  handlePostJobClose = (event) => {
    this.setState({
      openPostJob: false,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <Grid
        container
        item
        xs={12}
        spacing={0}
        alignItems="center"
        justify="center"
        className={
          this.props.type === CardTypes.coffeeChat
            ? classes.cardCoffee
            : this.props.type === CardTypes.jobApplication
            ? classes.cardApp
            : classes.cardPosting
        }
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            {this.props.filtered
              ? ""
              : this.props.type === CardTypes.coffeeChat
              ? "No booked coffee chats"
              : this.props.type === CardTypes.jobApplication
              ? "No submitted job applications"
              : "No jobs posted"}
          </h1>
          <p className={classes.subtitle}>
            {!this.props.filtered
              ? this.props.type === CardTypes.coffeeChat
                ? "To book one, click the Coffee Chats tab above."
                : this.props.type === CardTypes.jobApplication
                ? "To view job applications, click the Jobs tab above."
                : jwtDecode(localStorage.getItem("idToken"))[
                    "custom:user_type"
                  ] !== "FREE"
                ? "To post a job, click the button below or post a job from the left nav."
                : "Free users cannot post jobs. Upgrade to get access to this feature!"
              : this.props.type === CardTypes.coffeeChat
              ? "No coffee chats meet the applied filter"
              : this.props.type === CardTypes.community
              ? "No community members meet the applied filter"
              : "No jobs meet the applied filter"}
          </p>
          <span className={classes.button_container}>
            {this.props.type === CardTypes.jobPosting &&
            jwtDecode(localStorage.getItem("idToken"))["custom:user_type"] !==
              "FREE" ? (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={this.postJob}
              >
                Create job posting
              </Button>
            ) : null}
            <PostJobPopup
              openPostJob={this.state.openPostJob}
              handlePostJobClose={this.handlePostJobClose}
            />
          </span>
        </div>
      </Grid>
    );
  }
}

EmptyCard = withMyHook(EmptyCard);
export default EmptyCard;
