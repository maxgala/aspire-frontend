import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import SeniorExec from "./SeniorExec.js";
import { makeStyles } from "@material-ui/core/styles";
import SeniorExecText from "./SeniorExecText";

// import SmallSeniorExecImgHover from "../Images/senior/Latafat_Faran2.jpg";
import uzma_picture from "../Images/senior/Jalaluddin_Uzma.jpg";
import cheick_picture from "../Images/senior/Diop_Cheikh.jpeg";
import salman_picture from "../Images/senior/Salman_Zahid (1).jpg";
import ali_picture from "../Images/senior/Ali_Ammar.jpg";
// import abdulgaffor_picture from "../Images/senior/Abdul Gaffor_ Thouheed.jpeg";
// import Three from "../Images/senior/Hadibhai_Aly.jpg";
import mohammed_picture from "../Images/senior/Chahdi_Mohammed.jpg";
import aaron_picture from "../Images/senior/Emes_Aaron.png";
import drhind_picture from "../Images/senior/Al-Abadleh_Dr. Hind (1).jpg";
import farah_picture from "../Images/senior/Ahmad_Farah.jpeg";
import hali_picture from "../Images/senior/Hali.jpg";
import amir_picture from "../Images/senior/Hameed_Amir.jpg";
import pouneh_picture from "../Images/senior/Hanafi_Pouneh.jpeg";
import farhan_picture from "../Images/senior/Hamidani_Farhan.jpeg";
import ghaleb_picture from "../Images/senior/El Masri_Ghaleb.png";
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
  {
    photo: uzma_picture,
    name: "Uzma Jalaluddin",
    title: "Author af Ayesha at Last and Columnist at Toronto Star",
  },
  {
    photo: cheick_picture,
    name: "Diop Cheikh",
    title: "VP Corporate Client Group at RBC",
  },
  {
    photo: salman_picture,
    name: "Salman Zahid",
    title: "President & CEO at Green Shield Canada",
  },
  {
    photo: ali_picture,
    name: "Ali Ammar",
    title: "Partner at Van Berkom and Associates",
  },
  // { photo: abdulgaffor_picture },
  // { photo: Three },
  {
    photo: mohammed_picture,
    name: "Mohammed Chahdi",
    title: "Director and Head of Americas HR Operations at Dell Technologies",
  },
  {
    photo: aaron_picture,
    name: "Emes Aaron",
    title: "Senior Partner & Head of Opinions and Research at Torys",
  },
  {
    photo: drhind_picture,
    name: "Dr.Hind Al Abadleh",
    title:
      "Professor in Department of Chemistry and Biochemistry at Wilfrid Laurier University",
  },
  {
    photo: farah_picture,
    name: "Farah Ahmad",
    title: "Chief Commercial Officer at Clinical Maestro by Strategikon",
  },
  {
    photo: hali_picture,
    name: "Hali Farah",
    title: "Senior HR Consultant at City of Toronto",
  },
  {
    photo: amir_picture,
    name: "Amir Hameed",
    title: "VP Global Solutions Engineering at RingCentral",
  },
  {
    photo: pouneh_picture,
    name: "Pouneh Hanafi",
    title: "VP Marketing at Tulip Retail",
  },
  {
    photo: farhan_picture,
    name: "Farhan Hamidani",
    title: "Co-CEO at TF Global Inc.",
  },
  {
    photo: ghaleb_picture,
    name: "Ghaled El Masri",
    title: "Managing Director at Adaptovate",
  },
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
                  name_text={this.state.displayImages[0].name}
                  extra_text={this.state.displayImages[0].title}
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
                    name_text={this.state.displayImages[1].name}
                    extra_text={this.state.displayImages[1].title}
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
                    name_text={this.state.displayImages[2].name}
                    extra_text={this.state.displayImages[2].title}
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
