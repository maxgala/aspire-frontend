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

class SeniorExecs extends Component{
  render() {
    return (
      <div>
          <p>Senior Execs</p>
      </div>
    );
  }
}

SeniorExecs = withMyHook(SeniorExecs);
export default SeniorExecs;
