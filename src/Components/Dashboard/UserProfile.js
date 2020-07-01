import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import pic0 from "../Images/faceShot/pic0.png";
import { css } from 'emotion'
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
   // justifyContent: 'center',
    //alignItems: 'center',
    top: '0',
    left: '0',
    height: '100%',
    width: '23.5%',
    position: 'fixed',
    textAlign: 'justify',

  },
  pic:{
    height: 'auto',
  },

    paragraph: {
     // position: 'absolute',
     
     
      fontFamily: 'minion-pro, serif',
      fontStyle: 'italic',
      fontWeight: 'bolder',
      fontSize: '2vw',
      margin:'1vw 2vw 1vw 2vw',
      textAlign: 'center',
      display: 'block'
    },
    paragraph2: {
      //position: 'absolute',
      //top: '35%',
      
      margin:'1vw 3vw 1vw 3vw',
      fontFamily: 'myriad-pro, sans-serif',
      fontStyle: 'italic',
      fontWeight: '550',
      fontSize: '1.5vw',
     textAlign: 'center',
      display: 'block'
    },
    paragraph3: {

      margin:'2vw 4vw 2vw 4vw',
      fontFamily: 'myriad-pro, sans-serif',
      fontSize: '1.2vw',
      textAlign: 'center',
      display: 'block'
    },
    paragraph4: {
      margin:'3vw 4vw 2vw 4vw',
      fontFamily: 'myriad-pro, sans-serif',
      fontStyle: 'italic',
      fontWeight: '800',
      fontSize: '1.5vw',
     textAlign: 'left',
      display: 'block'
    },
    circle:{
      position: 'fixed',
    textAlign: 'justify',
        height:'16vw',
        width:'16vw',
        margin:'0vw 2vw 3vw 2vw',
        display:'flex',
        borderRadius:'50%',
        backgroundColor:'#B6A165',
        display:'inline-block',
        horizontalAlign: 'middle',
        left:'2%',
       // textAlign: 'center',
        boxShadow:'0px 6px 6px #00000029',
    },
    paragraph5: {
       fontFamily: 'minion-pro, serif',
       fontWeight: 'bolder',
       fontSize: '3.5vw',
       color:'#FFFFFF',
       margin:'4vw 2vw 0vw 2vw',
       textAlign: 'center',
      // display: 'block'
     },
     paragraph6: {
      fontFamily: 'minion-pro, serif',
      fontWeight: 'bolder',
      fontSize: '1.2vw',
      color:'#FFFFFF',
      margin:'0vw 2vw 1vw 2vw',
      textAlign: 'center',
     // display: 'block'
    },
    borderline:{
      borderRight: '0.2vw solid #58595B',
      height: '550px',
      position: 'absolute',
      left: '110%',
      top:'8%',
    }
}));

// writing a hook just to incorporate the CSS defined outside under classes
// feel free to use this function in any other function
function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Landing extends Component{
  render() {
    const classes = this.props.classes;
    
    return (
 
      <div className={classes.root}>
             <div className={classes.borderline}></div>
<a>
  <img className={css`
    
          width: 80%;
          height: auto;
          padding:5%;
          left:10%;
          border-radius: 50%;
          margin-left: auto;
          margin-right: auto;
          display: block;
        }`} 
        src={pic0} alt={"Testimonial Quote"}/>
     <span>
      <p className={classes.paragraph}>Ali Khan</p>
      <p className={classes.paragraph2}>Director of Marketing and Communication</p>
      <p className={classes.paragraph3}><b><i>IBM</i></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toronto, ON</p>
      <p className={classes.paragraph4}>32 Coffee Chats</p>
      <div className={classes.circle}>
      <p className={classes.paragraph5}>1500</p>
      <p className={classes.paragraph6}>Credits Available</p>
      </div>
      </span>
      </a>

      </div>
      
    );
  }
}

Landing = withMyHook(Landing);
export default Landing;
