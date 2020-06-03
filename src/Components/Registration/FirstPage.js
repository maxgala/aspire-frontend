import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaxBrand from "../Images/max_brand_logo.png";
import SignIn from "../Authentication/SignIn";
import SecondPage from "./SecondPage";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: '7vh',
        width: '100px',
        padding: '1vw',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "#6EA0B5",
        marginTop:"5%",
        height: 50,
        width: '50%',
        borderRadius: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class FirstPage extends Component {

    constructor(props) {
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: ''
        }
    }

    changeToPage2 = (event) => {
        if (this.state.firstName === '' || this.state.firstName === undefined
            || this.state.password === '' || this.state.password === undefined
            || this.state.lastName === '' || this.state.lastName === undefined
            || this.state.email === '' || this.state.email === undefined
            || this.state.phone === '' || this.state.phone === undefined){
            window.alert("Not filled in");
            return;
        }
        this.props.appContext.setState({
            registrationScreen: <SecondPage appContext={this.props.appContext} firstPage={this.state}/>
        })
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        })
    };

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        })
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    handlePhoneChange = (event) => {
        this.setState({
            phone: event.target.value
        })
    };

    changeToSignIn = event => {
        this.props.appContext.props.appContext.setState({
            currentScreen: <SignIn appContext={this.props.appContext}/>
        });
    };

    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={MaxBrand} alt="MAX_brand" className={classes.avatar}/>
                    <Typography component="h1" variant="h5">
                        Registration Info
                    </Typography>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleFirstNameChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={this.state.lastName}
                                    onChange={this.handleLastNameChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    value={this.state.phone}
                                    onChange={this.handlePhoneChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.changeToPage2}
                        >
                            <b>Next</b>
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Link href="#" variant="h7" onClick={this.changeToSignIn}>
                                    <b>Already have an account? Sign in</b>
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
        );
    }
}

FirstPage = withMyHook(FirstPage);
export default FirstPage;