import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.png";
import icon1 from "../Images/icon_1.png";
import icon2 from "../Images/icon_2.png";
import icon3 from "../Images/icon_3.png";

const useStyles = makeStyles(theme => ({
  h1style: {
    position: 'relative',
    color: "black",
    fontSize: "20px",
    marginBottom: "0",
    marginTop: "0",
    // left: '55%',
    letterSpacing: "0px",
    padding: '5%'
    // height:'auto',
    // paddingRight:"10%",
    // paddingTop: '5%',
  },
  f1:{
    fontFamily: "Bold 36px/48px Nunito Sans;",
    textAlign: 'center',
  },
  f2:{
    fontFamily: "Regular 18px/24px Montserrat",
    maxWidth: '450px',
    textAlign: 'center',
  },
  f3:{
    fontFamily: "Bold 26px/36px Nunito Sans",
    marginLeft: "1em",
    maxWidth: '350px',
    textAlign: 'left',
  },
   f4:{
    fontFamily: "Regular 10px/12px Montserrat",
    maxWidth: '450px',
    textAlign: 'center',
    fontSize:"10px",
  },
  tab: { 
    display: "flex",
    alignItems:"center",
    justifyContent:"top",
    fontFamily: "Bold 36px/48px Nunito Sans;",
    verticalAlign: "middle",
  },
  about: {
    display: 'grid',
    height:'fit-content',
    width: "100vw",
    minHeight: "75vh",
    overflow: "hidden",
    marginRight : "0",
    marginLeft  : "0",
  },
  total: {
    // float: 'left',
    // gridColumn: '1',
    // gridRow: '1',
    // position: 'absolute',
    // left: '25%',
    // top: '85%',
    // height: '400px',
    // transform: 'translate(-50%, 0%)',
    // paddingLeft:"10%",
    // paddingTop: '25%',
    width: '100%',
    height: '60vh',
    padding: '5%',
  },
  grid: { 
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      spacing={1}
      alignItems="center"
      justify="center"
      className={classes.grid}
    >
    <Grid
            container
            item xs={12} sm={9} md={6} lg={6}
            spacing={1}
            alignItems="center"
            justify="center"
          >
      <img class={classes.total} resizeMode="contain" src={aboutMax} alt="About Image"/>
      </Grid>
      <Grid
            container
            item xs={12} sm={9} md={6} lg={6}
            spacing={1}
            alignItems="center"
            justify="center"
          >
      <AboutContent/>
      </Grid>
    </Grid>
  );
}

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class AboutContent extends Component{
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.h1style}>
        <h1 className={classes.f1}><b>About MAX Aspire</b></h1>
        <p className={classes.f2}>
          MAX Aspire is an online platform to connect high performing, accomplished Senior Executives to talented, up and coming Aspiring Professionals in the MAX network.
        </p>
        <p className={classes.tab} style={{marginTop: '60px'}}> <img resizeMode="contain" src={icon2} alt="About Image"/>  
          <span className={classes.f3}><b>Privileged Access to Senior Level Professionals</b></span>
        </p>
        <p className={classes.tab}> <img resizeMode="contain" src={icon1} alt="About Image"/>
          <span className={classes.f3}><b>Professional Career and Board Opportunities</b></span>
        </p>
        <p className={classes.tab}> <img resizeMode="contain" src={icon3} alt="About Image"/>
          <span className={classes.f3}><b>Ability to Apply and Hire From Exclusive Job Board</b></span>
        </p>
        <p className={classes.f4} style={{marginTop: '60px'}}>
          *MAX Aspire is by MAX, for MAX
        </p>
      </div>
    )
  }
}

AboutContent = withMyHook(AboutContent);
