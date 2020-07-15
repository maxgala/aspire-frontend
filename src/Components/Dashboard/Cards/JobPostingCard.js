import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    maxWidth: '300px',
    height: '180px',
    borderStyle: 'solid',
    marginBottom: '20px',
    borderRadius: '20px'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobPostingCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <p>JOB APPLICATION CARD</p>
      </div>
    )
  }
}

JobPostingCard = withMyHook(JobPostingCard);
export default JobPostingCard;
