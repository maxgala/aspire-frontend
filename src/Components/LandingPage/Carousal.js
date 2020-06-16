import React from 'react';
import {Component} from "react";
import { css } from 'emotion'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import left from "../Images/arrow_left.png";
import right from "../Images/arrow_right.png";
import * as q from "./Quotes.js";

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
    display: window.innerWidth < 600 ? 'none' : 'flex',
  },
  leftArrow: {
    cursor: 'pointer',
    position: 'absolute',
    display: window.innerWidth < 600 ? 'none' : 'flex',
  },
  // sign in and registration button CSS elements
  // button regular and hover colors are different
  picture: {
    width: '200px',
    height: '200px',
    justify: 'left',
    borderRadius: '50%',
    // '&:hover': {
    //   backgroundColor: "#F1F1F1",
    //   color: '#484848'
    // }
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
    margin: '40px auto',
  },
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
      numQuotes: 4
    }
  }

  HandleRightArrowClick = (event) => {
    if (this.state.active < 3) {
      this.setState({current: q.quotes[parseInt(this.state.active)+1], active: parseInt(this.state.active)+1})
    } else if (this.state.active === 3) {
      this.setState({current: q.quotes[0], active: 0})
    }
  }
  HandleLeftArrowClick = (event) => {
    if (this.state.active > 0) {
      this.setState({current: q.quotes[this.state.active-1], active: this.state.active-1})
    } else if (this.state.active === 0) {
      this.setState({current: q.quotes[this.state.numQuotes - 1], active: this.state.numQuotes - 1})
    }
  }

  HandleSetClick = (event) => {
    this.setState({active:event.target.getAttribute("data-image"),current:q.quotes[event.target.getAttribute("data-image")]})
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.carousal}>
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
              <p style={{fontSize: '25px', paddingLeft: '40px', paddingRight: '40px'}}><i>{this.state.current.client}</i></p>
              <p style={{fontSize: '20px'}}><i><b>Jodie Foster - CEO of BestWork</b></i></p>
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
              height:6px;
              width:6px;
              background-color:#d4d4d4;
              border-radius:50%;
              transition:background-color 0.3s ease;
            }
            span:hover::before{
              background-color:#45454d
            }
            span[data-image="${this.state.active}"]::before{
             background-color:#45454d
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
    )
  }
}

Quote = withMyHook(Quote);
export default Quote;
