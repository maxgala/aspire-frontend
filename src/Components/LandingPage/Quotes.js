import React from 'react';
import { css } from 'emotion'
import pic0 from "../Images/faceShot/pic0.png";
import pic1 from "../Images/faceShot/pic1.png";
import pic2 from "../Images/faceShot/pic2.png";
import pic3 from "../Images/faceShot/pic3.png";

export const quotes={
  0: {
    client:"Character is the sum of one’s good habits (virtues) and bad habits (vices). These habits mark us and affect the ways in which we respond to life’s events and challenges. Our character is our profile of habits and dispositions to act in certain ways.",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%;
    @media (min-width: 960px){
    
      text-align:center;
     }
    
   `} src={pic0} alt={"Testimonial Quote"}/>
  },
   1:{
    client:"Character is the sum of one’s good habits (virtues) and bad habits (vices). These habits mark us and affect the ways in which we respond to life’s events and challenges. Our character is our profile of habits and dispositions to act in certain ways.",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%;
    @media (min-width: 960px){
      
       text-align:center;
      }
    
    
   `} src={pic1} alt={"Testimonial Quote"}/>
  
  },
   2:{
     client:"Character is the sum of one’s good habits (virtues) and bad habits (vices). These habits mark us and affect the ways in which we respond to life’s events and challenges. Our character is our profile of habits and dispositions to act in certain ways.",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%; 
    @media (max-width: 960px){
      
       text-align:center;
      }
    
   `} src={pic2} alt={"Testimonial Quote"}/>
  
  },
   3:{
    client:"Character is the sum of one’s good habits (virtues) and bad habits (vices). These habits mark us and affect the ways in which we respond to life’s events and challenges. Our character is our profile of habits and dispositions to act in certain ways.",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%;
    @media (max-width: 960px){
      
       text-align:center;
      }
    
   `}src={pic3} alt={"Testimonial Quote"}/>
  },
}
  