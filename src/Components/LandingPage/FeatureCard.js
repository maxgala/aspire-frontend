import React, {Component} from "react";
import ReactCardFlip from 'react-card-flip';
import CardFront from "../Images/feature_card_front.png";
import CardBack from "../Images/feature_card_back.png";

class FeatureCard extends Component{
  constructor() {
    super();
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
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <div style={{margin: '20px'}} onClick={this.handleClick}>
          <img style={{width: '100%', height: '100%'}} src={CardFront} alt="Stock Image"/>
        </div>
 
        <div style={{margin: '20px'}} onClick={this.handleClick}>
          <img style={{width: '100%', height: '100%'}} src={CardBack} alt="Stock Image"/>
        </div>
      </ReactCardFlip>
    )
  }
}

export default FeatureCard;