import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SeniorExec from "./SeniorExec.js";
import { makeStyles } from "@material-ui/core/styles";
import SeniorExecText from "./SeniorExecText";

// import SmallSeniorExecImgHover from "../Images/senior/Latafat_Faran2.jpg";
import SmallSeniorExecImg from "../Images/senior/Jalaluddin_Uzma.jpg";
import SmallSeniorExecImg2 from "../Images/senior/Diop_Cheikh.jpeg";
import SeniorExecImg from "../Images/senior/Salman_Zahid (1).jpg";
import One from "../Images/senior/Ali_Ammar.jpg";
import Two from "../Images/senior/Abdul Gaffor_ Thouheed.jpeg";
// import Three from "../Images/senior/Hadibhai_Aly.jpg";
import Four from "../Images/senior/Chahdi_Mohammed.jpg";
import Five from "../Images/senior/Emes_Aaron.png";
import Six from "../Images/senior/Al-Abadleh_Dr. Hind (1).jpg";
import Seven from "../Images/senior/Ahmad_Farah.jpeg";
import Eight from "../Images/senior/Hali.jpg";
import Nine from "../Images/senior/Hameed_Amir.jpg";
import Ten from "../Images/senior/Hanafi_Pouneh.jpeg";
import Eleven from "../Images/senior/Hamidani_Farhan.jpeg";
import Twelve from "../Images/senior/El Masri_Ghaleb.png";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  background_lg: {
    backgroundColor: "white",
  },
  background_md: {
    backgroundColor: "white",
    "@media (max-width: 1000px)": { display: "None" },
    "@media (min-width: 550px)": { display: "None" },
  },
  background_sm: {
    backgroundColor: "white",
    "@media (min-width: 550px)": { display: "None" },
  },
  seniorexec: {
    paddingTop: "10vh",
    backgroundColor: "white",
  },
  grid: {
    paddingLeft: "15%",
    paddingRight: "15%",
    justifyContent: "center",
    alignItems: "start",
    paddingBottom: "10vh",
  },
}));

let images = [
  { photo: Two },
  { photo: SmallSeniorExecImg },
  { photo: SmallSeniorExecImg2 },
  { photo: SeniorExecImg },
  { photo: One },
  // { photo: Three },
  { photo: Four },
  { photo: Five },
  { photo: Six },
  { photo: Seven },
  { photo: Eight },
  { photo: Nine },
  { photo: Ten },
  { photo: Eleven },
  { photo: Twelve },
];

function shuffledImages() {
  let shuffledImages = [];
  while (shuffledImages.length < 4) {
    let num = Math.floor(Math.random() * (images.length - 1));
    if (!shuffledImages.includes(num)) {
      shuffledImages.push(num);
    }
  }
  let execImages = [];
  for (let i of shuffledImages) {
    execImages.push(images[i]);
  }
  return execImages;
}

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class SeniorExecGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      phone: "",
      desktop: "None",
      displayImages: images,
    };
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      displayImages: shuffledImages(),
    });
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.seniorexec}>
        <div className={classes.background_lg}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="center"
            className={classes.grid}
            id="seniors"
          >
            <Grid
              container
              item
              xs={12}
              spacing={4}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                sm={9}
                md={6}
                lg={4}
                alignItems="center"
                justify="center"
              >
                <SeniorExec
                  name_text="Salman Zahid"
                  extra_text="President & CEO of Green Shield Canada"
                  image={this.state.displayImages[0].photo}
                  hover_image={this.state.displayImages[0].photo}
                />
              </Grid>

              <Hidden smDown>
                <Grid
                  container
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  alignItems="center"
                  justify="center"
                >
                  <SeniorExec
                    name_text="Salman Zahid"
                    extra_text="President & CEO of Green Shield Canada"
                    id="theimage"
                    image={this.state.displayImages[1].photo}
                    hover_image={this.state.displayImages[1].photo}
                  />
                </Grid>
              </Hidden>

              <Hidden mdDown>
                <Grid
                  container
                  item
                  xs={12}
                  sm={9}
                  md={6}
                  lg={4}
                  alignItems="center"
                  justify="center"
                >
                  <SeniorExec
                    name_text="Latafat Faran"
                    extra_text="Executive Vice President at Core Development Group"
                    id="theimage"
                    image={this.state.displayImages[2].photo}
                    hover_image={this.state.displayImages[2].photo}
                  />
                </Grid>
              </Hidden>

              <SeniorExecText appContext={this.props.appContext} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

SeniorExecGrid = withMyHook(SeniorExecGrid);
export default SeniorExecGrid;
