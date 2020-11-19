import React, {Component} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import FirstPage from "./FirstPage";
import Landing from "../LandingPage/Landing";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    // appBar background restrictions for transparency
    appBar: {
        backgroundColor: 'rgba(0,0,0, 0.9)',
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
        float: 'left',
        align: 'left',
        '@media (max-width: 480px)': {width: '125px'},
        width: '175px',
        '&:hover': {
          cursor: 'pointer',
          filter: 'sepia(60%)'
        }
    },
    image: {
        backgroundImage: 'url(https://i.picsum.photos/id/1003/1181/1772.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    toolbar: {
        height: '10vh'
    }
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}
class Registration extends Component{
    constructor(props) {
        super(props);
        this.state={
            registrationScreen: []
        }
    }

    changeToLanding = event => {
        this.props.appContext.setState({
            currentScreen: <Landing appContext={this.props.appContext}/>
        })
    };

    componentDidMount() {
        this.setState({
            registrationScreen: <FirstPage appContext={this}/>
        })
    }

    render() {
        const classes = this.props.classes;
        return(
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.imageLogo}>
                            <img src={MaxLogo} alt="MAX_logo" onClick={this.changeToLanding} className={classes.img}/>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.state.registrationScreen}
            </Grid>
        )
    }
}

Registration = withMyHook(Registration);
export default Registration;