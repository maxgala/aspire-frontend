import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  overallposition: {
    position: "relative",
  },
  extratext: {
    color: "white",
    fontSize: "18px",
    fontWeight: "100",
    textAlign: "center",
    position: "absolute",
    marginTop: "85%",
    width: "100%",
  },
  hovertext: {
    color: "white",
    fontSize: "24px",
    marginTop: "50%",
    textAlign: "center",
    position: "absolute",
    width: "100%",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class SeniorExec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      display1: "",
      display2: "None",
      text: "None",
    };
  }

  handleImage = (event) => {
    this.setState({
      display_1: "",
      display_2: "None",
      text: "",
    });
  };

  handleEnter = (event) => {
    this.setState({
      display2: "",
      display1: "None",
      text: "",
    });
  };

  handleExit = (event) => {
    this.setState({
      display2: "None",
      display1: "",
      text: "None",
    });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div
        className={classes.overallposition}
        style={{ backgroundColor: this.state.color }}
      >
        <h3
          className={classes.hovertext}
          style={{
            display: this.state.text,
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleExit}
        >
          {this.props.name_text}
        </h3>
        <h3
          className={classes.extratext}
          style={{
            display: this.state.text,
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleExit}
        >
          {this.props.extra_text}
        </h3>
        <img
          style={{
            marginTop: "0vh",
            display: this.state.display1,
            borderTopLeftRadius: "5vw",
            borderBottomRightRadius: "12vw",
            width: '290px',
            height: '420px',
            objectFit: 'cover'
          }}
          onMouseEnter={this.handleEnter}
          src={this.props.image}
          alt="Senior Exec"
        />
        <img
          style={{
            marginTop: "0vh",
            display: this.state.display2,
            borderTopLeftRadius: "5vw",
            borderBottomRightRadius: "12vw",
            width: '290px',
            height: '420px',
            objectFit: 'cover'
          }}
          onMouseLeave={this.handleExit}
          src={this.props.hover_image}
          alt="Senior Exec"
        />
      </div>
    );
  }
}

SeniorExec = withMyHook(SeniorExec);
export default SeniorExec;
