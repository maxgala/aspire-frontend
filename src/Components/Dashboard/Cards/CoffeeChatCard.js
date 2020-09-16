import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import image from "../../Images/faceShot/pic1.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChatTypes from '../ChatTypes';
//pop up
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";

const useStyles = makeStyles(() => ({
  cardOne: {
    width: '95%',
    maxWidth: '500px',
    marginLeft:"5px",
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    textAlign: 'left',
    backgroundColor: '#B5A165',
    color: 'white',
    boxShadow: "0px 6px 6px #00000029",
  },
  cardFour: {
    width: '95%',
    maxWidth: '500px',
    marginLeft:"5px",
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    textAlign: 'left',
    backgroundColor: '#455E6A',
    color: 'white',
    boxShadow: "0px 6px 6px #00000029",
  },
  cardInterview: {
    width: '95%',
    maxWidth: '500px',
    margin: 'auto',
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    textAlign: 'left',
    // need designs for mock interview card
    backgroundColor: 'red',
    color: 'white',
  },
  cardBooked: {
    width: '95%',
    maxWidth: '500px',
    margin: 'auto',
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    textAlign: 'left',
    backgroundColor: '#9D9D9D',
    color: 'white',
  },
  image:{
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    margin: 'auto',
    marginTop: '30px',
    marginLeft: '10px',
    marginRight: '20px',
    display: 'inline-block'
  },
  image2:{
    width: '225px',
    height: '225px',
    borderRadius: '50%',
    margin: 'auto',
    marginTop: '30px',
    marginLeft: '20px',
    marginRight: '20px',
    display: 'inline-block'
  },
  title: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bolder',
    width: '100%',
    textAlign: 'left',
    paddingTop: '5px',
    fontSize: '20px',
    color: 'white',
    margin: '0px',
    marginLeft: '5px',
    marginTop: '5px'
  },
  title2: {
    fontFamily: 'myriad-pro, sans-serif',
    fontSize: '30px',
    width: '100%',
    textAlign: 'left',
    paddingTop: '5px',
    color: '#7D7D7D',
    margin: '0px',
    marginLeft: '5px',
    marginTop: '15px'
  },
  subtitle: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    color: 'white',
    margin: '0px',
    marginLeft: '5px',
    marginTop: '5px'
  },
  subtitle2: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    color: 'black',
    margin: '0px',
    marginLeft: '5px',
    marginTop: '5px'
  },
  name: {
    fontStyle: 'italic',
    paddingRight: '5px',
    margin: '0px',
    marginTop: '5px'
  },
  company: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    color: 'white'
  },
  date: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    fontSize: '15px',
    color: 'white',
    margin: '0px',
    float: 'left'
  },
  date2: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    fontSize: '15px',
    color: 'black',
    margin: '0px',
    float: 'left'
  },
  credits: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    fontSize: '22px',
    textAlign: 'left',
    color: '#B6A165',
    margin: '0px',
    float: 'left'
  },
  booked: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    textAlign: 'right',
    margin: '5px',
    paddingTop: '5px',
    fontSize: '8px',
    color: 'white',
    float: 'right'
  },
  booked2: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    textAlign: 'right',
    margin: '5px',
    paddingTop: '5px',
    fontSize: '8px',
    color: 'black',
    float: 'right'
  },
  button_container: {
    alignItems: 'flex-end',
    justify: 'flex-end',
  },
  button: {
    fontSize: '8px',
    fontWeight: '400',
    borderRadius: 50,
    backgroundColor :'white',
    color: '#58595B',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  tag_container: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: '0.5px',
    borderRadius: 50,
    borderColor: 'white',
    margin: '5px',
    marginLeft: '0px'
  },
  tag: {
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '3px',
    paddingBottom: '3px',
    left: '15px',
    right: '15px',
    float: 'left',
    fontSize: '8px',
    fontWeight: '100',
    color: 'white',
    display: 'flex',
  },
  bar: {
    width: '90%',
    textAlign:'right',
    marginLeft: '0%',
    marginTop: '1%',
    marginBottom: '1%',
    height: 1,
    paddingBottom:'0'
  },
  container: {
    width: 'calc(95% - 140px)',
    display: 'inline-block',
    transform: 'translate(0%, -65%)'
  },
  company_icon: {
    width: '18px',
    height: '18px',
    marginRight: '15px'
  },
  outer_grid: {
    height: '180px'
  },
  toolbar: {
    height: '8vh',
    backgroundColor: '#455E6A',
    boxShadow: '0px 0px 0px',
    width: '100%',
  },
  closes:{
    position: 'absolute',
    right:'5%',   
  },
  button2: {
    textTransform: 'none',
    backgroundColor: "#000000",
    marginBottom:"2%",
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
    paddingLeft: '50px',
    paddingRight: '50px'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class CoffeeChatCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: {
        city: '',
        region: '',
        company: '',
        chat_type: '',
        chat_status:'',
        description: '',
        credits: '',
        title: '',
        booked: false,
        senior_executive: '',
        tags: []
      }
    }
  }
  
  // handleChange3 = date => {
  //     this.setState({
  //       startDate: date
  //     });
  // };
    
  handleClose = event =>{
    this.setState({
      open: false
    })
  };

  openCoffeeChat = (event) => {
    this.setState({
      open: true
    })
  };

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }


  render() {

    const classes = this.props.classes;
    
    return (

      <div className={this.state.data.chat_status === "ChatStatus.RESERVED" ? classes.cardBooked : this.props.data.chat_type === ChatTypes.oneOnOne ? classes.cardOne : this.props.data.chat_type === ChatTypes.fourOnOne ? classes.cardFour : classes.cardInterview}>
        {/* need to get image from s3 bucket --  */}
        <img className={classes.image} src={image} alt={"Coffee Chat Card"}/>
        <div className={classes.container}>
          <Grid
            container
            item xs={12}
            spacing={0}
            alignItems="center"
            justify="flex-start"
            className={classes.outer_grid}
          >
            <Grid
              container
              item xs={12}
              spacing={0}
              alignItems="flex-start"
              justify="flex-start"
            >
              <h1 className={classes.title}>
                {this.state.data.chat_type === ChatTypes.oneOnOne ? "One-on-One" : this.state.data.chat_type === ChatTypes.fourOnOne ? "Four-on-One" : "Mock Interview"}
                {this.state.data.chat_status === "ChatStatus.PENDING" ? <span className={classes.booked}> booked </span> : ''}
              </h1>
              <p className={classes.subtitle}><span className={classes.name}>{this.state.data.senior_executive}</span> {this.props.data.title}</p>
              <span className={classes.subtitle}><span><FontAwesomeIcon icon={faBuilding} className={classes.company_icon}/></span> Random Company</span>
              
              {this.state.data && this.state.data.chat_tags && this.state.data.chat_tags.map((tag, key) => (
                      <span key={key}  className={classes.tag_container}><span className={classes.tag}>{tag}</span></span>
                    ))}    
              

            </Grid>
            <Grid
              container
              item xs={8}
              spacing={0}
              alignItems="flex-start"
              justify="flex-start"
            >
              <hr className={classes.bar}></hr>
              <span className={classes.date}>Available: {this.state.data.date}</span>
            </Grid>
            <Grid
              container
              item xs={4}
              spacing={0}
              alignItems="flex-start"
              justify="flex-start"
            >
              <span className={classes.button_container}><Button  onClick={this.openCoffeeChat} className={classes.button} variant="contained" color="primary">View Booking</Button></span>
            </Grid>
          </Grid>
        </div>


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
              <h2 style={{margin: '0px', marginTop: '10px', color: 'white' }}>Register for a Coffee Chat</h2>
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
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={4}
                  spacing={0}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <img className={classes.image2} src={image} alt={"Coffee Chat Card"}/>
                </Grid>
              
                <Grid
                  container
                  item xs={8}
                  spacing={0}
                  alignItems="center"
                  justify="flex-start"
                  className={classes.outer_grid}
                >
                  <Grid
                    container
                    item xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <h1 className={classes.title2}>
                    {this.state.data.chat_type === ChatTypes.oneOnOne ? "One-on-One" : this.state.data.chat_type === ChatTypes.fourOnOne ? "Four-on-One" : "Mock Interview"}
                {this.state.data.booked ? <span className={classes.booked}>booked</span> : ''} with&nbsp;
                      <span className={classes.name2}>{this.state.data.senior_executive}</span>
                    </h1>
                  </Grid>
                  <Grid
                    container
                    item xs={6}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.subtitle2}><span>{this.state.data.senior_executive} @ </span>{this.state.data.company} Random Company</span>
                  
                  </Grid>
                  <Grid
                    container
                    item xs={6}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.subtitle2}>{this.state.data.available}</span>
                  </Grid>
                  <Grid
                    container
                    item xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.date2}>{this.state.data.description}</span>
                  </Grid>
                  <Grid
                    container
                    item xs={5}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <span className={classes.credits}>{this.state.data.credits} Credits</span>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item xs={12}
                spacing={0}
                alignItems="space-around"
                justify="flex-end"
              >
                <DialogActions style={{marginRight: '5%'}}>
                  <Button className={classes.button2} variant="contained" onClick={this.applyJob}>Register</Button> 
                </DialogActions>
              </Grid>             
            </DialogContentText>
          </DialogContent>
          
        </Dialog>
      </div>
    )
  }
}

CoffeeChatCard = withMyHook(CoffeeChatCard);
export default CoffeeChatCard;
