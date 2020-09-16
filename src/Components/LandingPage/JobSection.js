import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Globe from "../Images/globe.png";
import { Button } from '@material-ui/core';
import Registration from '../Registration/Registration';

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
        fontWeight: 'bold',
        fontSize:'5vw',
        marginTop:'0vw',
        marginBottom:'0vw',
    },
    header2:{
        fontFamily:'Nunito Sans',
        fontWeight: 'bold',
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
        fontFamily:'Montserrat',
        fontSize:'1.2vw',
        color:'#B5A165',
        marginTop:'0vw',
        marginBottom:'0vw',
        textAlign:'left',
    }, 
    button: {
        textTransform: 'none',
        backgroundColor: "#6EA0B5",
        marginBottom:"2%",
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        },
        fontSize:'1.5vw',
        fontWeight: 'bold',
        fontFamily: 'Nunito Sans',
        paddingLeft: '60px',
        paddingRight: '60px'
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
    changeToSignUp = (event) => {
        this.props.appContext.setState({
            currentScreen: <Registration appContext={this.props.appContext}/>
        })
    };

    render() {
        const classes = this.props.classes;
        return (
          <div className={classes.background}>
            <Grid container spacing={3} className={classes.grid} id="max_jobs">
                <Grid item xs={6}>
                    <div className={classes.box}>
                        <img className={classes.image} src={Globe} alt="Role Icon"/>
                        <div className={classes.boxInner}>
                            <h6 className={classes.role}>Role Name</h6> 
                            <h6 className={classes.companyName}>Company Name</h6> 
                        </div>
                    </div>
                </Grid>

                <Grid item xs={6} >
                    <div className={classes.box2} >
                        <img className={classes.image} src={Globe} alt="Role Icon"/>
                        <div className={classes.boxInner} >
                            <h6 className={classes.role}>Role Name</h6> 
                            <h6 className={classes.companyName}>Company Name</h6> 
                            </div>
                        </div>
                    </Grid>
        
                    <Grid item xs={12}>
                        <div>
                            <h1 className={classes.header1}>Our Jobs</h1>
                            <p className={classes.header2}><b>Apply directly to Full Time Jobs, Internships, or Board Positions posted by MAX Aspire members</b></p> 
                            <Button className={classes.button} variant="contained" onClick={this.changeToSignUp}>Join Now</Button>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className={classes.box} >
                            <img className={classes.image} src={Globe} alt="Role Icon"/>
                            <div className={classes.boxInner} >
                                <h6 className={classes.role}>Role Name</h6> 
                                <h6 className={classes.companyName}>Company Name</h6> 
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6} >
                        <div className={classes.box2 } >
                            <img className={classes.image} src={Globe} alt="Role Icon"/>
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