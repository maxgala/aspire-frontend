import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

}));


function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobPosts extends Component{
  render() {
    return (
      <div>
          <p>Job Posts</p>
      </div>
    );
  }
}

JobPosts = withMyHook(JobPosts);
export default JobPosts;
