import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import image from "../../Images/faceShot/pic1.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(() => ({
  cardOne: {
    width: '95%',
    maxWidth: '500px',
    margin: 'auto',
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    textAlign: 'left',
    backgroundColor: '#B5A165',
    color: 'white',
  },
  cardFour: {
    width: '95%',
    maxWidth: '500px',
    margin: 'auto',
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    textAlign: 'left',
    backgroundColor: '#455E6A',
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
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: 'auto',
    marginTop: '40px',
    marginLeft: '10px',
    marginRight: '20px',
    display: 'inline-block'
  },
  title: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bolder',
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    paddingTop: '10px',
    fontSize: '20px',
    color: 'white'
  },
  subtitle: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    color: 'white'
  },
  name: {
    fontStyle: 'italic',
    paddingRight: '5px'
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
    fontSize: '10px',
    color: 'white',
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
  button: {
    fontSize: '8px',
    position: 'absolute',
    fontWeight: '400',
    borderRadius: 50,
    backgroundColor :'white',
    color: '#58595B',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  tag: {
    width: '60px',
    float: 'left',
    borderStyle: 'solid',
    fontSize: '8px',
    fontWeight: '100',
    color: 'white',
    borderWidth: '0.5px',
    borderRadius: 50,
    marginRight: '2%',
    borderColor: 'white',
    display: 'flex',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '0.5%',
    paddingBottom: '0.5%',
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class CoffeeChatCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={this.props.booked ? classes.cardBooked : this.props.oneOnOneCard ? classes.cardOne : classes.cardFour}>
        <img className={classes.image} src={image} alt={"Coffee Chat Card"}/>
        <div style={{width: 'calc(95% - 120px)', display: 'inline-block', transform: 'translate(0%, -60%)',}}>
          <Grid
            container
            item xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="center"
            style={{height: '180px'}}
          >
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <h1 className={classes.title}>
                {this.props.oneOnOneCard ? "One-on-One" : "Four-on-One"}
                {this.props.booked ? <span className={classes.booked}>booked</span> : ''}
              </h1>
              <p className={classes.subtitle}><span className={classes.name}>Yusuf H</span> Finance Professional</p>
              <span className={classes.subtitle}><span><FontAwesomeIcon icon={faBuilding} style={{width: '18px', height: '18px', marginRight: '15px'}}/></span>TD</span>
            </Grid>
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <span className={classes.tag}>Marketing</span>
              <span className={classes.tag}>Software</span>
            </Grid>
            <Grid
              container
              item xs={8}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <hr style={{width: '120px', textAlign:'right', marginLeft: '0%', marginTop:'1%', marginBottom: '5px' , height: 1, paddingBottom:'0'}}></hr>
            </Grid>
            <Grid
              container
              item xs={4}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Button className={classes.button} variant="contained" color="primary" >View Booking</Button>
            </Grid>
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <div><span className={classes.date}>Available: July 10th, 2020</span></div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

CoffeeChatCard = withMyHook(CoffeeChatCard);
export default CoffeeChatCard;
