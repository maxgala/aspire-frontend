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
    height: '300px',
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
    color: 'black',
    textAlign: 'left',
    fontWeight: '100',
    fontFamily: 'Arial', 
    marginBottom: '5%',
    boxShadow: "0px 6px 6px #00000029",
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

  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
          <p>Community card</p>
      </div>
    )
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
