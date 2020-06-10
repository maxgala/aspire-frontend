import React, { useState } from 'react';
import {Component} from "react";
import { css, cx } from 'emotion'
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.png";
import Grid from "@material-ui/core/Grid";
import left from "../Images/arrow_left.png";
import right from "../Images/arrow_right.png";



const quotes={
  0:{
    
    client:"\"When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.\"",
    image:<img className={css`
    width: 180%;
    height:80%;
    padding:2%;
    border-radius: 50%;
    @media (max-width: 960px){
     margin:0px 0px 0px 40px;
      text-align:center;
     }
    
   `} src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Sean_Cunningham_Head_Shot.jpg"/>
  },
   1:{
    client:"\"In order to be irreplaceable one must always be different. Coco\"",
    image:<img className={css`
    width: 180%;
    height:80%;
    padding:2%;
    border-radius: 50%;
    @media (max-width: 960px){
      margin:0px 0px 0px 40px;
       text-align:center;
      }
    
    
   `} src="https://images.squarespace-cdn.com/content/v1/5c64375df4e5314e7985012c/1565025240158-JV7FOIODKHPLAZOIRGRN/ke17ZwdGBToddI8pDm48kC-KQ8StUrUTl7SMDbWuteJZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI2jhaLsRRsAwInQ5q0zH86wR4v5ScThrPpqJ8W9VBf8cKMshLAGzx4R3EDFOm1kBS/marcus+square+head+shot.jpg?format=750w"/>
  
  },
   2:{
     client:"\"Always remember that you are absolutely unique. Just like everyone else\"",
    image:<img className={css`
    width: 180%;
    height:80%;
    padding:2%;
    border-radius: 50%; 
    @media (max-width: 960px){
      margin:0px 0px 0px 40px;
       text-align:center;
      }
    
   `} src="https://wrisenergy.org/wp-content/uploads/2019/06/Professional-headshot-square.jpg"/>
  
  },
   3:{
    client:"\"Normal is not something to aspire to, it’s something to get away from. Jodie Foster\"",
    image:<img className={css`
    width: 180%;
    height:80%;
    padding:2%;
    border-radius: 50%;
    @media (max-width: 960px){
      margin:0px 0px 0px 40px;
       text-align:center;
      }
    
   `} src="https://www.headshotsnyc.com/wp-content/gallery/multiple-crops/Linked-in-crop-1.jpg"/>
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

  HandleRightArrowClick=(event)=>{
    if (this.state.active<3){
      this.setState({current:quotes[parseInt(this.state.active)+1],active:parseInt(this.state.active)+1})
    }  
  }
  HandleLeftArrowClick=(event)=>{
    if (this.state.active>0){
      this.setState({current:quotes[this.state.active-1],active:this.state.active-1})
    } 
  }

  HandleSetClick=(event)=>{
    this.setState({active:event.target.getAttribute("data-image"),current:quotes[event.target.getAttribute("data-image")]})
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

      {Object.keys(quotes).map(index=>(
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