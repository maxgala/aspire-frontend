import React, {Component} from "react";
import AspiringProfessional from "../Images/aspiring_prof_membership.png";
import SeniorExecutive from "../Images/senior_exec_membership.png";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Registration from '../Registration/Registration';

const useStyles = makeStyles(theme => ({
  image: { 
    width: '100%',
    height: '300px',
    paddingBottom: '30px',
    objectFit: 'cover',
  },
  card: {
    height: '100%',
    backgroundColor: '#F1F1F1'
  },
  front_text: { 
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "30px",
    paddingBottom: '10px',
    color: 'black',
    textAlign: 'left',
    marginLeft : '10%'
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
  button: {
    textTransform: 'none',
    backgroundColor: "#6EA0B5",
    marginTop:"2%",
    marginBottom: '6%',
    borderRadius: 50,
    color: "white",
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
  changeToSignUp = (event) => {
    this.props.appContext.setState({
      currentScreen: <Registration appContext={this.props.appContext}/>
    })
  };

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.card}>
          <img className={classes.image} src={this.props.type === 'aspiring_professional' ? AspiringProfessional : SeniorExecutive} alt="Membership"/>
          <h2 className={classes.front_text}>{this.props.front_text}</h2>
          <h2 className={classes.small_text}>{this.props.description}</h2>
          <Button className={classes.button} variant="contained" onClick={this.changeToSignUp}>{this.props.buttonText}</Button>
        </div>
      </div>
    )
  }
}

MembershipCard = withMyHook(MembershipCard);
export default MembershipCard;
