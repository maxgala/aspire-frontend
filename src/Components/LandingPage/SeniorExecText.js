import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { Routes } from "../../entry/routes/Routes";

const useStyles = makeStyles((theme) => ({
  senior_prof_title: {
    fontWeight: "500",
    fontSize: "35px",
    "@media (max-width: 480px)": {
      fontSize: "25px",
    },
    color: "black",
    padding: "0",
    textAlign: "left",
    margin: "5px",
    paddingTop: "5%",
  },
  subheading: {
    color: "black",
    paddingLeft: "1%",
    textAlign: "left",
    fontSize: "22px",
    "@media (max-width: 480px)": {
      fontSize: "16px",
    },
    fontWeight: "100",
    margin: "0",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#6EA0B5",
    width: "30%",
    display: "flex",
    marginRight: "auto",
    "@media (max-width: 480px)": {
      marginRight: "0px",
      width: "50%",
    },
    marginTop: "2%",
    borderRadius: 50,
    color: "white",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class SeniorExecText extends Component {
  changeToSignUp = (event) => {
    this.props.history.push(Routes.Register);
  };

  render() {
    const classes = this.props.classes;

    return (
      <div style={{ width: "70%" }}>
        <h1 className={classes.senior_prof_title}> Our Senior Executives</h1>
        <h3 className={classes.subheading}>
          We have over 200 Senior Executives commited to the MAX Aspire
          Platform. Book your exclusive coffee chat!
        </h3>
        <Button
          className={classes.button}
          variant="contained"
          onClick={this.changeToSignUp}
        >
          Join Now
        </Button>
      </div>
    );
  }
}

SeniorExecText = withMyHook(SeniorExecText);
SeniorExecText = withRouter(SeniorExecText);
export default SeniorExecText;
