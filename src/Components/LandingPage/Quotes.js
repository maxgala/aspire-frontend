import React, { useState } from 'react';
import {Component} from "react";
import { css, cx } from 'emotion'
import { makeStyles } from "@material-ui/core/styles";
import aboutMax from "../Images/aboutMax.png";
import Grid from "@material-ui/core/Grid";

export const quotes={
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
  