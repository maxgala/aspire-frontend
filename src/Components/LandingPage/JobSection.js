import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Globe from "../Images/globe.png";
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        position: 'relative',
        width: '53%',
        height:'6.5vw',
        top: '3vw ',
        left: '20%',
        border: '1px solid #6EA0B5',
        backgroundColor: 'white',
        borderRadius:'16px',
        boxShadow:' 1.5vw -1.1vw #6EA0B5',
        marginBottom:'30px',
    },
    box2: {
        position:'relative',
        width:'53%',
        height:'6.5vw',
        top:'-1.5vw;',
        left:'25%',
        border:'1px solid #6EA0B5',
        backgroundColor: 'white',
        borderRadius:'16px',
        boxShadow:'1.5vw -1.1vw #6EA0B5',
        marginBottom:'30px',
    },
    boxInner: {
        position:' absolute',
        top:'10%',
        left:'65%',
        transform: 'translate(-50%, 0%)',
        wordWrap: 'break-word',
        width: '65%',
        height: '100%',
    }, 
    image: {
        width: '7vw',
        height:'7vw',
        display: 'block',
        transform:'translate(0%, -5%)',
    },
    header1:{
        fontFamily: 'Nunito Sans',
        fontSize:'5vw',
        marginTop:'0vw',
        marginBottom:'0vw',
    },
    header2:{
        fontFamily:'Nunito Sans',
        marginRight:'25vw',
        marginLeft:'25vw',
        marginTop:'0vw',
        fontSize:'2vw',
    },
    role:{
        fontFamily:'Nunito Sans',
        fontSize:'2vw',
        marginTop:'0vw',
        marginBottom:'0vw',
        textAlign:'left',
    },
    companyName:{
        fontFamily:'Nunito Sans',
        fontSize:'1.5vw',
        color:'#B5A165',
        marginTop:'0vw',
        marginBottom:'0vw',
        textAlign:'left',
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
    
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={6}>
              <div className={classes.box}>
                <img className={classes.image}src={Globe}/>
                <div className={classes.boxInner}>
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>

            <Grid item xs={6} >
              <div className={classes.box2} >
                <img className={classes.image}src={Globe}/>
                <div className={classes.boxInner} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>
    
            <Grid item xs={12}>
            <div >
              <h1 className={classes.header1}>Our Jobs</h1>
              <p className={classes.header2}><b>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</b></p> 
              <Button className={classes.button} variant="contained"> <strong>        Join Now        </strong> </Button>
            </div>
            </Grid>
        
            <Grid item xs={6}>
              <div className={classes.box} >
                <img className={classes.image}src={Globe}/>
                <div className={classes.boxInner} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>

            <Grid item xs={6} >
            <div className={classes.box2 } >
                <img className={classes.image}src={Globe}/>
                <div className={classes.boxInner} >
                    <h6 className={classes.role}>Role Name</h6> 
                    <h6 className={classes.companyName}>Company Name</h6> 
                </div>
              </div>
            </Grid>

        </Grid>
    
    </div>

        )
  }
}

JobSection = withMyHook(JobSection);
export default JobSection;