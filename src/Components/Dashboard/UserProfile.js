import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import pic0 from "../Images/faceShot/pic0.png";
import { css } from 'emotion'

const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    top: '0',
    left: '0',
    height: '100%',
    width: '23.5%',
    position: 'fixed',
    textAlign: 'justify',
  },

  name: {
    fontFamily: 'minion-pro, serif',
    fontStyle: 'italic',
    fontWeight: 'bolder',
    fontSize: '2vw',
    margin: '1vw 2vw 1vw 2vw',
    textAlign: 'center',
    display: 'block',
  },

  occupation: {
    margin: '1vw 3vw 1vw 3vw',
    fontFamily: 'myriad-pro, sans-serif',
    fontStyle: 'italic',
    fontWeight: '550',
    fontSize: '1.5vw',
    textAlign: 'center',
    display: 'block',
  },

  company: {
    margin: '2vw 4vw 2vw 4vw',
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '1.2vw',
    textAlign: 'center',
    display: 'block',
  },

  numCoffeChat: {
    margin:'3vw 4vw 2vw 4vw',
    fontFamily: 'myriad-pro, sans-serif',
    fontStyle: 'italic',
    fontWeight: '800',
    fontSize: '1.5vw',
    textAlign: 'left',
    display: 'block',
  },

  circle:{
    position: 'fixed',
    textAlign: 'justify',
    height: '13vw',
    width: '13vw',
    margin: '0vw 2vw 3vw 2vw',
    display: 'flex',
    borderRadius: '50%',
    backgroundColor: '#B6A165',
    display: 'inline-block',
    left: '3%',
    boxShadow: '0px 6px 6px #00000029',
  },
  
  credits: {
    fontFamily: 'minion-pro, serif',
    fontWeight: 'bolder',
    fontSize: '3.5vw',
    color: '#FFFFFF',
    margin: '3vw 2vw 0vw 2vw',
    textAlign: 'center',
  },

  available: {
    fontFamily: 'minion-pro, serif',
    fontWeight: 'bolder',
    fontSize: '1vw',
    color: '#FFFFFF',
    margin: '0vw 2vw 1vw 2vw',
    textAlign: 'center',
  },

  borderline:{
    borderRight: '0.2vw solid #58595B',
    height: '45vw',
    position: 'absolute',
    left: '93%',
    margin: '4vw 2vw 4vw 2vw',
  },

  image:{
    width: '75%',
    height: 'auto',
    padding: '5%',
    left: '10%',
    borderRadius: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  }

}));


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
          <img className={classes.image} src={pic0} alt={"User Profile"}/>
          <span>
            <p className={classes.name}>Ali Khan</p>
            <p className={classes.occupation}>Director of Marketing and Communication</p>
            <p className={classes.company}><b><i>IBM</i></b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toronto, ON</p>
            <p className={classes.numCoffeChat}>32 Coffee Chats</p>
            <div className={classes.circle}>
              <p className={classes.credits}>1500</p>
              <p className={classes.available}>Credits Available</p>
            </div>
          </span>
        </a>
      </div>
      
    );
  }
}

Landing = withMyHook(Landing);
export default Landing;
