import React, { useState } from 'react';
import {Component} from "react";
import { css, cx } from 'emotion'
const quotes={
  0:{
    client:"Emma Stone",
    quote:<img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunflower-1508785046.jpg"/>
  },
   1:{
    client:"Coco",
    quote:"In order to be irreplaceable one must always be different."
  },
   2:{
    client:"Margaret Mead",
    quote:"Always remember that you are absolutely unique. Just like everyone else"
  },
   3:{
    client:"Jodie Foster",
    quote:"Normal is not something to aspire to, it’s something to get away from.”"
  },
}
class Quote extends Component{
  constructor(props){
    super(props);
    this.state={
    current:quotes[0],
    active:0,
  }

  
  }
  setCurrent(value){this.setState({current:value})}
  setActive(value){this.setState({active:value})}

  HandleSetClick=(event)=>{
    console.log("HIIIIIII");
    
    this.setCurrent(quotes[event.target.getAttribute("data-quote")]) ;
    this.setActive(event.target.getAttribute("data-quote"));
  }
  render(){
   

  return(
    <div className={css`
   

    align-items:center;
    margin:40px auto;
    max-width:700px;
    p{
      text-alighn:center;
      margin-bottom:20px;
      color:pink;
    }

    `}>
    <p>{this.state.current.quote}</p>
     <p>{this.state.current.client}</p>
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
     span[data-quote="${this.state.active}"]::before{
      background-color:#45454d
     }
     `}>
      {Object.keys(quotes).map(index=>(
        <span
        onClick={this.HandleSetClick}
        data-quote={index}
        key={index}
        />
        ))}
     </div>
    

    </div>
    )
}
}
export default Quote 