import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import globe from "../Images/globe.png";
import { Button } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    box:{
        position: 'relative',
        width: '53%',
      height:'6.5vw',
        top: '20px',
        left: '15%',
        resize: 'both',
        flexShrink: '3',
        border: '1px solid #6EA0B5',
        backgroundColor: 'white',
        borderRadius:'13px',
        margin:'5px 5px',
        boxShadow:' 10px -10px #6EA0B5',
        marginBottom:'30px',
    },
    box4:{
      position:' absolute',
      top:'10%',
       left:'65%',
       transform: 'translate(-50%, 0%)',
       wordWrap: 'break-word',
    width: '65%',
    height: '100%',
    
   
  },
   
    box2:{
      position: 'relative',
        width: '53%',
      height:'6.5vw',
        top: '-9px',
        left: '15%',
        resize: 'both',
        flexShrink: '3',
        border: '1px solid #6EA0B5',
        backgroundColor: 'white',
        borderRadius:'13px',
        margin:'5px 5px',
        boxShadow:' 10px -10px #6EA0B5',
        marginBottom:'30px',
    },
    image:{
      width: '7vw',
      height:'7vw',
      display: 'block',
      transform:'translate(0%, -5%)'
    },
    header:{
      fontFamily: 'Nunito Sans',
      fontSize:'5vw',
      marginTop:'0vw',
      marginBottom:'0vw',
      },
      header3:{
        fontFamily: 'Nunito Sans',
        marginRight:'25vw',
        marginLeft:'25vw',
        marginTop:'0vw',
        fontSize:'2vw'
        },
        role:{
          fontFamily: 'Nunito Sans',
          fontSize:'2vw',
          marginTop:'0vw',
      marginBottom:'0vw',
      textAlign:'left',
        },
        companyName:{
          fontFamily: 'Nunito Sans',
          fontSize:'1.5vw',
          color:'#B5A165',
          marginTop:'0vw',
         marginBottom:'0vw',
         textAlign:'left'
        }
       ,
      carousal: {

     
       
      },
      button: {
        backgroundColor: "#6EA0B5",
        marginBottom:"2%",
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        },
        fontSize:'1.5vw',
        fontFamily: 'Nunito Sans',
        whiteSpace:'pre',
    },
    background: {  
      backgroundColor: '#F1F1F1',
    },
    grid: { 
      paddingTop: '10%',
      paddingBottom: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },

}));



function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobSection extends Component{
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.background}>
        <div className={classes.carousal}>
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={6}>
          
              <div className={classes.box} >
                <img className={classes.image}src={globe}/>
                <div className={classes.box4} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>


            <Grid item xs={6} >
              <div className={classes.box2} >
                <img className={classes.image}src={globe}/>
                <div className={classes.box4} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>
    
            <Grid item xs={12}>
            <div >
              <h1 className={classes.header}>Our Jobs</h1>
              <p className={classes.header3}><b>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</b></p> 
              <Button className={classes.button} variant="contained"> <strong>        Join Now        </strong> </Button>
           
           </div>
            </Grid>
        
            <Grid item xs={6}>
              <div className={classes.box} >
                <img className={classes.image}src={globe}/>
                <div className={classes.box4} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>
            <Grid item xs={6} >
            <div className={classes.box2} >
                <img className={classes.image}src={globe}/>
                <div className={classes.box4} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>
        </Grid>
    
    </div>
    </div>
        )
  }
}

JobSection = withMyHook(JobSection);
export default JobSection;