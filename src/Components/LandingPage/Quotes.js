import React from 'react';
import { css } from 'emotion'
import pic0 from "../Images/faceShot/pic0.png";
import pic1 from "../Images/faceShot/pic1.png";
import pic2 from "../Images/faceShot/pic2.png";
import pic3 from "../Images/faceShot/pic3.png";

export const quotes={
  0: {
    client:"\"When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us.\"",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%;
    @media (min-width: 960px){
    
      text-align:center;
     }
    
   `} src={pic0}/>
  },
   1:{
    client:"\"In order to be irreplaceable one must always be different. Coco\"",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%;
    @media (min-width: 960px){
      
       text-align:center;
      }
    
    
   `} src={pic1}/>
  
  },
   2:{
     client:"\"Always remember that you are absolutely unique. Just like everyone else\"",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%; 
    @media (max-width: 960px){
      
       text-align:center;
      }
    
   `} src={pic2}/>
  
  },
   3:{
    client:"\"Normal is not something to aspire to, it’s something to get away from. Jodie Foster\"",
    image:<img className={css`
    width: 100%;
    height:100%;
    padding:2%;
    border-radius: 50%;
    @media (max-width: 960px){
      
       text-align:center;
      }
    
   `}src={pic3}/>
  },
}
  