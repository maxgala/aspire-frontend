import React, {Component} from "react";
import ReactCardFlip from 'react-card-flip';
import CardFront from "../Images/feature_card_front.png";
import CardBack from "../Images/feature_card_back.png";
import image1 from "../Images/features/image1.png";
import image2 from "../Images/features/image2.png";
import image3 from "../Images/features/image3.png";
import image4 from "../Images/features/image4.png";
import image5 from "../Images/features/image5.png";
import image6 from "../Images/features/image6.png";
import fimage1 from "../Images/features/fimage1.png";
import fimage2 from "../Images/features/fimage2.png";
import fimage3 from "../Images/features/fimage3.png";
import fimage4 from "../Images/features/fimage4.png";
import fimage5 from "../Images/features/fimage5.png";
import fimage6 from "../Images/features/fimage6.png";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: { 
    position: 'relative',
    textAlign: 'center',
    margin: '10px',
  },
  front_text: { 
    position: 'absolute',
    marginTop: '25%',
    fontSize: '30px',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: 'white'
  },
  small_text: { 
    position: 'absolute',
    marginTop: '75%',
    fontSize: '16px',
    width: '100%',
    color: 'white'
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
      images: [image1, image2, image3, image4, image5, image6],
      fimages: [fimage1, fimage2, fimage3, fimage4, fimage5, fimage6],
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
        <div className={classes.image} onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}>
          <h2 className={classes.front_text}>{this.props.front_text}</h2>
          <p className={classes.small_text}>more text on the flip side</p>
          <img style={{width: '100%'}} src={this.state.fimages[this.props.card_number - 1]} alt="Front of feature card"/>
        </div>
 
        <div className={classes.image} onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}>
          <p className={classes.back_text}>{this.props.back_text}</p>
          <img style={{width: '100%'}} src={this.state.images[this.props.card_number - 1]} alt="Back of feature card"/>
        </div>
      </ReactCardFlip>
    )
  }
}

FeatureCard = withMyHook(FeatureCard);
export default FeatureCard;
