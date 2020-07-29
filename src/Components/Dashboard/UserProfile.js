import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import pic0 from "../Images/faceShot/pic0.png";
import close from "../Images/close.png";
import { Button } from '@material-ui/core';
import { faMapMarker, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import green from '@material-ui/core/colors/green';


const useStyles = makeStyles(theme => ({
  root1: {
    display: 'flex',
    top: '0',
    left: '0',
    minHeight: '100%',
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
    backgroundColor: '#B5A165',
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
    backgroundColor: "#B5A165",
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
  },
  toolbar: {
    //display: 'flex',
    //justifyContent: 'flex-start',
    height: '8vh',
    backgroundColor: 'black',
    boxShadow: '0px 0px 0px',
    width: '100%',
  },
  dialog:{
    borderRadius:'40%',
  },
  box: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
 
    },
   
    margin:'5px 40px 10px 20px',
    border: 'none',
    

  },
  textbox:{
    boxShadow: '0px 0px 0px',
    

    color:'white',
    '& .MuiInput-underline:before':{
      borderBottom: "2px solid #B6A165 ",
      
    },
    '& .MuiInput-underline:after':{
      //borderBottom: "1px solid black ",
       color: '#455E6A',
      borderBottom: "2px solid #B6A165 "
     
    },
    '& label.Mui-focused': {
      color: '#455E6A',
    
    },
    
  },
  input:{
    boxShadow: '0px 0px ', 

  },
  cssFocused: {},

  limit:{
    width: '90%',
    display:'block',
    margin: '0 auto',
    textAlign:'right',
    fontSize:'10px',
    color:'#58595B',
  },
  jobTitles:{
    margin:'0px 0px 5px 0px',
  },
  grid:{
    paddingLeft:'30px',
    paddingright:'30px',
  },
  text:{
    font:"Myriad Pro"
  },
  close: {
    position: 'absolute',
   
    right:'8%',
    
  },
 
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `#B6A165 `,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '2px',
    borderColor: '#B6A165 '
  },

  textField:{
    width:'115ch',
    margin:'5px 20px 5px 20px',
  },
  title:{
    width: '95%',
    display:'block',
    margin: '15px 10px 2px 10px',
    textAlign:'left',
    fontSize:'16px',
    color:'#58595B',
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
      open: false,
      active: 0,
      value: 'Full-Time',
  
    }
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  postJob = (event) => {
    this.setState({
      open: true
    })
  };

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
      <div className={classes.root1}>
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
          <Button className={classes.button1} variant="contained" onClick={this.postJob}>Post a Job</Button> 
          <p className={classes.updateProfile}>Update your profile</p>
          <p className={classes.contact}>Contact Admin Support</p>postJob
          <p className={classes.faq} onClick={this.openFaq}>FAQ</p>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth={'md'}
            PaperProps={{
              style: { borderRadius: 12 }
            }}
          >
            <Toolbar className={classes.toolbar}>
              <div>
                <h2 style={{margin: '0px', marginTop: '10px', color: 'white'}}>Post a Job</h2>
                
              </div>
              <img onClick={this.handleClose} className={classes.close} style={{width: '14px', height: '14px'}} src={close}/>
            </Toolbar>
            <div className={classes.grid}>
            <Grid
              container
              item xs={12}
              spacing={1}
           
            >
              <Grid
                container
                item xs={6}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"         
              >
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                
                      <form className={classes.box} noValidate autoComplete="off">
                        <TextField label="Job Title" fullWidth className={classes.textbox}  
                          InputProps={{
                            classes: {
                             
                              root: classes.outline,
                              focused: classes.cssFocused,
                              input: classes.input,
                            }
                          }}
                        />
                      </form>
                   
                </Grid>
              </Grid>


              <Grid
              container
              item xs={6}
              spacing={1}
              alignItems="flex-end"
              justify="flex-end"
              >
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                > 
                 <form className={classes.box} noValidate autoComplete="off">
                        <TextField label="Location" fullWidth className={classes.textbox}  
                          
                          InputProps={{
                            classes: {
                              input: classes.input,
                            }
                          }}
                        />
                      </form>
                </Grid>
              </Grid>

         
              <Grid
                container
                item xs={6}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"         
              >
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <form className={classes.box} noValidate autoComplete="off">
                        <TextField label="Company" fullWidth className={classes.textbox}  
                          
                          InputProps={{
                            classes: {
                              input: classes.input,
                            }
                          }}
                        />
                      </form>
                </Grid>
              </Grid>

            
  
     
    
             
              <Grid
              container
              item xs={3}
              spacing={1}
              alignItems="flex-end"
              justify="flex-end"
              >
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                >
                  <FormControlLabel  checked={this.state.value === 'Full-Time'} value='Full-Time' control={<Radio color="primary" />} label="Full-Time"  onChange={this.handleChange}/>
                </Grid>
              <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="center"
              justify="center"
                >
                <FormControlLabel  checked={this.state.value === 'Contract'} value="Contract" control={<Radio color="primary" />} label="Contract"  onChange={this.handleChange} />
                </Grid>
              </Grid>
              <Grid
                container
                item xs={3}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <FormControlLabel  
                   
                   checked={this.state.value === 'Part-Time'}
                    value='Part-Time' control={<Radio color="primary" />} label="Part-Time"  onChange={this.handleChange}/>
                </Grid>
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                 <FormControlLabel checked={this.state.value === 'Internship'}  value="Internship" control={<Radio color="primary" />} label="Internship" onChange={this.handleChange}/>
                </Grid>
              </Grid>
              
             
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="center"
                justify="center"
              > 
                <p className={classes.title}>Job Description</p>
                   
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                          },
                        }}

                        className={classes.textField}  
                      />
                      <p className={classes.limit}>Max 400 words</p>
              </Grid>
            </Grid>
            
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="center"
              justify="center"
              >
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="center"
                justify="center"
              > 
             
                    <p className={classes.title}>Job Requirement</p>
                    <TextField
                       multiline
                       rows={4}
                       variant="outlined"
                       fullWidth
                       InputProps={{
                         classes: {
                           root: classes.cssOutlinedInput,
                           focused: classes.cssFocused,
                           notchedOutline: classes.notchedOutline,
                         },
                       }}
                       className={classes.textField}  
                      />
                    <p className={classes.limit}>Max 400 words</p>
                    

              </Grid>
            </Grid>

          






          </Grid>
          </div>
            <DialogActions>
            <Button className={classes.button1} variant="contained" onClick={this.postJob}>Sumbit</Button> 
            </DialogActions>
          </Dialog>

        </div>
      </div>
    );
  }
}

Landing = withMyHook(Landing);
export default Landing;
