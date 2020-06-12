import React, { useState } from 'react';
import {Component} from "react";
import { css, cx } from 'emotion'
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.png";
import Grid from "@material-ui/core/Grid";
import left from "../Images/arrow_left.png";
import right from "../Images/arrow_right.png";
import * as q from "./Quotes.js"



class Quote extends Component{
 
  constructor(props){
    super(props);
    this.state={
    current:q.quotes[0],
    active:0,
    }
  }

  HandleRightArrowClick=(event)=>{
    if (this.state.active<3){
      this.setState({current:q.quotes[parseInt(this.state.active)+1],active:parseInt(this.state.active)+1})
    }  
  }
  HandleLeftArrowClick=(event)=>{
    if (this.state.active>0){
      this.setState({current:q.quotes[this.state.active-1],active:this.state.active-1})
    } 
  }

  HandleSetClick=(event)=>{
    this.setState({active:event.target.getAttribute("data-image"),current:q.quotes[event.target.getAttribute("data-image")]})
    console.log(this.state.current)

  }

  render(){


  return(
    <div className={css`
    align-items:center;
    margin:40px auto;`}>

    <h1 className={css`
      font-family: Nunito Sans;
      font-size:40px;
      font-weight:bolder;
      text-align: center;
      `}>
        <b>What our members have to say</b>
    </h1>
     
    <Grid
    container
    item
    alignItems="center"
    justify="center"
    >
      <img  className={css`  cursor:pointer; position: absolute;left: 150px;display: flex;
      @media (max-width: 960px){display:None;}`} 
        src={left}   
        onClick={this.HandleLeftArrowClick}
      />
      <img  className={css`  cursor:pointer; position: absolute;right: 150px;display: flex;
        @media (max-width: 960px){display:None;}`} 
        src={right}  
        onClick={this.HandleRightArrowClick}
        />
    <Grid
      container
      item xs={6} sm={4}md={2} lg={2}
      spacing={1}
    > 

          <p className={css`
            width: 100px;
            height:250px;  
            justify:left;
            border-radius: 50%;
           
          `}> 
            {this.state.current.image}    
          </p>
    </Grid>
    <Grid
      container
      item  xs={12} sm={12} md={4} lg={3}
      spacing={1}
      justify="center"
    >
      
      < p className={css` 
      font-size:25px;   @media (max-width: 1114px){margin:5px 0px 20px 30px} `}><i>{this.state.current.client}</i></p>
      < p className={css` 
      font-size:20px;`}><i><b>Jodie Foster - CEO of BestWork</b></i></p>
      
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

export default Quote 