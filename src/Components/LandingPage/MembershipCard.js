import React, {Component} from "react";
import Membership from "../Images/membership.jpg";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  image: { 
    width: '100%',
    height: '250px',
    paddingBottom: '30px',
    objectFit: 'cover',
  },
  card: {
    height: '100%',
    backgroundColor: 'white',
    border: '1px solid black'
  },
  front_text: { 
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "28px",
    paddingBottom: '10px',
    color: 'white',
    textAlign: 'center',
    marginTop: '-200px'
  },

  small_text: { 
    fontFamily: "Montserrat",
    fontSize: "18px",
    fontWeight: '1',
    textAlign: 'left',
    marginLeft: '10%',
    marginRight: '10%',
    height: '200px',
    color: '#484848',
  },

  payment: { 
  borderRadius: '50%',
  width: '170px',
  height: '170px',
  padding: '10px',
  background: '#f7f7f7',
  color: 'white',
  textAlign: 'center',
  marginLeft: '80px',
  marginTop: '-20px',
  position: 'relative'
  },

  number: { 
   fontSize: '60px',
   marginTop: '30px'
    },

    month: { 
      fontSize: '20px',
      marginTop: '30px'
       },

  button: {
    textTransform: 'none',
    backgroundColor: "#f7f7f7",
    fontFamily: 'sans-serif',
    marginTop:"2%",
    marginBottom: '6%',
    borderRadius: 50,
    color: "black",
    width: '90%',
    maxWidth: '250px',
    '&:hover': {
        backgroundColor: "#F1F1F1",
        color: '#484848'
    },
    '@media (max-width: 480px)': {
      marginTop: '10%'
    },
  }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class MembershipCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div id="membership">
        <div className={classes.card}>
          <div>
          <img className={classes.image} src={Membership} alt="Membership"/>
          <h2 className={classes.front_text}>{this.props.front_text}</h2>
          <div className={classes.payment} style={this.props.payment}>
            <div className={classes.number}>{this.props.number}<span className={classes.month}> /m</span></div>
          </div>
          </div>
          <h2 className={classes.small_text}>{this.props.description}</h2>
          <Button className={classes.button} variant="contained" onClick={this.props.buttonFunction}><b>{this.props.buttonText}</b></Button>
        </div>
      </div>
    )
  }
}

MembershipCard = withMyHook(MembershipCard);
export default MembershipCard;
