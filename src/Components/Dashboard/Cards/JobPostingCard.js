import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  card: {
    width: '80%',
    maxWidth: '300px',
    height: '140px',
    borderStyle: 'solid',
    marginBottom: '20px',
    borderRadius: '20px',
    color: '#6EA0B5'
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
        <h1>JOB TITLE</h1>
        <span>Company</span>
        <span>Location</span>
        <h3>Date posted</h3>
        <Button variant="contained" color="primary" >Apply</Button>
      </div>
    )
  }
}

JobPostingCard = withMyHook(JobPostingCard);
export default JobPostingCard;
