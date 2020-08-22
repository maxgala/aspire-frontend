import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({

}));


function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Escalations extends Component{
  render() {
    const classes = this.props.classes;
    
    return (
      <div>
          <p>Escalations</p>
      </div>
    );
  }
}

Escalations = withMyHook(Escalations);
export default Escalations;
