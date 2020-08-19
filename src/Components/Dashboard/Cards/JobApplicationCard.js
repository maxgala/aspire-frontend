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
import Moment from 'react-moment';
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";

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
    marginLeft: '15%',
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
    color: 'white',
    borderWidth: '0.5px',
    borderRadius: 50,
    marginLeft: '15%',
    marginTop: '20px',
    borderColor: 'white',
    display: 'flex',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '3px',
    paddingBottom: '3px',
    left: '15px',
    right: '15px',
    fontSize: '8px',
    fontWeight: '100',
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
    paddingLeft: '15%',
    marginTop: '4%',
    color: '#000000'
  },
  textpopup:{
    fontSize: '15px',
    marginTop:'8%',
    fontWeight: '100',
  },
  textpopup2:{
    fontSize: '15px',
    marginLeft: '4%',
    marginTop:'8%',
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
  },
  closes:{
    position: 'absolute',
    right:'5%',   
  },
  toolbar: {
    height: '8vh',
    backgroundColor: 'black',
    boxShadow: '0px 0px 0px',
    width: '100%',
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
      open: false,
      data: {
        city: 'loading',
        region: 'loading',
        company: '',
        job_type: '',
        description: '',
        requirements: '',
        tags: []
      }
    }
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
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
    Moment.globalFormat = 'MMM DD, YYYY';
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
               <h1 className={classes.jobTitle}>{this.state.data && this.state.data.title}</h1>
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
               <span className={classes.text2}>{this.state.data && this.state.data.company}</span>
               <span className={classes.text3}>{this.state.data && this.state.data.city}, {this.state.data && this.state.data.region}</span>
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
                  <span className={classes.text4}>Posted <Moment unix>{this.state.data && this.state.data.created_on}</Moment></span>
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
              {this.state.data && this.state.data.job_tags && this.state.data.job_tags.map((tag, key) => (
                <Grid
                  key={key}
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="center"
                  justify="center"
                > 
                  <div className={classes.divStyle}>
                    <span className={classes.tag}>{tag}</span>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>

      <Dialog
        className={classes.translate}
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
                <h2 style={{margin: '0px', marginTop: '10px', color: 'white' }}>Job Title</h2>
                
              </div>
              <img onClick={this.handleClose} className={classes.closes} style={{width: '14px', height: '14px', cursor: 'pointer'}} src={close} alt="Close button"/>
            </Toolbar>
          
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              component={'span'}
            >
            <Grid
              container
              item xs={12}
              spacing={0}
              alignItems="space-around"
              justify="space-around"
              style={{marginBottom:'15px', marginTop: '10px'}}
            > 
              <Grid
                container
                item xs={3}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                >
                  <span className={classes.textpopup}><span style={{marginLeft:'5px'}}><FontAwesomeIcon icon={faBuilding} 
                  style={{width: '15px', height: '15px', margin: '0px'}}/>
                  </span>{this.state.data && this.state.data.company}
                  </span>
                  
              </Grid>
              <Grid
                container
                item xs={3}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                >
                  <span className={classes.textpopup2}>
                  {this.state.data && this.state.data.city},
                  {this.state.data && this.state.data.region}
                   </span>

              </Grid>
              <Grid
                container
                item xs={3}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                >
                  <span className={classes.textpopup2}>
                    {this.state.data && this.state.data.job_type}
                  </span>                    

              </Grid>
            </Grid>

            <Grid
                container
                item xs={10}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                >
              
              <h2 className={classes.header}>Job Description:</h2>
              <h2 className={classes.descrip}>{this.state.data && this.state.data.description}</h2>
                                    
              </Grid>

              <Grid
                container
                item xs={10}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
                >
              <h2 className={classes.header}>Job Requirements:</h2>
              <h2 className={classes.descrip}>{this.state.data && this.state.data.requirements}</h2>
              {this.state.data && this.state.data.job_tags && this.state.data.job_tags.map((tag, key) => (
                <span key={key} className={classes.tagpopup}>{tag}</span>
              ))}                    
              </Grid>

              <Grid
                container
                item xs={12}
                spacing={0}
                alignItems="space-around"
                justify="space-around"
                >
              <DialogActions>
              <Button className={classes.button1} variant="contained" onClick={this.applyJob}>Apply</Button> 
              </DialogActions>
              </Grid>

              
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

