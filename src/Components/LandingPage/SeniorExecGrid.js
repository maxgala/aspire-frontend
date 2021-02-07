import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import SeniorExecText from "./SeniorExecText.js";

import Attia_Afnan from "../Images/senior/Attia_Afnan.jpg";
import Benkhouya_Saloua from "../Images/senior/Benkhouya_Saloua.jpg";
import Ebrahim_Salima from "../Images/senior/Ebrahim_Salima.jpg";
import Dorias_Osama from "../Images/senior/Dorias_Osama.jpg";
import Gulam_Moosah from "../Images/senior/Gulam_Moosah.jpg";
import Hashmi_Seema from "../Images/senior/Hashmi_Seema.jpg";
import Jalaluddin_Uzma from "../Images/senior/Jalaluddin_Uzma.jpg";
import Jama_Robleh from "../Images/senior/Jama_Robleh.jpg";
import Khan_Samir from "../Images/senior/Khan_Samir.jpg";
import Mahmood_Safdar from "../Images/senior/Mahmood_Safdar.jpeg";
import Malik_Nadia from "../Images/senior/Malik_Nadia.jpeg";
import Mitchell_Axelle from "../Images/senior/Mitchell_Axelle.png";
import Rahman_Ebad from "../Images/senior/Rahman_Ebad.jpg";
import Rooney_Richard from "../Images/senior/Rooney_Richard.jpg";
import Salman_Zahid from "../Images/senior/Salman_Zahid.jpg";
import Shahsamand_Asma from "../Images/senior/Shahsamand_Asma.jpg";
import Soliman_Doha from "../Images/senior/Soliman_Doha.jpg";
import Soliman_Osama from "../Images/senior/Soliman_Osama.jpg";
import Soliman_Walied from "../Images/senior/Soliman_Walied.jpg";
import Thomas_Benji from "../Images/senior/Thomas_Benji.jpg";
import Yusuf_Danish from "../Images/senior/Yusuf_Danish.jpg";
import Yusuf_Mustafa from "../Images/senior/Yusuf_Mustafa.jpg";
import Zaman_Sadia from "../Images/senior/Zaman_Sadia.jpg";
import Saba_Tariq from "../Images/faceShot/Tariq_Saba.jpg";
import Yusuf_Moore from "../Images/faceShot/Moore_Yusuf.jpg";
import Kefaya_Raji from "../Images/faceShot/Raji_Kefaya.jpg";
import Abadhleh from "../Images/faceShot/Al-Abadleh_Dr.Hind.jpg";
// TODO: display more than one senior exec on larger screens
// import { Hidden } from "@material-ui/core";

import left from "../Images/arrow_left.png";
import right from "../Images/arrow_right.png";
import { Swipeable } from "react-swipeable";

const useStyles = makeStyles(() => ({
  rightArrow: {
    cursor: "pointer",
    position: "absolute",
    align: "left",
    "@media (max-width: 660px)": { display: "None" },
  },
  leftArrow: {
    cursor: "pointer",
    position: "absolute",
    "@media (max-width: 660px)": { display: "None" },
  },
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
  picture: {
    width: "200px",
    height: "200px",
    "@media (max-width: 480px)": {
      width: "150px",
      height: "150px",
    },
    justify: "left",
    borderRadius: "50%",
  },
  seniorexec: {
    paddingTop: "10vh",
    backgroundColor: "white",
  },
  seniorExecSmall: {
    "@media (min-width: 960px)": { display: "None" },
  },
  seniorExecLarge: {
    "@media (max-width: 959px)": { display: "None" },
  },
  grid: {
    paddingLeft: "15%",
    paddingRight: "15%",
    justifyContent: "center",
    alignItems: "start",
    paddingBottom: "10vh",
  },
  image: {
    width: "100%",
    height: "100%",
    padding: "2%",
    borderRadius: "50%",
    "@media (min-width: 960px)": { textAlign: "center" },
    objectFit: "cover",
  },
  header: {
    fontFamily: "Nunito Sans",
    fontSize: "48px",
    "@media (max-width: 480px)": {
      fontSize: "25px",
    },
    fontWeight: "bolder",
    textAlign: "center",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  carousal: {
    alignItems: "center",
    paddingTop: "4%",
    paddingBottom: "8%",
    backgroundColor: "#f1f1f1",
  },
  paragraph: {
    margin: "auto",
    fontFamily: "Nunito",
    fontSize: "20px",
    "@media (max-width: 480px)": {
      fontSize: "15px",
    },
    paddingLeft: "40px",
    paddingRight: "40px",
    fontStyle: "italic",
    color: "#484848",
  },
  title: {
    fontSize: "22px",
    "@media (max-width: 480px)": {
      fontSize: "18px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    fontFamily: "Nunito",
    fontWeight: "bold",
    color: "#484848",
    width: "100%",
  },
}));

let images = [
  {
    photo: Hashmi_Seema,
    name: "Seema Hashmi",
    title:
      "Diagnostic & Non-Vascular Interventional Radiologist; Adjunct Professor at Bluewater Health; University of Western Ontario",
  },
  {
    photo: Thomas_Benji,
    name: "Benjie Thomas",
    title: "Canadian Managing Partner at KPMG",
  },
  {
    photo: Soliman_Walied,
    name: "Walied Soliman",
    title: "Partner and Chair at Norton Rose",
  },
  {
    photo: Dorias_Osama,
    name: "Osama Doria",
    title: "Lead Game Designer at Warner Brothers",
  },
  {
    photo: Rooney_Richard,
    name: "Richard Rooney",
    title: "President and CIO at Burgundy Asset Management",
  },
  {
    photo: Salman_Zahid,
    name: "Zahid Salman",
    title: "President & CEO at Green Shield Canada",
  },
  {
    photo: Benkhouya_Saloua,
    name: "Saloua Benkhouya",
    title: "VP Business Financial Services at RBC",
  },
  {
    photo: Shahsamand_Asma,
    name: "Asma Shahsamand",
    title: "Head of Canada Ventures at Accenture",
  },
  {
    photo: Zaman_Sadia,
    name: "Sadia Zaman",
    title: "CEO at Inspirit Foundation",
  },
  {
    photo: Gulam_Moosah,
    name: "Moosah Gulam",
    title:
      "President and CEO and Head of the Medical Technology Segment at ZEISS Canada",
  },
  {
    photo: Rahman_Ebad,
    name: "Ebad Rahman",
    title: "Partner at Torys",
  },
  {
    photo: Khan_Samir,
    name: "Samir Khan",
    title:
      "CFO & CCO for Canada and General Counsel for Americas at Russell Investments",
  },
  {
    photo: Malik_Nadia,
    name: "Nadia Mailk",
    title: "Director Program Management & Corporate Initiatives at Bombardier",
  },
  {
    photo: Jama_Robleh,
    name: "Robleh Jama",
    title: "Director at Shopify",
  },
  {
    photo: Yusuf_Mustafa,
    name: "Mustafa Yusuf",
    title:
      "President & CoFounder; President & Founder at FLOCK rotisserie+greens; Big Smoke Burger",
  },
  {
    photo: Jalaluddin_Uzma,
    name: "Uzma Jalaluddin",
    title: "Author; Columnist at Ayesha At Last; Toronto Star",
  },
  {
    photo: Mahmood_Safdar,
    name: "Safdar Mahmood",
    title: "Managing Vice President at Pariveda Solutions",
  },
  {
    photo: Ebrahim_Salima,
    name: "Salima Ebrahim",
    title: "Chief of Staff at City of Edmonton",
  },
  {
    photo: Yusuf_Danish,
    name: "Danish Yusuf",
    title: "CEO and Founder; Principal at Zensurance; McKinsey",
  },
  {
    photo: Attia_Afnan,
    name: "Afnan Attia",
    title: "Director of Strategy and Corporate Development at Morneau Shepell",
  },
  {
    photo: Soliman_Doha,
    name: "Doha Soliman",
    title: "Finance Director at Blueridge OMS (Oral and Maxillofacial Surgeon)",
  },
  {
    photo: Soliman_Osama,
    name: "Osama Soliman",
    title: "Oral and Maxillofacial Surgeon at Blueridge OMS",
  },
  {
    photo: Mitchell_Axelle,
    name: "Axelle Mitchel",
    title: "Director, Strategy & Transformation at RBC",
  },
  {
    photo: Saba_Tariq,
    name: "Saba Tariq",
    title: "Partner at Deloitte",
  },
  {
    photo: Yusuf_Moore,
    name: "Yusuf Moore",
    title: "General Counsel at League Inc.",
  },
  {
    photo: Kefaya_Raji,
    name: "Kefaya Raji",
    title: "Head of HR",
  },
  {
    photo: Abadhleh,
    name: "Dr. Hind Al Abadleh",
    title:
      "Professor in Department of Chemistry and Biochemistry at Wilfred Laurier Univeristy",
  },
];

/*
 * Deprecated: using a carousal to show images now
 * May come back to this in the future
 */
/*function shuffledImages() {
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
}*/

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
      current: images[0],
      active: 0,
      numImages: images.length,
    };
  }

  timer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.HandleRightArrowClick(), 3000);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.HandleRightArrowClick(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  HandleRightArrowClick = (event) => {
    if (this.state.active < images.length - 1) {
      this.setState({
        current: images[parseInt(this.state.active) + 1],
        active: parseInt(this.state.active) + 1,
      });
    } else if (this.state.active === images.length - 1) {
      this.setState({ current: images[0], active: 0 });
    }
    this.timer();
  };

  HandleLeftArrowClick = (event) => {
    if (this.state.active > 0) {
      this.setState({
        current: images[this.state.active - 1],
        active: this.state.active - 1,
      });
    } else if (this.state.active === 0) {
      this.setState({
        current: images[this.state.numImages - 1],
        active: this.state.numImages - 1,
      });
    }
    this.timer();
  };

  HandleSetClick = (event) => {
    this.setState({
      active: event.target.getAttribute("data-image"),
      current: images[event.target.getAttribute("data-image")],
    });
    this.timer();
  };

  render() {
    const classes = this.props.classes;
    return (
      <Swipeable
        onSwipedRight={this.HandleLeftArrowClick}
        onSwipedLeft={this.HandleRightArrowClick}
      >
        <Grid
          container
          item
          alignItems="center"
          justify="center"
          id="seniorexecs"
          style={{ marginTop: "40px", marginBottom: "60px" }}
        >
          <Grid
            container
            item
            xs={1}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <img
              className={classes.leftArrow}
              src={left}
              onClick={this.HandleLeftArrowClick}
              alt={"Senior Exec Left Arrow"}
            />
          </Grid>
          <Grid
            container
            item
            xs={9}
            sm={9}
            md={4}
            lg={3}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <p className={classes.picture}>
              <img
                className={classes.image}
                src={this.state.current.photo}
                alt="Senior Exec"
              />
            </p>
          </Grid>
          <Grid
            container
            item
            xs={1}
            spacing={1}
            alignItems="center"
            justify="center"
            className={classes.seniorExecSmall}
          >
            <img
              className={classes.rightArrow}
              src={right}
              onClick={this.HandleRightArrowClick}
              alt={"Testimonial Right Arrow"}
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={9}
            md={6}
            lg={5}
            spacing={1}
            justify="center"
            style={{ marginBottom: "40px" }}
          >
            <p className={classes.title}>{this.state.current.name}</p>
            <p className={classes.paragraph}>{this.state.current.title}</p>
          </Grid>
          <Grid
            container
            item
            xs={1}
            spacing={1}
            alignItems="center"
            justify="center"
            className={classes.seniorExecLarge}
          >
            <img
              className={classes.rightArrow}
              src={right}
              onClick={this.HandleRightArrowClick}
              alt={"Testimonial Right Arrow"}
            />
          </Grid>

          <SeniorExecText appContext={this.props.appContext} />
        </Grid>
      </Swipeable>
    );
  }
}

SeniorExecGrid = withMyHook(SeniorExecGrid);
export default SeniorExecGrid;
