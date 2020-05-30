import React, {Component} from "react";
import ReactCardFlip from 'react-card-flip';
import CardFront from "../Images/feature_card_front.png";
import CardBack from "../Images/feature_card_back.png";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: { 
    position: 'relative',
    textAlign: 'center',
    margin: '10px',
  },
  front_text: { 
    position: 'absolute',
    marginTop: '30%',
    fontSize: '24px',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: 'white',
  },
  small_text: { 
    position: 'absolute',
    marginTop: '60%',
    fontSize: '12px',
    width: '100%',
    color: 'white',
  },
  back_text: { 
    position: 'absolute',
    top: '40%',
    transform: 'translate(0%, -50%)',
    fontSize: '20px',
    width: '100%',
    paddingLeft: '15px',
    paddingRight: '15px',
    color: 'black',
  },
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class FeatureCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }
  
  render() {
    const classes = this.props.classes;
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <div className={classes.image} onClick={this.handleClick}>
          <h2 className={classes.front_text}>{this.props.front_text}</h2>
          <p className={classes.small_text}>more text on the flip side</p>
          <img style={{width: '100%', height: '100%'}} src={CardFront} alt="Front of feature card"/>
        </div>
 
        <div className={classes.image} onClick={this.handleClick}>
          <p className={classes.back_text}>{this.props.back_text}</p>
          <img style={{width: '100%', height: '100%'}} src={CardBack} alt="Back of feature card"/>
        </div>
      </ReactCardFlip>
    )
  }
}

FeatureCard = withMyHook(FeatureCard);
export default FeatureCard;
