import React, {Component} from "react";
import { Button } from '@material-ui/core';
import SeniorExecImg from "../Images/seniorexec1.png";
import {makeStyles} from "@material-ui/core/styles";
import MaxLogo from "../Images/max_logo.png";

const useStyles = makeStyles(theme => ({
    
    features_title: {
        fontWeight: '500',
        fontSize: '35px',
        color: 'black',
        padding: '0',
        textAlign : 'left',
        margin: '5px',
        paddingTop: '5%'
      },
      subheading: {
        color: "black",
        paddingLeft: '1%',
        
        textAlign: 'left',
        fontSize: '22px',
        fontWeight: '100',
        margin: '0'
    },
    button: {
        backgroundColor: "#6EA0B5",
        width: '30%',
        display: 'flex',
        marginRight: 'auto',
        marginTop:"2%",
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    total: {
       
    
    }
}));


function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class SeniorExecText extends Component {
    render() {
        const classes = this.props.classes;
        return(
            
             <div className={classes.total}>
                <h1 className={classes.features_title}> Our Senior Executives</h1>
                
                <h3 className={classes.subheading}>We have over 100 senior executives 
                available on our platform. Book an exclusive coffee chat with one 
                of them today!</h3>           
                <Button className={classes.button} variant="contained">Join Now</Button>
                 
         </div>
            
        );
    }
}

SeniorExecText = withMyHook(SeniorExecText);
export default SeniorExecText;