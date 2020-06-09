import React, { useState } from 'react';
import {Component} from "react";
import { css, cx } from 'emotion'
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.png";
import Grid from "@material-ui/core/Grid";
function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}
const useStyles = makeStyles(theme => ({
  h1style: {
    position: 'relative',
    color: "black",
    fontSize: "20px",
    marginBottom: "0",
    marginTop: "0",
    letterSpacing: "0px",
    padding: '5%'
  },
  f1:{
    fontFamily: "Bold 36px/48px Nunito Sans;",
    textAlign: 'center',
  },
  f2:{
    fontFamily: "Regular 18px/24px Montserrat",
    maxWidth: '450px',
    textAlign: 'center',
  },
  f3:{
    fontFamily: "Bold 26px/36px Nunito Sans",
    marginLeft: "1em",
    maxWidth: '350px',
    textAlign: 'left',
  },
   f4:{
    fontFamily: "Regular 10px/12px Montserrat",
    maxWidth: '450px',
    textAlign: 'center',
    fontSize:"10px",
  },
  tab: { 
    display: "flex",
    alignItems:"center",
    justifyContent:"top",
    fontFamily: "Bold 36px/48px Nunito Sans;",
    verticalAlign: "middle",
  },
  about: {
    display: 'grid',
    height:'fit-content',
    width: "100vw",
    minHeight: "75vh",
    overflow: "hidden",
    marginRight : "0",
    marginLeft  : "0",
  },
  total: {
    width: '100%',
    height: '60vh',
    padding: '5%',
  },
  grid: { 
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const quotes={
  0:{
    
    client:"\"When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.\"",
    quote:<img className={css`
    width: 180%;
    height:80%;
    padding:2%;
    border-radius: 50%;
    
   `} src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Sean_Cunningham_Head_Shot.jpg"/>
  },
   1:{
    client:"Coco",
    quote:"In order to be irreplaceable one must always be different."
  },
   2:{
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
      margin:40px auto;`}>
  <h1 className={css`
      font-family: Nunito Sans;
      font-size:40px;
      font-weight:bolder;
      text-align: center;
      `}
      
      
      style={{  paddingTop: '30px'}} ><b>What our members have to say</b></h1>
    <Grid
    container
    item
   // spacing={1}
    alignItems="center"
    justify="center"
    className={css ` `}
  >
    <Grid
      container
      item xs={4} sm={4}md={3} lg={2}

      //alignItems="center"
      justify="left"
   
    >
          <p className={css`
            width: 50%;
            height:37vh;
           
          
            border-radius: 50%;
         
          `}> 
            {this.state.current.quote}    
          </p>
    </Grid>
    <Grid
      container
      item  xs={12} sm={12} md={4} lg={3}

     alignItems="first baseline"
      justify="center"
    >
      
      < p className={css` 
      font-size:25px;`}><i>{this.state.current.client}</i></p>
      < p className={css` 
      font-size:20px;`}><i><b>Jodie Foster</b></i></p>
      
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