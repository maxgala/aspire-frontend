import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import pic0 from "../Images/faceShot/pic0.png";
import { Button } from '@material-ui/core';
import { faMapMarker, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    top: '0',
    left: '0',
    height: '100%',
    width: '300px',
    position: 'fixed',
    textAlign: 'justify',
    borderRadius: '0% 0% 3% 3%',
    boxShadow:' 0px 1.1px 8px #00000052',
    backgroundColor: 'white'
  },

  name: {
    fontFamily: 'minion-pro, serif',
    fontWeight: 'bolder',
    fontSize: '30px',
    margin: '5px 20px 10px 20px',
    textAlign: 'center',
    display: 'block',
  },

  occupation: {
    margin: '10px 30px 10px 30px',
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: '550',
    fontSize: '15px',
    textAlign: 'center',
    display: 'block',
  },
  city:{
    margin: '18px 40px 5px 40px',
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: '550',
    fontSize: '15px',
    textAlign: 'center',
    display: 'block',
  },

  company: {
    margin: '5px 40px 20px 40px',
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '18px',
    textAlign: 'center',
    display: 'block',
    fontWeight: 'bold',
  },

  numCoffeChat: {
    margin:'10px 40px 10px 40px',
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '15px',
    textAlign: 'center',
    display: 'block',
  },

  circle:{
    position: 'relative',
    textAlign: 'justify',
    height: '130px',
    width: '130px',
    margin: '15px 85px 20px 85px',
    borderRadius: '50%',
    backgroundColor: '#B6A165',
    display: 'inline-block',
    boxShadow: '0px 6px 6px #00000029',
  },
  
  credits: {
    fontFamily: 'minion-pro, serif',
    fontWeight: 'bolder',
    fontSize: '40px',
    color: '#FFFFFF',
    margin: '30px 20px 0px 20px',
    textAlign: 'center',
  },

  available: {
    fontFamily: 'minion-pro, serif',
    fontWeight: 'bolder',
    fontSize: '10px',
    color: '#FFFFFF',
    margin: '0px 20px 10px 20px',
    textAlign: 'center',
  },

  image:{
    width: '60%',
    height: 'auto',
    padding: '5%',
    left: '10%',
    borderRadius: '50%',
    marginTop:'10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },

  button: {
    textTransform: 'none',
    backgroundColor: "#B6A165",
    marginBottom:"2%",
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 50,
    color: "#000000",
    position:'relative',
    display: 'block',
    '&:hover': {
        backgroundColor: "#F1F1F1",
        color: '#484848'
    },
    
    fontSize:'15px',
    fontWeight: 'bold',
    fontFamily:'myriad-pro, sans-serif',
    paddingLeft: '50px',
    paddingRight: '50px'
  },


  button1: {
    textTransform: 'none',
    backgroundColor: "#000000",
    marginBottom:"2%",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:'20px',
    borderRadius: 50,
    color: "#FFFFFF",
    position:'relative',
    display: 'block',
    '&:hover': {
        backgroundColor: "#F1F1F1",
        color: '#484848'
    },
    fontSize:'15px',
    fontWeight: 'bold',
    fontFamily:'myriad-pro, sans-serif',
    paddingLeft: '75px',
    paddingRight: '75px'
  },

  updateProfile:{
    margin:'20px 40px 10px 40px',
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '12px',
    textAlign: 'center',
    display: 'block',
    color:'#6EA0B5',
    cursor:'pointer',
  },

  contact:{
    margin:'5px 40px 10px 40px',
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '12px',
    textAlign: 'center',
    display: 'block',
    color:'#6EA0B5',
    cursor:'pointer',
  },
  faq:{
    margin:'5px 40px 10px 40px',
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '12px',
    textAlign: 'center',
    display: 'block',
    color:'#6EA0B5',
    cursor:'pointer',
  }
}));


function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Landing extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  openFaq = (event) => {
    this.setState({
      open: true
    })
  };

  handleClose = event =>{
    this.setState({
      open: false
    })
  };

  render() {
    const classes = this.props.classes;
    
    return (
      <div className={classes.root}>
        <div style={{margin: 'auto'}}>
          <img className={classes.image} src={pic0} alt={"User Profile"}/>
          <span>
            <p className={classes.name}>Ali Khan</p>
            <p className={classes.occupation}>Director of Marketing and Communication</p>
            <p className={classes.city}><FontAwesomeIcon icon={faMapMarker} style={{width: '14px', height: '14px', margin: '2px', marginRight: '10px'}}/>Toronto, ON</p>
            <p className={classes.company}><FontAwesomeIcon icon={faBuilding} style={{width: '14px', height: '14px', margin: '2px', marginRight: '10px'}}/><b>IBM</b></p>
            <p className={classes.numCoffeChat}>32 Coffee Chats</p>
            <p className={classes.numCoffeChat}>45 Jobs Applied To</p>
            <div className={classes.circle}>
              <p className={classes.credits}>1500</p>
              <p className={classes.available}>Credits Available</p>
            </div>
          </span>
          <Button className={classes.button} variant="contained" onClick={this.changeToSignUp}>Purchase Credits</Button>
          <Button className={classes.button1} variant="contained" onClick={this.changeToSignUp}>Post a Job</Button> 
          <p className={classes.updateProfile}>Update your profile</p>
          <p className={classes.contact}>Contact Admin Support</p>
          <p className={classes.faq} onClick={this.openFaq}>FAQ</p>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth={'lg'}
          >
            <DialogTitle id="scroll-dialog-title">
              <div>
                <h2 style={{margin: '0px', marginTop: '10px', color: '#B5A165'}}>FAQ</h2>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="scroll-dialog-description"
                tabIndex={-1}
                component={'span'}
              >
                <p>TODO: Frequently asked questions section</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                type="submit"
                variant="contained"
                color="primary"
                style={{margin: 'auto', backgroundColor: '#B5A165'}}
              >
                <b>Close</b>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

Landing = withMyHook(Landing);
export default Landing;
