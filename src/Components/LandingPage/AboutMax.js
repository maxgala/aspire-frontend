import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.jpg";
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
    letterSpacing: "0px",
    padding: '5%'
  },
  f1:{
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "36px",
    textAlign: 'center',
  },
  f2:{
    fontFamily: "Montserrat",
    fontSize: "18px",
    maxWidth: '600px',
    textAlign: 'left',
    paddingLeft: '60px',
    paddingRight: '10px'
  },
  f3:{
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "24px",
    marginLeft: "1em",
    maxWidth: '550px',
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
    width: '100%',
    padding: '5%',
    borderRadius: '20%',
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
        item xs={12} sm={9} md={9} lg={6}
        spacing={1}
        alignItems="center"
        justify="center"
      >
        <img className={classes.total} src={aboutMax} alt="max_about"/>
      </Grid>
      <Grid
        container
        item xs={12} sm={9} md={9} lg={6}
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
          MAX Aspire is an online platform to connect accomplished, high performing Senior Professionals who have made a commitment to meeting and advising Aspiring Professionals in the MAX network.
        </p>
        <p className={classes.f2}>
          These noteworthy Senior Professionals have excelled in their respective fields and have a large network.
        </p>
        <p className={classes.tab} style={{marginTop: '60px'}}> <img src={icon2} alt="access"/>
          <span className={classes.f3}><b>Privileged Access to Senior Level Professionals, including curated meetings</b></span>
        </p>
        <p className={classes.tab}> <img src={icon1} alt="career"/>
          <span className={classes.f3}><b>Professional Career and Board Opportunities</b></span>
        </p>
        <p className={classes.tab}> <img src={icon3} alt="exec board"/>
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
