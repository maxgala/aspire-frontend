import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    maxWidth: '400px',
    height: '200px',
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
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <p>Resume bank card</p>
      </div>
    )
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
