import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import MaxLogo from "../Images/max_logo.png";
import MaxBrand from "../Images/max_brand_logo.png";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    appBarSpacer: theme.mixins.toolbar,
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
        width: '150px',
        padding: '1vw',
    },
    image: {
        backgroundImage: 'url(https://i.picsum.photos/id/1003/1181/1772.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: '10vh',
        width: '100px',
        padding: '1vw',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        backgroundColor: "#6EA0B5",
        marginTop:"2%",
        height: 50,
        width: '50%',
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    }
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: ''
        }
    }

    changeToSignUp = (event) => {
        console.log("Change to sign up here");
    };

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleClick = (event) => {
        if (this.state.username === '' || this.state.username === undefined || this.state.password === '' || this.state.password === undefined){
            window.alert("Not filled in");
            return;
        }
        console.log("Username is: "+this.state.username)
        console.log("Password is: "+this.state.password)
    };

    render() {
        const classes = this.props.classes;
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.imageLogo}>
                            <img src={MaxLogo} alt="MAX_logo" className={classes.img}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <img src={MaxBrand} alt="MAX_brand" className={classes.avatar}/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.username}
                            onChange = {this.handleUsernameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange = {this.handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.button}
                            onClick={this.handleClick}
                        >
                            Sign In
                        </Button>
                        <br/>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="h7">
                                    <b>Forgot your password? Click Here </b>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

SignIn = withMyHook(SignIn);
export default SignIn;