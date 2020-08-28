import React, {Component} from "react";
import ReactCardFlip from 'react-card-flip';
import image from "../Images/features/image.png";
import tint from "../Images/features/tint2.png";
import {makeStyles} from "@material-ui/core/styles";
// TODO: Uncomment when images are available
import image7 from "../Images/features/image7.png";
import image8 from "../Images/features/image8.png";
import image9 from "../Images/features/image9.png";
import image10 from "../Images/features/image10.png";
import image11 from "../Images/features/image11.png";
import image12 from "../Images/features/image12.png";

const useStyles = makeStyles(theme => ({
  image: { 
    position: 'relative',
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px',
    height: '370px',
    width: '370px'
  },
  front_text: { 
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "30px",
    '@media (max-width: 500px)': {fontSize: '24px'},
    position: 'absolute',
    marginTop: '40%',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: 'white'
  },
  back_text: { 
    fontFamily: "Montserrat",
    fontSize: '20px',
    '@media (max-width: 500px)': {fontSize: '16px'},
    width: '100%',
    marginTop: '30%',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: 'white',
  },
  centered: {
    position: 'absolute',
    width: '100%',
    top: '0%',
  }
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
      isFlipped: false,
      images: [image7, image8, image9, image10, image11, image12]
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
        <div className={classes.image} onClick={this.handleClick} onMouseEnter={this.handleClick}>
          <img style={{width: '100%', height: '100%', opacity: '1', marginBottom: '-101%'}} src={tint} alt="Tint on front of feature card"/>
          <img style={{width: '100%', height: '100%', opacity: '0.2', objectFit: 'cover'}} src={this.state.images[this.props.card_number - 1]} alt="Front of feature card"/>
          <div className={classes.centered}>
            <h2 className={classes.front_text}>{this.props.front_text}</h2>
          </div>
        </div>
 
        <div className={classes.image} onClick={this.handleClick} onMouseLeave={this.handleClick}>
          <img style={{width: '100%', height: '100%', opacity: '1', marginBottom: '-101%'}} src={tint} alt="Tint on front of feature card"/>
          <img style={{width: '100%', height: '100%', opacity: '0.2', objectFit: 'cover'}} src={this.state.images[this.props.card_number - 1]} alt="Back of feature card"/>
          <div className={classes.centered}>
            <p className={classes.back_text}>{this.props.back_text}</p>
          </div>
        </div>
      </ReactCardFlip>
    )
  }
}

FeatureCard = withMyHook(FeatureCard);
export default FeatureCard;
