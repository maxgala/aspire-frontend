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
        <div style={{width: '300px', height: '140px', borderStyle: 'solid', marginBottom: '20px'}}>
          <p>JOB APPLICATION CARD</p>
        </div>
      </div>
    )
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
