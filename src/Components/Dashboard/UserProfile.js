import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    left: '0',
    position: 'fixed'
  },
}));

// writing a hook just to incorporate the CSS defined outside under classes
// feel free to use this function in any other function
function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Landing extends Component{
  render() {
    const classes = this.props.classes;
    
    return (
      <div className={classes.root}>
        <p> USER PROFILE SECTION </p>
      </div>
    );
  }
}

Landing = withMyHook(Landing);
export default Landing;
