import React, {Component} from "react";
import { Button } from '@material-ui/core';
import Mainback from "../Images/max-mainimg.jpg";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    sectionstyle: {
        width: "100vw",
        height: "100vh",
        marginRight : "0",
        marginLeft  : "0",
        },

    h1style: {
        color: "white",
        paddingTop: "15%",
        fontFamily: "Arial",
        fontSize: "50px",
        textAlign: 'center',
        marginBottom: "0"
      },

    subheading: {
        color: "white"
    },
    networkstyle: {
        color: "gold",
        marginTop: "10px"
    },

    button: {
        backgroundColor: "#6EA0B5",
        marginTop:"2%",
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    total: {
        position: 'absolute', left: '50%', top: '0%',
        transform: 'translate(-50%, 0%)',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '100vw',
        height: '100vh'
    }
}));


function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class MainImage extends Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        const classes = this.props.classes;
        return(
            <div className={classes.sectionStyle}>
                <img style={{width: '100%', height: '100%'}}  
                    resizeMode="contain" src={Mainback} alt="Main Image"/>
                <div className={classes.total}>
                    <h1 className={classes.h1style}>Aspire for Excellence</h1>
                    <h3 className={classes.subheading}>Any successful career starts with a <span className={classes.networkstyle}>good network</span></h3>
                    <Button className={classes.button}variant="contained">Learn More</Button>
                    
                </div>
            </div>
            
        );
    }
}
MainImage = withMyHook(MainImage);
export default MainImage;