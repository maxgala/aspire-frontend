import React, {Component} from "react";
import { Button } from '@material-ui/core';
import Mainback from "../Images/max-mainimg.jpg";
import {makeStyles} from "@material-ui/core/styles";
import MaxLogo from "../Images/max_logo.png";

const useStyles = makeStyles(theme => ({
    sectionstyle: {
        width: "100vw",
        height: "100vh",
        marginRight : "0",
        marginLeft  : "0",
    },
    h1style: {
        fontFamily: "Nunito Sans",
        fontWeight: "Bold",
        fontSize: "72px",
        color: 'white',
        textAlign: 'center',
        margin: '0',
        paddingLeft: '35px',
        paddingRight: '35px'
    },
    subheading: {
        fontFamily: "Nunito Sans",
        fontWeight: "Bold",
        fontSize: "24px",
        color: "white",
        paddingLeft: '30px',
        paddingRight: '30px'
    },
    networkstyle: {
        color: "#B5A165",
        marginTop: "10px"
    },
    button: {
        fontFamily: "Montserrat",
        fontSize: "24px",
        textTransform: "capitalize",
        paddingLeft: '20px',
        paddingRight: '20px',
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
        position: 'absolute',
        left: '50%',
        top: '0%',
        transform: 'translate(-50%, 0%)',
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '110%',
        height: '75vh'
    },
    img: {
        paddingTop: '20vh',
        width: '350px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
}));


function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class MainImage extends Component {
    render() {
        const classes = this.props.classes;
        return(
            <div className={classes.sectionStyle}>
                <img style={{width: '100%', height: '65vh', marginTop: '10vh'}} src={Mainback} alt="Main"/>
                <div className={classes.total}>
                    <img src={MaxLogo} alt="MAX_logo" className={classes.img}/>
                    <h1 className={classes.h1style}>Aspire for Excellence</h1>
                    <h3 className={classes.subheading}>Any successful career starts with a <span className={classes.networkstyle}>good network</span></h3>
                    <Button className={classes.button} variant="contained">Learn More</Button>
                </div>
            </div>
            
        );
    }
}

MainImage = withMyHook(MainImage);
export default MainImage;
