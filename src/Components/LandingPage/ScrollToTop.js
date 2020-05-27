import React, {Component} from "react";
import UpArrow from "../Images/up_arrow.svg";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  image: { 
    position: 'fixed',
    width: '50px',
    height: '50px',
    bottom:0,
    marginLeft: '-25px',
    flex: '1',
    justifyContent: 'flex-end',
    marginBottom: '18px',
  },
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class ScrollToTop extends Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
 
  handleClick(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  
  render() {
    const classes = this.props.classes;
    return (
      <div onClick={this.handleClick}>
        <img src={UpArrow} alt="Scroll To Top Arrow" className={classes.image}/>
      </div>
    )
  }
}

ScrollToTop = withMyHook(ScrollToTop);
export default ScrollToTop;
