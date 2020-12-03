import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translate(0%, -20%)",
    position: "fixed",
    marginLeft: "100px",
    backgroundColor: "white",
    height: "400px",
    width: "700px",
  },
  largetext: {
    color: "black",
    textAlign: "left",
    marginLeft: "20px",
    fontWeight: "100",
  },
  descrip: {
    textAlign: "left",
    marginLeft: "20px",
    marginRight: "50px",
    fontWeight: "100",
    fontSize: "15px",
  },
  header: {
    textAlign: "left",
    marginLeft: "20px",
    fontWeight: "100",
    fontSize: "18px",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

// TODO: Job View popup isn't being used at the moment. Connect this to the view job button on job application card.
class JobView extends Component {
  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div className={classes.largebox}>
          <h1 className={classes.largetext}>Job Title</h1>
          <h2 className={classes.header}>Job Description:</h2>
          <h2 className={classes.descrip}>
            Job Description random stuff @ Company X we expect you to .... etc
            etc etc
          </h2>
          <h2 className={classes.header}>Deadline:</h2>
          <h2 className={classes.descrip}>Get your app in by May 6th</h2>
          <Button> Apply </Button>
        </div>
      </div>
    );
  }
}

JobView = withMyHook(JobView);
export default JobView;
