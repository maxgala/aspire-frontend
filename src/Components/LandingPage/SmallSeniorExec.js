import React, {Component} from "react";
import { Button } from '@material-ui/core';
import SmallSeniorExecImg from "../Images/small-senior-exec.png";
import {makeStyles} from "@material-ui/core/styles";
import MaxLogo from "../Images/max_logo.png";

const useStyles = makeStyles(theme => ({
    sectionstyle: {
        width: "100vw",
        height: "100%",
        margin: '0',
        padding: '0'
    },
    features_title: {
        top: '3182px',
        left: '135px',
        width: '728px',
        height: '98px',
        fontWeight: '500',
        fontSize: '36px',
        color: 'black',
        padding: '0'
      },
      subheading: {
        color: "black",
        // paddingRight: '30px,',
        top: '3292px',    
        marginLeft: '177px',
        width: '450px',
        height: '141px',
        textAlign: 'left'
    }
}));


function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class SmallSeniorExec extends Component {
    render() {
        const classes = this.props.classes;
        return(
            
             <div className={classes.sectionstyle}>
                <img style={{width: '90%', marginTop: '0vh'}}  
                 resizeMode="contain" src={SmallSeniorExecImg} alt="Senior Exec"/>            
                 
         </div>
            
        );
    }
}

SmallSeniorExec = withMyHook(SmallSeniorExec);
export default SmallSeniorExec;
