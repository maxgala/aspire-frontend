import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";


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
      extratext: {
        color: "white",
        fontSize: '18px',
        fontWeight: '100',
        textAlign: 'center',
        position: 'absolute',
        marginTop: '100%',
        width : '100%',
    },
    hovertext: {
        color: "white",
        // padding: '30px,',
        fontSize: '24px',
        
        marginTop: '75%',
        textAlign: 'center',
        position: 'absolute',
        width : '100%',
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
        display1: '',
        display2: 'None',
        text: 'None'
      };
     
    }

handleImage = event => {
    this.setState({
        display_1: '',
        display_2: 'None',
        text: ''
    });
}



handleEnter = event => {
     //event.preventDefault();
        this.setState({
            display2 : '',
            display1 : 'None',
            text:''
        });
        
    }


handleExit = event => {
    //event.preventDefault();
           
           this.setState({
           display2 : 'None',
           display1: '',
           text:'None'
       });
   }




    render() {
        const classes = this.props.classes;
        
        return(
            
             <div className={classes.overallposition} style={{backgroundColor: this.state.color}} >
                 
                <h3 className={classes.hovertext} style={{display: this.state.text}} onMouseEnter={this.handleEnter} 
                 onMouseLeave={this.handleExit}>{this.props.name_text}</h3>
                <h3 className={classes.extratext} style={{display: this.state.text}} onMouseEnter={this.handleEnter} 
                 onMouseLeave={this.handleExit}>{this.props.extra_text}</h3>
                
                <img style={{width: '100%', marginTop: '0vh', display: this.state.display1, borderTopLeftRadius: '20%', borderBottomRightRadius: '20%'}} 
                onMouseEnter={this.handleEnter}
                resizeMode="contain" src={this.props.image} alt="Senior Exec"/>
                
                <img style={{width: '100%', marginTop: '0vh', display: this.state.display2, borderTopLeftRadius: '20%', borderBottomRightRadius: '20%'}} 
                onMouseLeave={this.handleExit}  
                 resizeMode="contain" src={this.props.hover_image} alt="Senior Exec" />            
                 
         </div>
            
        );
    }
}

SeniorExec = withMyHook(SeniorExec);
export default SeniorExec;
