import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    sectionstyle: {
        width: "100vw",
        height: "100%",
        margin: '0',
        padding: '0'
    },
      extratext: {
        color: "white",
        textAlign: 'center',
        position: 'absolute',
        fontSize: '18px',
        fontWeight: '100',
        
        marginTop: '14%',
        width : '23%',
    },
    hovertext: {
        color: "white",
        fontSize: '24px',
        width : '23%',
        marginTop: '8%',
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

class SmallSeniorExecBottom extends Component {

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
          this.setState({
              display2 : '',
              display1 : 'None',
              text:''
          });
          
      }
  
  
  handleExit = event => {
             this.setState({
             display2 : 'None',
             display1: '',
             text:'None'
         });
     }
  
  
  
    render() {
        const classes = this.props.classes;
        return(
            
             <div className={classes.sectionstyle}>
                           
            

                <h3 className={classes.hovertext} style={{display: this.state.text}} onMouseEnter={this.handleEnter} 
                 onMouseLeave={this.handleExit}>{this.props.name_text}</h3>
                <h3 className={classes.extratext} style={{display: this.state.text}} onMouseEnter={this.handleEnter} 
                 onMouseLeave={this.handleExit}>{this.props.extra_text}</h3>
                
                <img style={{width: '100%', marginTop: '0vh', marginBottom:'4vh', display: this.state.display1, borderTopRightRadius: '30%', borderBottomLeftRadius: '30%'}} 
                onMouseEnter={this.handleEnter} src={this.props.image} alt="Senior Exec"/>
                
                <img style={{width: '100%', marginTop: '0vh', marginBottom:'4vh', display: this.state.display2, borderTopRightRadius: '30%', borderBottomLeftRadius: '30%'}} 
                onMouseLeave={this.handleExit} src={this.props.hover_image} alt="Senior Exec" /> 
         </div>
            
        );
    }
}

SmallSeniorExecBottom = withMyHook(SmallSeniorExecBottom);
export default SmallSeniorExecBottom;
