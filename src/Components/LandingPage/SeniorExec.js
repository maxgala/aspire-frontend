import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  overallposition: {
    position: "relative",
  },
  extratext: {
    color: "white",
    fontSize: "18px",
    "@media (max-width: 480px)": { 
      fontSize: "15px"
    },
    fontWeight: "100",
    marginTop: "85%",
    textAlign: "center",
    position: "absolute",
    paddingLeft: "30px",
    paddingRight: "30px",
    width: "100%",
  },
  hovertext: {
    color: "white",
    fontSize: "24px",
    "@media (max-width: 480px)": { 
      fontSize: "20px"
    },
    marginTop: "60%",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    paddingLeft: "30px",
    paddingRight: "30px",
  },

  tintImage:{
    position: "relative",
  },

  hoverImage:{
    marginTop: "0vh",
    borderRadius: "60px",
    "@media (max-width: 480px)": { 
      width: '250px',
      height: '350px'
    },
    width: '290px',
    height: '420px',
    objectFit: 'cover',
    opacity: '1',
  },

  hoverTint:{
    backgroundColor: '#b5a165',
    marginTop: "0vh",
    borderRadius: "60px",
    "@media (max-width: 480px)": { 
      width: '250px',
      height: '350px'
    },
    width: '290px',
    height: '420px',
    opacity: '0.8',
    position: 'absolute',
  },

  image:{
    marginTop: "0vh",
    borderRadius: "60px",
    "@media (max-width: 480px)": { 
      width: '250px',
      height: '350px'
    },
    width: '290px',
    height: '420px',
    objectFit: 'cover'
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
        
        <div
          style={{
            display: this.state.display2,
            }}
          className={classes.hoverTint}
          onMouseLeave={this.handleExit}
          >
          </div>


        <h3
          className={classes.hovertext}
          style={{
            display: this.state.text,
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
          }}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleExit}
        >
          {this.props.extra_text}
        </h3>
        
        <img
          style={{
            display: this.state.display1,
          }}
          className={classes.image}
          onMouseEnter={this.handleEnter}
          src={this.props.image}
          alt="Senior Exec"
        />
        
          

          <img
          style={{
            display: this.state.display2,
            }}
          className={classes.hoverImage}
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
