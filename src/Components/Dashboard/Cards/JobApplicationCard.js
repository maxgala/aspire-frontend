import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
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
      <div>
        <div>
          <p>JOB APPLICATION CARD</p>
        </div>
      </div>
    )
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
