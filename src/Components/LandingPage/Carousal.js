import React from 'react';
import {Component} from "react";
import { css } from 'emotion';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import left from "../Images/arrow_left.png";
import right from "../Images/arrow_right.png";
import Quotes from "./Quotes.js";
import { Swipeable } from 'react-swipeable';

const useStyles = makeStyles(theme => ({
  // TODO: find way to do this with makeStyles
  // navigation: {
  //   display: 'flex',
  //    justifyContent: 'center',
  //    span: {
  //      height: '20px',
  //      width: '20px',
  //      margin: '0 3px',
  //      display: 'flex',
  //      alignItems: 'center',
  //      justifyContent: 'center',
  //      cursor: 'pointer',
  //    }
  //    span::before: {
  //      content:"";
  //      height:6px;
  //      width:6px;
  //      background-color:#d4d4d4;
  //      border-radius:50%;
  //      transition:background-color 0.3s ease;

  //    }
  //    span:hover::before{
  //      background-color:#45454d
  //    }
  //    span[data-image="${this.state.active}"]::before{
  //     background-color:#45454d
  //    }
  // },
  rightArrow: {
    cursor: 'pointer',
    position: 'absolute',
    align: 'left',
  },
  leftArrow: {
    cursor: 'pointer',
    position: 'absolute',
  },
  testimonialSmall: {
    '@media (min-width: 960px)': {display:'None'},
  },
  testimonialLarge: {
    '@media (max-width: 959px)': {display:'None'},
  },
  picture: {
    width: '200px',
    height: '200px',
    justify: 'left',
    borderRadius: '50%',
  },
  header: {
    fontFamily: 'Nunito Sans',
    fontSize: '48px',
    fontWeight: 'bolder',
    textAlign: 'center',
    paddingLeft: '30px',
    paddingRight: '30px'
  },
  carousal: {
    alignItems: 'center',
    paddingTop:'4%',
    paddingBottom:'8%',
    backgroundColor:'#f1f1f1',
  },
  paragraph: {
    margin: 'auto',
    fontFamily:'Nunito',
    fontSize: '20px',
    paddingLeft: '40px', 
    paddingRight: '40px',
    fontStyle:'italic',
    color: '#484848'
  },
  title: {
    fontSize: '22px',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    color: '#484848'
  },
  image: {
    width: '100%',
    height: '100%',
    padding: '2%',
    borderRadius: '50%',
    '@media (min-width: 960px)': { textAlign: 'center' }
  }
}));

function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class Quote extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      current: Quotes[0],
      active: 0,
      numQuotes: 7,
    }
  }

  timer(){
    clearInterval(this.interval);
    this.interval = setInterval(() => this.HandleRightArrowClick(), 3000);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.HandleRightArrowClick(), 3000);
  }

  HandleRightArrowClick = (event) => {
    if (this.state.active < 6) {
      this.setState({current: Quotes[parseInt(this.state.active)+1], active: parseInt(this.state.active)+1})
    } else if (this.state.active === 6) {
      this.setState({current: Quotes[0], active: 0})
    }
    this.timer();
  }

  HandleLeftArrowClick = (event) => {
    if (this.state.active > 0) {
      this.setState({current: Quotes[this.state.active-1], active: this.state.active-1})
    } else if (this.state.active === 0) {
      this.setState({current: Quotes[this.state.numQuotes - 1], active: this.state.numQuotes - 1})
    }
    this.timer();
  }

  HandleSetClick = (event) => {
    this.setState({active:event.target.getAttribute("data-image"),current: Quotes[event.target.getAttribute("data-image")]})
    this.timer();
  }

  render() {
    const classes = this.props.classes;
   
    return (
      <Swipeable onSwipedRight={this.HandleLeftArrowClick} onSwipedLeft={this.HandleRightArrowClick} >
      <div className={classes.carousal}>
        <h1 className={classes.header}><b>What our members have to say</b></h1>
        <Grid
          container
          item
          alignItems="center"
          justify="center"
          id="testimonials"
        >
          <Grid
            container
            item xs={1}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <img className={classes.leftArrow} 
              src={left}   
              onClick={this.HandleLeftArrowClick}
              alt={"Testimonial Left Arrow"}
            />
          </Grid>
          <Grid
            container
            item xs={9} sm={9} md={4} lg={3}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <p className={classes.picture}> 
              <img
                className={classes.image}
                src={this.state.current.image_path}
                alt={this.state.current.alt_text}
              />
            </p>
          </Grid>
          <Grid
            container
            item xs={1}
            spacing={1}
            alignItems="center"
            justify="center"
            className={classes.testimonialSmall}
          >
            <img className={classes.rightArrow} 
              src={right}  
              onClick={this.HandleRightArrowClick}
              alt={"Testimonial Right Arrow"}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={5}
            spacing={1}
            justify="center"
          >
            <p className={classes.title}>{this.state.current.name} - {this.state.current.role} at {this.state.current.company}</p>
            <p className={classes.paragraph}>{this.state.current.testimonial}</p>
          </Grid>
          <Grid
            container
            item xs={1}
            spacing={1}
            alignItems="center"
            justify="center"
            className={classes.testimonialLarge}
          >
            <img className={classes.rightArrow} 
              src={right}  
              onClick={this.HandleRightArrowClick}
              alt={"Testimonial Right Arrow"}
            />
          </Grid>
        </Grid>
        <div className={css`
           display:flex;
           justify-content:center;
           padding-top: 50px;
           span{
             height:20px;
             width:20px;
             margin:0 3px;
             display:flex;
             align-items:center;
             justify-content:center;
             cursor:pointer;
            }
            span::before{
              content:"";
              height:13px;
              width:13px;
              background-color:#d4d4d4;
              border-radius:50%;
              transition:background-color 0.3s ease;
            }
            span:hover::before{
              background-color:rgb(197,179,88)
            }
            span[data-image="${this.state.active}"]::before{
             background-color:rgb(197,179,88)
            }
          `}>
            {Object.keys(Quotes).map(index=>(
              <span
                onClick={this.HandleSetClick}
                data-image={index}
                key={index}
              />
            ))}
        </div>
      </div>
      </Swipeable>
    )
  }
}

Quote = withMyHook(Quote);
export default Quote;
