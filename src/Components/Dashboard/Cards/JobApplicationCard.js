import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(() => ({
  card: {
    width: '90%',
    maxWidth: '400px',
    height: '180px',
    borderStyle: 'solid',
    borderRadius: '20px',
    backgroundColor: '#6EA0B5',
    color: 'white',
    borderColor: '#6EA0B5',
    textAlign: 'left',
    fontWeight: '100',
    fontFamily: 'Arial', 
    marginBottom: '5%',
    boxShadow: "0px 6px 6px #00000029",
  },
  jobTitle:{
    marginLeft: '10%',
    fontSize: '19px',
    marginTop:'15px',
    fontWeight: '100',
    marginBottom: '1%',
  },
  text2:{
    fontSize: '12px',
    marginLeft: '2%',
    marginTop:'10px',
    fontWeight: '100',
  },
  text3:{
    fontSize: '12px',
    marginLeft: '7%',
    marginTop:'10px',
    fontWeight: '100',
    flexDirection:'row'
  },
  text4:{
    marginLeft: '18%',
    marginTop: '10%',
    fontSize: '10px',
    fontWeight: '100',
    float: 'left',  
  },

  button: {
    fontSize: '10px',
    position: 'absolute',
    fontWeight: '400',
    borderRadius: 50,
    backgroundColor :'white',
    color: '#58595B',
    display: 'flex',
    marginTop: '10px',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingTop: '0.5%',
    paddingBottom: '0.5%',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
  }
  },
  tag: {
    float: 'left',
    borderStyle: 'solid',
    fontSize: '7px',
    fontWeight: '100',
    color: 'white',
    borderWidth: '0.5px',
    borderRadius: 50,
    marginLeft: '15%',
    marginTop: '20px',
    borderColor: 'white',
    display: 'flex',
    paddingLeft: '3%',
    paddingRight: '3%',
    
  },
  largetext:{
    color: 'black',
    textAlign:'left',
    marginLeft:'20px',
    fontWeight: '100'

  },
  descrip: {
    textAlign: 'left',
    marginLeft:'20px',
    marginRight: '50px',
    fontWeight: '100',
    fontSize: '15px'
  },
  header: {
    textAlign: 'left',
    marginLeft:'20px',
    fontWeight: '100',
    fontSize: '18px'
  },
  writeup: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '100',
  },
  translate: {
    transform: 'translate(0%, 0%)',
  },
  close: {
    float: 'right',
  
  },
  jobtitle: {
    fontSize: '30px',
    marginLeft: '10px',
    marginTop: '4%',
    color: '#000000'
  },
  textpopup:{
    fontSize: '15px',
    marginTop:'66px',
    fontWeight: '100',
    marginRight: '16%'
  },
  textpopup2:{
    fontSize: '15px',
    marginLeft: '4%',
    marginRight: '16%',
    marginTop:'6px',
    fontWeight: '100',
  },
  tagpopup: {
    float: 'left',
    borderStyle: 'solid',
    fontSize: '12px',
    fontWeight: '100',
    color: 'black',
    borderWidth: '0.5px',
    borderRadius: 50,
    marginLeft:'4%',
    marginTop: '1%',
    borderColor: 'black',
    display: 'flex',
    paddingLeft: '3%',
    paddingRight: '3%',
    
  },
  button2:{
    marginLeft: '3%',
    color: 'grey'
  },
  divStyle:{
    height:"20px"
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobApplicationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  openMemberships = (event) => {
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
      <div className={classes.card}>
          <Grid
            container
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
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              > 
               <h1 className={classes.jobTitle}>Software Developer</h1>
              </Grid>
            </Grid>
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item xs={2}
                spacing={1}
                alignItems="flex-end"
                justify="flex-end"
              > 
              <span><FontAwesomeIcon icon={faBuilding} style={{width: '9px', height: '9px', marginRight: '10%', marginTop:'13px',}}/></span>
               
              </Grid>
              <Grid
                container
                item xs={10}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              > 
               <span className={classes.text2}>Google</span>
               <span className={classes.text3}>Toronto, ON</span>
              </Grid>
              
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={12}
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                > 
                  <hr style={{width: '40%', textAlign:'right', marginLeft: '10%', marginTop:'30px', marginBottom: '0' , height: 1, paddingBottom:'0'}}></hr>
        
                </Grid>
              </Grid>
        
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={7}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                > 
                  <span className={classes.text4}>Posted Jan 5, 2020</span>
                </Grid>
                <Grid
                  container
                  item xs={5}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                > 
                <div className={classes.divStyle}>
                  <Button className={classes.button} onClick={this.openMemberships} variant="contained" color="primary" >View Job</Button>
                </div>
                </Grid>
              </Grid>
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item xs={4}
                spacing={1}
                alignItems="center"
                justify="center"
              > 
           <div className={classes.divStyle}>
                <span className={classes.tag}>Marketing</span>
                </div>
              </Grid>
              <Grid
                container
                item xs={8}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              > 
      <div className={classes.divStyle}>
                <span className={classes.tag}>Software</span>
              </div>
              </Grid>
            </Grid>
          </Grid>
   
   
   
      <Dialog
        className={classes.translate}
          open={this.state.open}
          onClose={this.handleClose}
          // scroll={"paper"}
          fullWidth={true}
          maxWidth={'sm'}
        >
          <DialogTitle id="scroll-dialog-title">
            <div className={classes.back}>
              <span className={classes.jobtitle}>Job Title</span>
              <span onClick={this.handleClose} className={classes.close} ><span><FontAwesomeIcon icon={faTimes} style={{width: '14px', height: '14px', marginRight: '1%', marginBottom:'15%'}}/></span></span>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              component={'span'}
            >
              <span className={classes.textpopup}><span><FontAwesomeIcon icon={faBuilding} style={{width: '15px', height: '15px', marginRight: '1%', marginLeft : '2%'}}/></span>Google</span>
              <span className={classes.textpopup2}>Toronto, ON</span>
              <span className={classes.textpopup2}>Full Time</span>                    
              <h2 className={classes.header}>Job Description:</h2>
              <h2 className={classes.descrip}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Non odio euismod lacinia at quis risus sed vulputate. Nulla facilisi cras fermentum odio</h2>
              <h2 className={classes.header}>Job Requirements:</h2>
              <h2 className={classes.descrip}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Non odio euismod lacinia at quis risus sed vulputate. Nulla facilisi cras fermentum odio</h2>
              <span className={classes.tagpopup}>Marketing</span>
              <span className={classes.tagpopup}>Software</span>
              <span><Button className={classes.button2}> Apply </Button></span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>    
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
