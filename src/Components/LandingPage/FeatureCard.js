import React, {Component} from "react";
import ReactCardFlip from 'react-card-flip';
import image from "../Images/features/image.png";
import tint from "../Images/features/tint2.png";
import {makeStyles} from "@material-ui/core/styles";
// TODO: Uncomment when images are available
// import image1 from "../Images/features/image1.png";
// import image2 from "../Images/features/image2.png";
// import image3 from "../Images/features/image3.png";
// import image4 from "../Images/features/image4.png";
// import image5 from "../Images/features/image5.png";
// import image6 from "../Images/features/image6.png";

const useStyles = makeStyles(theme => ({
  image: { 
    position: 'relative',
    textAlign: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  front_text: { 
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "30px",
    position: 'absolute',
    marginTop: '25%',
    width: '100%',
    paddingLeft: '20px',
    paddingRight: '20px',
    color: 'white'
  },
  small_text: { 
    fontFamily: "Montserrat",
    fontSize: "18px",
    position: 'absolute',
    marginTop: '75%',
    width: '100%',
    color: 'white',
  },
  back_text: { 
    fontFamily: "Montserrat",
    fontSize: '20px',
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
      images: [image, image, image, image, image, image]
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
          <img style={{width: '100%', height: '100%', opacity: '0.2'}} src={this.state.images[this.props.card_number - 1]} alt="Front of feature card"/>
          <div className={classes.centered}>
            <h2 className={classes.front_text}>{this.props.front_text}</h2>
            <p className={classes.small_text}>more text on the flip side</p>
          </div>
        </div>
 
        <div className={classes.image} onClick={this.handleClick} onMouseLeave={this.handleClick}>
          <img style={{width: '100%', height: '100%', opacity: '1', marginBottom: '-101%'}} src={tint} alt="Tint on front of feature card"/>
          <img style={{width: '100%', height: '100%', opacity: '0.2'}} src={this.state.images[this.props.card_number - 1]} alt="Back of feature card"/>
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
