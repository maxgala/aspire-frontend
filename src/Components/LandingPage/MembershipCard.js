import React, {Component} from "react";
import AspiringProfessional from "../Images/aspiring_prof_membership.png";
import SeniorExecutive from "../Images/senior_exec_membership.png";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  image: { 
    width: '100%',
    height: '300px',
    paddingBottom: '30px',
  },
  card: {
    height: '100%',
    backgroundColor: '#F1F1F1'
  },
  front_text: { 
    fontSize: '24px',
    paddingBottom: '10px',
    color: 'black',
    textAlign: 'left',
    marginLeft : '10%'
  },
  small_text: { 
    textAlign: 'left',
    marginLeft: '10%',
    marginRight: '10%',
    fontSize: '15px',
    height: '200px',
  },
  button: {
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
    }
  }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class MembershipCard extends Component {
  constructor(props) {
    super(props);
    this.joinNow = this.joinNow.bind(this);
  }

  joinNow() {
    if (this.props.type === 'aspiring_professional') {
      console.log("Joining as an aspiring professional")
    } else if (this.props.type === 'senior_executive') {
      console.log("Joining as a senior executive")
    } else {
      console.log("Invalid membership type")
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.card}>
          <img className={classes.image} src={this.props.type === 'aspiring_professional' ? AspiringProfessional : SeniorExecutive} alt="Membership_im"/>
          <h2 className={classes.front_text}>{this.props.front_text}</h2>
          <h2 className={classes.small_text}>{this.props.description}</h2>
          <Button className={classes.button} variant="contained" onClick={this.joinNow}>Join Now</Button>
        </div>
      </div>
    )
  }
}

MembershipCard = withMyHook(MembershipCard);
export default MembershipCard;
