import React , {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import SeniorExecOptions from "./SE";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';





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

function findDate(array, attr, val){
    for(let i=0;i<array.length;i++){
        if(array[i][attr] === val){
            return i
        }
    }
}


class SeniorExec extends Component{
    constructor(props){
        super(props)

        this.state = {
            senior_executive: this.props.prev ? this.props.prev.senior_executive : false,
            oneOnOne: this.props.prev ? this.props.prev.oneOnOne : true,
            fourOnOne: this.props.prev ? this.props.prev.oneOnOne : false,
            mockInterview: this.props.prev ? this.props.prev.oneOnOne : false,
            date: this.props.prev ? this.props.prev.oneOnOne : '',
            oneOnOneFrequency: this.props.prev ? this.props.prev.oneOnOne : 0,
            fourOnOneFrequency: this.props.prev ? this.props.prev.oneOnOne : 0,
            mockInterviewFrequency: this.props.prev ? this.props.prev.oneOnOne : 0,
            oneOnOneDates: this.props.prev ? this.props.prev.oneOnOne : [],
            fourOnOneDates: this.props.prev ? this.props.prev.oneOnOne : [],
            mockInterviewDates: this.props.prev ? this.props.prev.oneOnOne : [],
            meetingDates: this.props.prev ? this.props.prev.oneOnOne : {},
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
        event.persist();
        this.setState({
            oneOnOneFrequency: event.target.value
        }, () => {
            this.setState({
                meetingDates:{...this.state.meetingDates, 'ONE_ON_ONE_FQY':this.state.oneOnOneFrequency}
            }, () => {
                if (this.state.oneOnOneFrequency < this.state.oneOnOneDates.length){
                    let dates = [...this.state.oneOnOneDates]
                    let diff = this.state.oneOnOneDates.length - this.state.oneOnOneFrequency
                    dates.splice(this.state.oneOnOneFrequency, diff)
                    this.setState({
                        oneOnOneDates:dates
                    }, () => {console.log(this.state.meetingDates)})
                }
            })
        })
    }

    handleFourOnOneChange = (event) => {
        this.setState({
            fourOnOneFrequency: event.target.value
        }, () => {
            this.setState({
                meetingDates:{...this.state.meetingDates, 'FOUR_ON_ONE_FQY':this.state.fourOnOneFrequency}
            }, () => {
                if (this.state.fourOnOneFrequency < this.state.fourOnOneDates.length){
                    let dates = [...this.state.fourOnOneDates]
                    let diff = this.state.fourOnOneDates.length - this.state.fourOnOneFrequency
                    dates.splice(this.state.fourOnOneFrequency, diff)
                    this.setState({
                        fourOnOneDates:dates
                    }, () => {console.log(this.state.meetingDates)})
                }
            })
        })
    }

    handleMockInterviewChange = (event) => {
        this.setState({
            mockInterviewFrequency: event.target.value
        }, () => {
            this.setState({
                meetingDates:{...this.state.meetingDates, 'MOCK_INTERVIEW_FQY':this.state.mockInterviewFrequency}
            }, () => {
                if (this.state.mockInterviewFrequency < this.state.mockInterviewDates.length){
                    let dates = [...this.state.mockInterviewDates]
                    let diff = this.state.mockInterviewDates.length - this.state.mockInterviewFrequency
                    dates.splice(this.state.mockInterviewFrequency, diff)
                    this.setState({
                        mockInterviewDates:dates
                    }, () => {console.log(this.state.meetingDates)})
                }
            })
        })
    }

    handleConfirmOneMeetingDatesChange = (event) => {
        event.persist();
        const value = event.target.value;
        
        // function findDate(array, attr, val){
        //     for(let i=0;i<array.length;i++){
        //         if(array[i][attr] === val){
        //             return i
        //         }
        //     }
        // }
        
        if(this.state.oneOnOneDates.some(date => date.id === event.target.id)){
            let dates = [...this.state.oneOnOneDates]
            let index = findDate(dates, 'id', event.target.id)
            dates.splice(index,1)

            this.setState({
                oneOnOneDates:dates,
            }, () => {
                this.setState({
                    oneOnOneDates: [...this.state.oneOnOneDates, {'id':event.target.id, 'date':value}]
                    }, () => {
                        this.setState({
                            meetingDates: {...this.state.meetingDates, 'ONE_ON_ONE':this.state.oneOnOneDates}
                        }, () => {console.log(this.state.meetingDates)})
                    })
            })
        }else {
            this.setState({
                oneOnOneDates: [...this.state.oneOnOneDates, {'id':event.target.id, 'date':value}]
                }, () => {
                    this.setState({
                        meetingDates: {...this.state.meetingDates, 'ONE_ON_ONE':this.state.oneOnOneDates}
                    }, () => {console.log(this.state.meetingDates)})
                })
        }
    }

    handleFourMeetingDatesChange = (event) => {
        event.persist();
        const value = event.target.value;
        
        // function findDate(array, attr, val){
        //     for(let i=0;i<array.length;i++){
        //         if(array[i][attr] === val){
        //             return i
        //         }
        //     }
        // }

        if(this.state.fourOnOneDates.some(date => date.id === event.target.id)){
            let dates = [...this.state.fourOnOneDates]
            let index = findDate(dates, 'id', event.target.id)
            dates.splice(index,1)

            this.setState({
                fourOnOneDates:dates,
            }, () => {
                this.setState({
                    fourOnOneDates: [...this.state.fourOnOneDates, {'id':event.target.id, 'date':value}]
                    }, () => {
                        this.setState({
                            meetingDates: {...this.state.meetingDates, 'FOUR_ON_ONE':this.state.fourOnOneDates}
                        }, () => {console.log(this.state.meetingDates)})
                    })
            })
        }else {
            this.setState({
                fourOnOneDates: [...this.state.fourOnOneDates, {'id':event.target.id, 'date':value}]
                }, () => {
                    this.setState({
                        meetingDates: {...this.state.meetingDates, 'FOUR_ON_ONE':this.state.fourOnOneDates}
                    }, () => {console.log(this.state.meetingDates)})
                })
        }
    }

    handleMockMeetingDatesChange = (event) => {
        event.persist();
        const value = event.target.value;
        
        // function findDate(array, attr, val){
        //     for(let i=0;i<array.length;i++){
        //         if(array[i][attr] === val){
        //             return i
        //         }
        //     }
        // }

        if(this.state.mockInterviewDates.some(date => date.id === event.target.id)){
            let dates = [...this.state.mockInterviewDates]
            let index = findDate(dates, 'id', event.target.id)
            dates.splice(index,1)

            this.setState({
                mockInterviewDates:dates,
            }, () => {
                this.setState({
                    mockInterviewDates: [...this.state.mockInterviewDates, {'id':event.target.id, 'date':value}]
                    }, () => {
                        this.setState({
                            meetingDates: {...this.state.meetingDates, 'MOCK_INTERVIEW':this.state.mockInterviewDates}
                        }, () => {console.log(this.state.meetingDates)})
                    })
            })
        }else {
            this.setState({
                mockInterviewDates: [...this.state.mockInterviewDates, {'id':event.target.id, 'date':value}]
                }, () => {
                    this.setState({
                        meetingDates: {...this.state.meetingDates, 'MOCK_INTERVIEW':this.state.mockInterviewDates}
                    }, () => {console.log(this.state.meetingDates)})
                })
        }
    }


    render(){
        const classes = this.props.classes;
        return(
            <Container component="main" maxWidth="lg">
                <CssBaseline />
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
                                    onChange={this.handleConfirmOneMeetingDatesChange}
                                />
                                <br />
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
                                    <br />
                                    </div> 
                                    ))}
                            </div>
                        }
                        <br />
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
                                    <br />
                                    </div> 
                                    ) 
                                )
                                }
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