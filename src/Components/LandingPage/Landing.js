import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MainImage from "./MainImage";
import AboutMax from "./AboutMax";
import Features from "./Features";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    // appBar background restrictions for transparency
    appBar: {
        background: 'transparent',
        boxShadow: 'none'
    },
    // this css element is for the div containing the image
    // this is used so that we can align the image to the right
    imageLogo:{
        display: 'flex',
        width: '80vw',
        justifyContent: 'start'
    },
    // this css element describes the size of the image
    img: {
        width: '12vw'
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        marginTop: '64px',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    // sign in and registration button CSS elements
    // button regular and hover colors are different
    sign_in: {
        width: 100,
        margin: theme.spacing(1),
        backgroundColor: "#1A1A1A",
        borderStyle: "solid",
        color: "#F1F1F1",
        borderRadius: 25,
        borderColor: "#484848",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    register: {
        width: 100,
        margin: theme.spacing(1),
        backgroundColor: "#b5a165",
        color: "white",
        borderRadius: 25,
        borderColor: '#484848',
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    // for containing the logo and the sign in buttons
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

// writing a hook just to incorporate the CSS defined outside under classes
// feel free to use this function in any other function
function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Landing extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    handleClick = (event) => {

    };

    render(){
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.imageLogo}>
                            <img src={MaxLogo} alt="MAX_logo" className={classes.img}/>
                        </div>
                        <Button
                            variant="outlined"
                            className={classes.sign_in}
                        >
                            <b>Sign in</b>
                        </Button>
                        <Button
                            variant="outlined"
                            className={classes.register}
                        >
                            <b>Register</b>
                        </Button>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Container maxWidth="100vw" className={classes.container}>
                        <MainImage/>
                        <AboutMax/>
                        <Features/>
                    </Container>
                </main>
            </div>
        );
    }
}

Landing = withMyHook(Landing);
export default Landing;
