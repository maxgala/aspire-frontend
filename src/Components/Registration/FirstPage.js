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
import MuiPhoneNumber from "material-ui-phone-number";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: '3vh',
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
            year_of_birth: this.props.prev ? this.props.prev.year_of_birth : '',
            industry: this.props.prev ? this.props.prev.industry : '',
            industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
            title: this.props.prev ? this.props.prev.title : '',
            company: this.props.prev ? this.props.prev.company : '',
            education: this.props.prev ? this.props.prev.education : '',
            province: this.props.prev ? this.props.prev.province : '',
            country: this.props.prev ? this.props.prev.country : '',
            states: this.props.prev ? this.props.prev.states : '',
            senior_executive: this.props.prev ? this.props.prev.senior_executive : false,
            showEmailError: false,
            progress: 25,
            errorDisplay: 'None',
            dialogueOpen: false,
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
    }

    changeToPage2 = (event) => {

        this.setState({
          dialogueOpen:false,
          showEmailError:false,
          errorDisplay:'None'
        })

        if (!(this.state.email).includes('@')){
            this.setState({
                dialogueOpen: true,
                showEmailError: true
            })
            return;
        }
        if (this.state.firstName === '' || this.state.firstName === undefined
            || this.state.password === '' || this.state.password === undefined
            || this.state.lastName === '' || this.state.lastName === undefined
            || this.state.email === '' || this.state.email === undefined
            || this.state.phone === '' || this.state.phone === undefined
            || this.state.year_of_birth === '' || this.state.year_of_birth === undefined
            || this.state.errorDisplay !== 'None'){
            this.setState({
                dialogueOpen: true
            });
            return;
        }

        const user = {
          email:this.state.email,
          firstName:this.state.firstName,
          lastName:this.state.lastName
        }

        console.log(user)



        axios.get('http://localhost:8080/users/docexists', {params:
          {email:this.state.email}
        })
        .then(res => {
          if(res.data === false){
            axios.post('http://localhost:8080/users/add', user)
            this.props.appContext.setState({
              registrationScreen: <SecondPage appContext={this.props.appContext} prev={this.state}/>
          })
            // alert('Email In Use!')
          }else{
          this.setState({
            dialogueOpen:true,
            showEmailError:true,
            errorDisplay:'Email In Use!'
          })
        }
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
            showEmailError: false,
            email: event.target.value
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
            year_of_birth: event.target.value
        })
    };

    changeToSignIn = event => {
        this.props.appContext.props.appContext.setState({
            currentScreen: <SignIn appContext={this.props.appContext}/>
        });
    };

    handlePhoneChange(value) {
        this.setState({
           phone: value
        });
     }

    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    {/* <img src={MaxBrand} alt="MAX_brand" className={classes.avatar}/> */}
                    <Typography component="h1" variant="h5">
                        Registration
                    </Typography>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="firstName"
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
                                    autoComplete="lastName"
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
                                    error={this.state.showEmailError}
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiPhoneNumber
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    value={this.state.phone}
                                    defaultCountry={'ca'}
                                    preferredCountries = {['ca','us']}
                                    disableAreaCodes = {true}
                                    onChange={this.handlePhoneChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    value={this.state.year_of_birth}
                                    onChange={this.handleYearChange}
                                />
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
                                    id="password-confirm"
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
                                <Link href="#" variant="body1" onClick={this.changeToSignIn}>
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
                            <b>Please Fill Out All Required Fields Properly.</b>
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
