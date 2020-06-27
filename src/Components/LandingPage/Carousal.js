import React from 'react';
import {Component} from "react";
import { css } from 'emotion'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import left from "../Images/arrow_left.png";
import right from "../Images/arrow_right.png";
import * as q from "./Quotes.js";
import { Swipeable } from 'react-swipeable'

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
    '@media (max-width:670px)':{display:'None'},
   
  },
  leftArrow: {
    cursor: 'pointer',
    position: 'absolute',
    '@media (max-width:670px)':{display:'None'},
  },
  // sign in and registration button CSS elements
  // button regular and hover colors are different
  picture: {
    width: '200px',
    height: '200px',
    justify: 'left',
    borderRadius: '50%',
  },
  header: {
    fontFamily: 'Nunito Sans',
    fontSize: '40px',
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
    height: '220px',
    marginTop:'0px',
    marginBottom:'30px',
    fontFamily:'Nunito',
    fontSize: '25px',
    paddingLeft: '40px', 
    paddingRight: '40px',
    fontStyle:'italic',
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
      current: q.quotes[0],
      active: 0,
      numQuotes: 4,
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
    if (this.state.active < 3) {
      this.setState({current: q.quotes[parseInt(this.state.active)+1], active: parseInt(this.state.active)+1})
    } else if (this.state.active === 3) {
      this.setState({current: q.quotes[0], active: 0})
    }
    this.timer();
  }

  HandleLeftArrowClick = (event) => {
    if (this.state.active > 0) {
      this.setState({current: q.quotes[this.state.active-1], active: this.state.active-1})
    } else if (this.state.active === 0) {
      this.setState({current: q.quotes[this.state.numQuotes - 1], active: this.state.numQuotes - 1})
    }
    this.timer();
  }

  HandleSetClick = (event) => {
    this.setState({active:event.target.getAttribute("data-image"),current:q.quotes[event.target.getAttribute("data-image")]})
    this.timer();
  }

  render() {
    const classes = this.props.classes;
   
    return (
      <Swipeable onSwipedRight={this.HandleLeftArrowClick} onSwipedLeft={this.HandleRightArrowClick} >
      <div  className={classes.carousal}>
        <h1 className={classes.header}><b>What our members have to say</b></h1>
          <Grid
          container
          item
          alignItems="center"
          justify="center"
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
              item xs={12} sm={4} md={3} lg={2}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <p className={classes.picture}> 
                {this.state.current.image}    
              </p>
            </Grid>
            <Grid
              container
              item  xs={12} sm={6} md={5} lg={4}
              spacing={1}
              justify="center"
            >
              <p style={{fontSize: '20px'}}><i><b>Jodie Foster - CEO of BestWork</b></i></p>
              <p className={classes.paragraph}>{this.state.current.client}</p>
            
            </Grid>
            <Grid
              container
              item xs={1}
              spacing={1}
              alignItems="center"
              justify="center"
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
            {Object.keys(q.quotes).map(index=>(
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
