import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import JobPostingCard from "./Cards/JobPostingCard"


const useStyles = makeStyles(() => ({
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Jobs extends Component {
  render() {
    return (
      <div>
        <p>JOBS PAGE</p>
        <JobPostingCard/>
      </div>
    )
  }
}

Jobs = withMyHook(Jobs);
export default Jobs;
