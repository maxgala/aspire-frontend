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
import LinearWithValueLabel from "./linearprogress";
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MenuItem from "@material-ui/core/MenuItem";
import AgeGroups from "./AgeGroups";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: '0vh',
        width: '100px',
        height: '100px',
        padding: '1vw',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginTop:"5%",
        height: 50,
        width: '50%',
        borderRadius: 50,
        backgroundColor: "#b5a165",
        color: "white",
        borderColor: '#484848',
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    error:{
        color: 'red'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
            firstName: this.props.prev ? this.props.prev.firstName : '',
            lastName: this.props.prev ? this.props.prev.lastName : '',
            phone: this.props.prev ? this.props.prev.phone : '',
            email: this.props.prev ? this.props.prev.email : '',
            password: this.props.prev ? this.props.prev.password : '',
            ageGroup: this.props.prev ? this.props.prev.ageGroup : '',
            industry: this.props.prev ? this.props.prev.industry : '',
            industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
            title: this.props.prev ? this.props.prev.title : '',
            company: this.props.prev ? this.props.prev.company : '',
            education: this.props.prev ? this.props.prev.education : '',
            province: this.props.prev ? this.props.prev.province : '',
            country: this.props.prev ? this.props.prev.country : '',
            states: this.props.prev ? this.props.prev.states : '',
            senior_executive: this.props.prev ? this.props.prev.senior_executive : false,
            progress: 25,
            errorDisplay: '',
            dialogueOpen: false,
        }
    }

    changeToPage2 = (event) => {
        if (this.state.firstName === '' || this.state.firstName === undefined
            || this.state.password === '' || this.state.password === undefined
            || this.state.lastName === '' || this.state.lastName === undefined
            || this.state.email === '' || this.state.email === undefined
            || this.state.phone === '' || this.state.phone === undefined
            || this.state.ageGroup === '' || this.state.ageGroup === undefined
            || this.state.errorDisplay !== 'None'){
            this.setState({
                dialogueOpen: true
            });
            return;
        }
        this.props.appContext.setState({
            registrationScreen: <SecondPage appContext={this.props.appContext} prev={this.state}/>
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

    handleDialog = (event) => {
        this.setState({
            dialogueOpen: !(this.state.dialogueOpen)
        })
    };

    handleConfirmCheck = (event) => {
        if (event.target.value === this.state.password){
            this.setState({
                errorDisplay: 'None'
            })
        }else{
            this.setState({
                errorDisplay: ''
            })
        }
    };

    handleYearChange = (event) => {
        this.setState({
            ageGroup: event.target.value
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
                                    id="outlined-select-birthYear"
                                    required
                                    fullWidth
                                    select
                                    label="Age Group"
                                    value={this.state.ageGroup}
                                    onChange={this.handleYearChange}
                                    variant="outlined"
                                >
                                    {AgeGroups.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    value={this.state.password}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirm password"
                                    label="Confirm Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleConfirmCheck}
                                />
                                <FormHelperText style={{
                                    display: this.state.errorDisplay,
                                    color: 'red'
                                }} id="component-error-text"> <b>Error! Passwords don't match </b></FormHelperText>
                            </Grid>
                        </Grid>
                        <LinearWithValueLabel progress={this.state.progress}/>
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
                <Dialog
                    open={this.state.dialogueOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Required fields are not filled in properly"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <b>Please fill out all the required fields</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialog} color="primary">
                            <b>Close</b>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

FirstPage = withMyHook(FirstPage);
export default FirstPage;