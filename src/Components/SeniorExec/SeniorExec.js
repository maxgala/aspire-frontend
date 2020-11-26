import React , {Component} from 'react';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import MaxBrand from "../Images/max_brand_logo.png";
// import SignIn from "../Authentication/SignIn";
// import SecondPage from "./SecondPage";
// import LinearWithValueLabel from "./linearprogress";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
// import MuiPhoneNumber from "material-ui-phone-number";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import SeniorExecOptions from "./SE";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
// import DatePicker from 'react-date-picker';





const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titlePaper: {
        margin: theme.spacing(0, 0, 3)
    },
    avatar: {
        marginTop: '3vh',
        width: '100px',
        height: '100px',
        padding: '1vw',
    },
    choiceText: {
        margin: theme.spacing(2, 0, 1)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit_back: {
        margin: theme.spacing(3, 0, 2),
        marginTop:"5%",
        marginRight: '5%',
        height: 50,
        width: '30%',
        borderRadius: 50,
        backgroundColor: "#1A1A1A",
        borderStyle: "solid",
        color: "#F1F1F1",
        borderColor: "#484848",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginTop:"5%",
        height: 50,
        width: '30%',
        borderStyle: 'solid',
        borderRadius: 50,
        backgroundColor: "#b5a165",
        color: "white",
        borderColor: '#484848',
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    disagree: {
        margin: theme.spacing(3, 0, 2),
        width: '30%',
        backgroundColor: "#1A1A1A",
        borderStyle: "solid",
        color: "#F1F1F1",
        borderColor: "#484848",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    agree: {
        margin: theme.spacing(3, 0, 2),
        width: '30%',
        backgroundColor: "#b5a165",
        color: "white",
        borderColor: '#484848',
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    payButton: {
        borderRadius: 50,
        backgroundColor: "#6EA0B5",
        borderStyle: "solid",
        color: "#F1F1F1",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
    },
    choice:{
        width: '25%'
    }, 
    term: {
        color: 'black', 
        '&:hover': {
            color: 'red'
        }
    },
    cardRoot: {
        margin: theme.spacing(0, 2, 1),
        maxWidth: 300
    },
    media: {
        height: 140,
    },
    membership_options: {
        '@media (min-width: 480px)': {
            display: 'inline-flex',
        },
        margin: 'auto',
    },
    grid: {
        paddingLeft: '10%',
        paddingRight: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '30px',
    },
    features_title: {
        fontFamily: "Nunito Sans",
        fontWeight: "Bold",
        fontSize: "48px",
        margin: '0px',
        paddingTop: '30px',
        paddingBottom: '30px',
        color: 'black',
    },
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


class SeniorExec extends Component{
    constructor(props){
        super(props)

        this.state = {
            senior_executive: this.props.prev ? this.props.prev.senior_executive : false,
            oneOnOne:true,
            fourOnOne:false,
            mockInterview:false,
            date:new Date(),
            oneOnOneFrequency:0,
            fourOnOneFrequency:0,
            mockInterviewFrequency:0,
            oneOnOneDates:[],
            fourOnOneDates:[],
            mockInterviewDates:[],
            meetingDates:{},
        }
    }

    handleFourOnOneChoice = (event) => {
        if (this.state.fourOnOne ===  false){
            this.setState({
                fourOnOne: true,
            })
        }else{
            this.setState({
                fourOnOne: false,
            })
        }
    };

    handleMockInterviewChoice = (event) => {
        if (this.state.mockInterview ===  false){
            this.setState({
                mockInterview: true,
            })
        }else{
            this.setState({
                mockInterview: false,
            })
        }
    };

    handleOneOnOneChange = (event) => {
        this.setState({
            oneOnOneFrequency: event.target.value,
            oneOnOneDates:[],
            date:new Date(),
        })
    }

    handleFourOnOneChange = (event) => {
        this.setState({
            fourOnOneFrequency: event.target.value
        })
    }

    handleMockInterviewChange = (event) => {
        this.setState({
            mockInterviewFrequency: event.target.value
        })
    }

    handleOneMeetingDatesChange = (event) => {
        const value = event.target.value;
        
            this.setState({
                oneOnOneDates: [...this.state.oneOnOneDates, {[event.target.id]:value}],
                meetingDates:this.state.oneOnOneDates
            }, () => {console.log(this.state.meetingDates)})
    }

    handleFourMeetingDatesChange = (event) => {
        const value = event.target.value;
        
            this.setState({
                fourOnOneDates: [...this.state.fourOnOneDates, {[event.target.id]:value}],
                meetingDates:this.state.fourOnOneDates
            }, () => {console.log(this.state.meetingDates)})
    }

    handleMockMeetingDatesChange = (event) => {
        const value = event.target.value;
        
            this.setState({
                mockInterviewDates: [...this.state.mockInterviewDates, {[event.target.id]:value}],
                meetingDates:this.state.mockInterviewDates
            }, () => {console.log(this.state.meetingDates)})
    }

    // handleDateChange = (event) => {
    //     this.setState({
    //         date:event.target.(new Date())
    //     })
    // }

    render(){
        const classes = this.props.classes;
        return(
            <Container component="main" maxWidth="lg">
                <Grid container spacing={2}>
                    <div className={classes.form}>
                        <Tooltip>
                            <b>Please Select the types of meeting you will be available for:</b>
                        </Tooltip>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.oneOnOne}
                                        name="checkedD"
                                    />}
                                label={
                                    <Tooltip title={
                                        <p>Senior Executive means the chief executive officer,
                                            chief operating officer, chief financial officer, or
                                            anyone in charge of a principal business unit or function.
                                        </p>}>
                                        <b>1 On 1</b>
                                    </Tooltip>
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.fourOnOne}
                                        onChange={this.handleFourOnOneChoice}
                                        name="checkedD"
                                    />}
                                label={
                                    <Tooltip title={
                                        <p>Senior Executive means the chief executive officer,
                                            chief operating officer, chief financial officer, or
                                            anyone in charge of a principal business unit or function.
                                        </p>}>
                                        <b>4 On 1</b>
                                    </Tooltip>
                                }
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.mockInterview}
                                        onChange={this.handleMockInterviewChoice}
                                        name="checkedD"
                                    />}
                                label={
                                    <Tooltip title={
                                        <p>Senior Executive means the chief executive officer,
                                            chief operating officer, chief financial officer, or
                                            anyone in charge of a principal business unit or function.
                                        </p>}>
                                        <b>Mock Interviews</b>
                                    </Tooltip>
                                }
                            />
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-select-education"
                                fullWidth
                                select
                                label="How often are you available for one on one meetings per year?"
                                value={this.state.oneOnOneFrequency}
                                onChange={this.handleOneOnOneChange}
                                variant="outlined"
                            >
                                {SeniorExecOptions.Frequency.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <br />
                        {[...Array(this.state.oneOnOneFrequency)].map((elementInArray, index) => ( 
                            <div className="" key={index}>
                                <input
                                    type="date"
                                    id={`${index}`}
                                    min={this.state.date}
                                    onChange={this.handleOneMeetingDatesChange}
                                />
                                <br />
                                {/* <Grid item xs={12} id={`${index}`}>
                                    <TextField
                                        id={`${index}`}
                                        label={`Date ${index + 1}`}
                                        type="date"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={this.state.oneOnOneDates}
                                        onChange={this.handleMeetingDatesChange}
                                    />
                            </Grid> */}
                            <br />
                            </div> 
                            ) 
                        )
                        }
                        <br />
                        {this.state.fourOnOne === true &&
                            <div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-select-education"
                                        fullWidth
                                        select
                                        label="How often are you available for four on one meetings per year?"
                                        value={this.state.fourOnOneFrequency}
                                        onChange={this.handleFourOnOneChange}
                                        variant="outlined"
                                    >
                                        {SeniorExecOptions.Frequency.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <br />
                                {[...Array(this.state.fourOnOneFrequency)].map((elementInArray, index) => ( 
                                    <div className="" key={index}> 
                                        <input
                                            required
                                            type="date"
                                            id={`${index}`}
                                            min={this.state.date}
                                            onChange={this.handleFourMeetingDatesChange}
                                        />
                                    <br />
                                        {/* <Grid item xs={12} id={`${index}`}>
                                            <TextField
                                                id={`${index}`}
                                                label={`Date ${index + 1}`}
                                                type="date"
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.oneOnOneDates}
                                                onChange={this.handleMeetingDatesChange}
                                            />
                                    </Grid> */}
                                    <br />
                                    </div> 
                                    ))}
                                <br />
                            </div>
                        }
                        {this.state.mockInterview &&
                            <div>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-select-education"
                                        fullWidth
                                        select
                                        label="How often are you available for mock interviews per year?"
                                        value={this.state.mockInterviewFrequency}
                                        onChange={this.handleMockInterviewChange}
                                        variant="outlined"
                                    >
                                        {SeniorExecOptions.Frequency.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <br />
                                {[...Array(this.state.mockInterviewFrequency)].map((elementInArray, index) => ( 
                                    <div className="" key={index}> 
                                        <input
                                            required
                                            type="date"
                                            id={`${index}`}
                                            min={this.state.date}
                                            onChange={this.handleMockMeetingDatesChange}
                                        />
                                    <br />
                                        {/* <Grid item xs={12} id={`${index}`}>
                                            <TextField
                                                id={`${index}`}
                                                label={`Date ${index + 1}`}
                                                type="date"
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                value={this.state.oneOnOneDates}
                                                onChange={this.handleMeetingDatesChange}
                                            />
                                    </Grid> */}
                                    <br />
                                    </div> 
                                    ) 
                                )
                                }
                                <br />
                            </div>
                        }
                    </div>
                </Grid>
            </Container>
        )
    }
}


SeniorExec = withMyHook(SeniorExec);

export default SeniorExec;