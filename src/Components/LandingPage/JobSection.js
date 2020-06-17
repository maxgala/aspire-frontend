import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    box:{
        position: 'relative',
        width: '45%',
      height:'65%',
        top: '30px',
        left: '15%',
        resize: 'both',
        flexShrink: '3',
        border: '1px solid #6EA0B5',
        backgroundColor: 'white',
        borderRadius:'20px',
        margin:'5px 5px'
      
    },
    box1:{
        

        
        height:'100px',
        //backgroundColor: 'lightgrey',
      //  border: '15px solid green',
    
    },
    box2:{
      position: 'relative',
      width: '45%',
      height:'65%',
      top: '0px',
      left: '15%',
      resize: 'both',
      flexShrink: '3',
      border: '1px solid #6EA0B5',
      backgroundColor: 'white',
      borderRadius:'20px',
      padding:'5px'
    },
    header:{
      fontFamily: 'Nunito Sans',
      fontSize:'60px',
      marginTop:'0vw',
      marginBottom:'0vw',
      },
      header3:{
        fontFamily: 'Nunito Sans',
        marginRight:'20vw',
        marginLeft:'20vw',
        marginTop:'0vw',
       
        fontSize:'35px'
        },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      carousal: {
        //alignItems: 'center',
        marginTop:'90px',
      marginBottom:'90px',
       
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
        <div className={classes.carousal}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
            <div className={classes.box1}>
                <div className={classes.box} >BOX1 </div>
                </div>
            </Grid>
            <Grid item xs={6} >
            <div className={classes.box1}>
            <div className={classes.box2} >BOX2 </div>
             </div>
            </Grid>
    
            <Grid item xs={12}>
            <div >
              <h1 className={classes.header}>Our Jobs</h1>
              <p className={classes.header3}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p> 
           </div>
            </Grid>
        
            <Grid item xs={6}>
            <div className={classes.box1}>
                <div className={classes.box} >BOX1 </div>
                </div>
            </Grid>
            <Grid item xs={6} >
            <div className={classes.box1}>
            <div className={classes.box2} >BOX2 </div>
             </div>
            </Grid>
        </Grid>
    
    </div>
        )
  }
}

JobSection = withMyHook(JobSection);
export default JobSection;