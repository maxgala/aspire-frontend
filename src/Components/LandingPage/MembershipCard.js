import React, {Component} from "react";
import Mainback from "../Images/max-mainimg.jpg";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  image: { 
    position: 'relative',
    textAlign: 'center',
    height: '70%'
  },
  card: {
    height: '100%',
    backgroundColor: '#F1F1F1'
  },
  front_text: { 
    fontSize: '21px',
    color: 'black',
    textAlign: 'left',
    marginLeft : '6%'
  },
  small_text: { 
    textAlign: 'left',
    marginLeft: '6%',
    fontSize: '15px'
  },
  button: {
    backgroundColor: "#6EA0B5",
    marginTop:"2%",
    marginBottom: '8%',
    borderRadius: 50,
    color: "white",
    width: '90%',
    '&:hover': {
        backgroundColor: "#F1F1F1",
        color: '#484848'
    }
},
  line: {
    width: '60%',
    marginBottom: '10%'
  }
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class MembershipCard extends Component{
  
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.card}>
          <img style={{width: '100%', height: '200px'}} src={Mainback} alt="Membership Image"/>
          <h2 className={classes.front_text}>{this.props.front_text}</h2>
          <h2 className={classes.small_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
          <Button className={classes.button} variant="contained">Join Now</Button>
        </div>
      </div>
    )
  }
}

MembershipCard = withMyHook(MembershipCard);
export default MembershipCard;