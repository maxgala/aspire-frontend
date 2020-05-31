
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.png";
import icon2 from "../Images/icon_2.png";
import icon1 from "../Images/icon_1.png";
import icon3 from "../Images/icon_3.png";
const useStyles = makeStyles(theme => ({

    h1style: {
        top: '83%',
        color: "black",
        fontSize: "20px",
        textAlign: 'left',
        marginBottom: "0",
        marginTop: "0",
        position: 'absolute',
        left: '55%',
        letterSpacing: "0px",
        textAlign: 'left',
        height:'auto',
        //paddingRight: "80pt",
     //   paddingLeft:"60%",
        paddingRight:"10%",
      },
      f1:{
        fontFamily: "Bold 36px/48px Nunito Sans;",
      },

      f2:{
        fontFamily: "Regular 18px/24px Montserrat",
      },

      f3:{
        fontFamily: "Bold 26px/36px Nunito Sans",
        marginLeft: "1em",
      },
   
      tab: { 
        display: "flex",
        alignItems:"center",
        justifyContent:"top",
        fontFamily: "Bold 36px/48px Nunito Sans;",
        verticalAlign: "middle",
      },
    about: {
       // paddingLeft:"10%",
      //  paddingRight:"10%",
      height:'auto',
        width: "100vw",
        minHeight: "50vw",
        overflow: "hidden",
        marginRight : "0",
        marginLeft  : "0",
    },
   
    total: {
        position: 'absolute',
        left: '25%',
        top: '85%',
        transform: 'translate(-50%, 0%)',       
        //width: '40vw',

       // height: '40vh',
        //marginBottom: '20%',
        paddingLeft:"10%",

    }
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <div className={classes.about}>
     

    <div className={classes.total}>
       <img style={{width: '35vw', height: '60vh', padding:"2%"}}resizeMode="contain" src={aboutMax} alt="About Image"/>
    </div>

    <div className={classes.h1style}>
      <h1 className={classes.f1}><b>About MAX Aspire</b></h1>
      <p className={classes.f2}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliqui
      </p>
    <br></br>
      <p className={classes.tab}> <img  resizeMode="contain" src={icon2} alt="About Image"/>  
        <span className={classes.f3}><b>Privileged Access to Senior Level Professionals</b></span>
      </p>

      <p className={classes.tab}> <img resizeMode="contain" src={icon1} alt="About Image"/>
        <span className={classes.f3}><b>Professional Career and Board Opportunities</b></span>
      </p>
      
      <p className={classes.tab}> <img resizeMode="contain" src={icon3} alt="About Image"/>
        <span className={classes.f3}><b>Ability to Apply and Hire From Exclusive Job Board</b></span>
      </p>

    </div>





    </div>
    
  );
}
