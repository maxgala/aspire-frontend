import React, {Component} from "react";
import { Button } from '@material-ui/core';
import SeniorExecImg from "../Images/seniorexec1.png";
import {makeStyles} from "@material-ui/core/styles";
import SeniorExecLargeHover from "../Images/SeniorExecLargeHover.png";

const useStyles = makeStyles(theme => ({
    sectionstyle: {
        width: "100vw",
        height: "100%",
        margin: '0',
        padding: '0'
    },
    overallposition: {
        position: 'relative'
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
    hovertext: {
        color: "black",
        // paddingRight: '30px,',
        margin: '10%',
        textAlign: 'center',
        position: 'absolute'
    }
}));


function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class SeniorExec extends Component{
    constructor(props) {
      super(props);
      this.state = {
        isHover: false,
        display_1: '',
        display_2: 'None'
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleImage = this.handleImage.bind(this);
    }

handleImage = event => {
    this.setState({
        display_1: '',
        display_2: 'None',
        text: ''
    });
}

handleClick = event => {
     //event.preventDefault();
        if (this.state.display2 === 'None'){
            this.setState({
                display2 : '',
                display1 : 'None',
                text:''
        });
        }
        else
        {
            this.setState({
            display2 : 'None',
            display1: '',
            text:'None'
        });
    }
}



    render() {
        const classes = this.props.classes;
        return(
            
             <div className={classes.overallposition} style={{backgroundColor: this.state.color}} >
                 <h3 className={classes.hovertext} style={{display: this.state.text}} onMouseEnter={this.handleClick} 
                 onMouseLeave={this.handleClick}>Hi</h3>
                <img style={{width: '100%', marginTop: '0vh', display: this.state.display1}} 
                onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}
                resizeMode="contain" src={SeniorExecImg} alt="Senior Exec"/>
                <img style={{width: '100%', marginTop: '0vh', display: this.state.display2}} 
                onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}  
                 resizeMode="contain" src={SeniorExecLargeHover} alt="Senior Exec"/>            
                 
         </div>
            
        );
    }
}

SeniorExec = withMyHook(SeniorExec);
export default SeniorExec;
