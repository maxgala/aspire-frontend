import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Mainback from "../Videos/Main-video.mp4";
import { makeStyles } from "@material-ui/core/styles";
import MaxLogo from "../Images/max_logo.png";
import "../Videos/Video.css";

const useStyles = makeStyles((theme) => ({
  sectionstyle: {
    width: "100vw",
    height: "100vh",
    marginRight: "0",
    marginLeft: "0",
  },
  h1style: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    "@media (max-width: 800px)": { fontSize: "55px" },
    fontSize: "72px",
    color: "white",
    textAlign: "center",
    margin: "0",
    paddingLeft: "35px",
    paddingRight: "35px",
  },
  subheading: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    "@media (max-width: 800px)": { fontSize: "18px" },
    fontSize: "24px",
    color: "white",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  networkstyle: {
    color: "#B5A165",
    marginTop: "10px",
  },

  button: {
    fontFamily: "Montserrat",
    fontWeight: "Bold",
    "@media (max-width: 800px)": { fontSize: "18px" },
    fontSize: "20px",
    textTransform: "none",
    paddingLeft: "20px",
    paddingRight: "20px",
    backgroundColor: "Transparent",
    border: '1px solid white',
    width: '160px',
    margin: '10px',
    marginTop: "2%",
    marginBottom: '10px',
    borderRadius: 50,
    color: "white",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },

  total: {
    position: "absolute",
    left: "50%",
    top: "0%",
    transform: "translate(-50%, 0%)",
    // backgroundColor: "rgba(0,0,0,0.8)",
    width: "110%",
    height: "85vh",
  },
  img: {
    paddingTop: "20vh",
    width: "350px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  mainBack: {
    width: "100%",
    height: "75vh",
    marginTop: "10vh",
    objectFit: "cover",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class MainImage extends Component {
  handleClick(e) {
    e.preventDefault();
    document.getElementById("about_max").scrollIntoView({
      behavior: "smooth",
    });
  }
  handleClick2(e) {
    e.preventDefault();
    document.getElementById("footer").scrollIntoView({
      behavior: "smooth",
    });
  }

  handleClick3(e) {
    e.preventDefault();
    document.getElementById("max_jobs").scrollIntoView({
      behavior: "smooth",
    });
  }

  handleClick4(e) {
    e.preventDefault();
    document.getElementById("seniors").scrollIntoView({
      behavior: "smooth",
    });
  }

  handleClick5(e) {
    e.preventDefault();
    document.getElementById("testimonials").scrollIntoView({
      behavior: "smooth",
    });
  }

  handleClick6(e) {
    e.preventDefault();
    document.getElementById("membership").scrollIntoView({
      behavior: "smooth",
    });
  }

  handleClick7(e) {
    e.preventDefault();
    document.getElementById("features").scrollIntoView({
      behavior: "smooth",
    });
  }
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.sectionStyle}>
        <div className="video-container">
          <video
            id="main-video"
            className={classes.Mainback}
            autoPlay
            loop
            muted
          >
            <source src={Mainback} type="video/mp4" />
          </video>
        </div>
        <div className={classes.total}>
          <img src={MaxLogo} alt="MAX_logo" className={classes.img} />
          <h1 className={classes.h1style}>Aspire for Excellence</h1>
          <h3 className={classes.subheading}>
            Any successful career starts with a{" "}
            <span className={classes.networkstyle}>good network</span>
          </h3>
          <Button
            onClick={this.handleClick7}
            className={classes.button}
            variant="contained"
          >
            Features
          </Button>
          <Button
            onClick={this.handleClick4}
            className={classes.button}
            variant="contained"
          >
            Seniors
          </Button>
          <Button
            onClick={this.handleClick3}
            className={classes.button}
            variant="contained"
          >
            Jobs
          </Button>
          <Button
            onClick={this.handleClick6}
            className={classes.button}
            variant="contained"
          >
            Membership
          </Button>
          <Button
            onClick={this.handleClick5}
            className={classes.button}
            variant="contained"
          >
            Testimonials
          </Button>
          <Button
            onClick={this.handleClick}
            className={classes.button}
            variant="contained"
          >
            About
          </Button>

          <Button
            onClick={this.handleClick2}
            className={classes.button}
            variant="contained"
          >
            Subscribe
          </Button>
        
        </div>
      </div>
    );
  }
}

MainImage = withMyHook(MainImage);
export default MainImage;
