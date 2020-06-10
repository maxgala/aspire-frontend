import React, {Component} from "react";
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Newsletter from "../Images/newsletter.png";

const useStyles = makeStyles(theme => ({
    sectionstyle: {
        width: "100vw",
        height: "100px",
        marginRight : "0",
        marginLeft  : "0",
    },
    h1style: {
        color: 'white',
        fontFamily: 'Arial',
        fontSize: '50px',
        textAlign: 'center',
        margin: '0',
        paddingLeft: '35px',
        paddingRight: '35px'
    },
    subheading: {
        color: "white",
        paddingLeft: '30px',
        paddingRight: '30px'
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

class Footer extends Component {
    render() {
        const classes = this.props.classes;
        return(
            <div className={classes.sectionStyle}>
                <img style={{width: '100%', marginBottom: '-10px', marginTop: '10vh'}} resizeMode="contain" src={Newsletter} alt="Main"/>
            </div>
            
        );
    }
}

Footer = withMyHook(Footer);
export default Footer;
