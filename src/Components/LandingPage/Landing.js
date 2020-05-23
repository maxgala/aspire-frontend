import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MainImage from "./MainImage";
import AboutMax from "./AboutMax";
import Features from "./Features";


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    img: {
        width: '10vw'
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
    navButtons:{
        marginLeft: 'calc((100vw - 375px)*0.07)'
    },
    sign_in: {
        width: 100,
        margin: theme.spacing(1),
        backgroundColor: "black",
        borderStyle: "solid",
        borderColor: 'white',
        color: "white",
        borderRadius: 25
    },
    register: {
        width: 100,
        margin: theme.spacing(1),
        backgroundColor: "#b5a165",
        color: "white",
        borderRadius: 25,
        borderColor: 'white'
    },
    toolbar: {
        display: 'flex'
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
                        <img src={MaxLogo} alt="MAX_logo" className={classes.img}/>
                        <div className={classes.navButtons}>
                            <Button
                                variant="contained"
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
                        </div>
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
