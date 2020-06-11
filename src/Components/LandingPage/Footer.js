import React, {Component} from "react";
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Newsletter from "../Images/newsletter.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    h1style: {
        color: 'white',
        fontFamily: 'Arial',
        fontSize: '40px',
        textAlign: 'left',
        margin: '0',
    },
    button: {
        display: 'inline-block',
        width: '300px',
        height: '60px',
        fontSize: window.innerWidth < 885 ? '0.875rem' : '24px',
        backgroundColor: "#6EA0B5",
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    newsletter: {
        position: 'absolute',
        width: '100%',
        bottom: '0',
        paddingBottom: window.innerWidth < 885 ? '150px' : '190px',
        textAlign: 'left',
        display: 'inline-block',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
    },
    grid: { 
        paddingLeft: '10vw',
        paddingRight: '10vw',
        justifyContent: 'center',
        alignItems: 'center',
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
            <div className={classes.toolbar}>
                <img style={{width: '100%', height: '300px', marginBottom: '-10px', marginTop: '10vh'}} resizeMode="contain" src={Newsletter} alt="Main"/>
                <div className={classes.newsletter}>
                    <Grid
                      container
                      item
                      spacing={1}
                      className={classes.grid}
                    >
                      <Grid
                        container
                        item xs={7} sm={9}
                        spacing={1}
                      >
                        <h1 className={classes.h1style}>Subscribe to our newsletter</h1>
                      </Grid>
                      <Grid
                        container
                        item xs={5} sm={3}
                        spacing={1}
                        alignItems="right"
                        justify="right"
                      >
                        <Button className={classes.button} variant="contained">Subscribe</Button>
                      </Grid>
                    </Grid>
                    
                </div>
            </div>
            
        );
    }
}

Footer = withMyHook(Footer);
export default Footer;
