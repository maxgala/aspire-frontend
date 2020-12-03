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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';






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
        marginTop: "5%",
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
        marginTop: "5%",
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
    choice: {
        width: '25%'
    },

    chatTypeText: {
        fontSize: "18px"
    },
    chatFreqQuestion: {
        marginTop: "10px"
    },

    dateInput: {
        marginTop: '10px',
        paddingTop: '3px',
        paddingLeft: '3px',
        paddingRight: '3px',
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

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes} />
    }
}

function findDate(array, attr, val){
    for(let i=0;i<array.length;i++){
        if(array[i][attr] === val){
            return i
        }
    }
}


class SeniorExec extends Component {
    constructor(props) {
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
            dialogueOpen: false,
        }
    }

    handleDialog = (event) => {
        this.setState({
            dialogueOpen: !(this.state.dialogueOpen)
        })
    };

    handleFourOnOneChoice = (event) => {
        if (this.state.fourOnOne === false) {
            this.setState({
                fourOnOne: true,
            }, () => {
                this.props.onFour(this.state.fourOnOne)
            })
        } else {
            this.setState({
                fourOnOne: false,
            }, () => {
                this.props.onFour(this.state.fourOnOne)
            })
        }
    };

    handleMockInterviewChoice = (event) => {
        if (this.state.mockInterview === false) {
            this.setState({
                mockInterview: true,
            }, () => {
                this.props.onMockInt(this.state.mockInterview)
            })
        } else {
            this.setState({
                mockInterview: false,
            }, () => {
                this.props.onMockInt(this.state.mockInterview)
            })
        }
    };

    handleOneOnOneChange = (event) => {
        event.persist();

        if (event.target.value < this.state.oneOnOneDates.length){
            let dates = [...this.state.oneOnOneDates]
            let diff = this.state.oneOnOneDates.length - event.target.value
            dates.splice(event.target.value, diff)
            console.log(dates)
            this.setState({
                oneOnOneDates:dates
            }, () => {
                this.setState({
                    oneOnOneFrequency:event.target.value
                }, () => {
                    this.setState({
                        meetingDates: {...this.state.meetingDates, 'ONE_ON_ONE_FQY':this.state.oneOnOneFrequency}
                    }, () => {
                        this.setState({
                            meetingDates: { ...this.state.meetingDates, 'ONE_ON_ONE': this.state.oneOnOneDates }
                        }, () => {
                            this.props.onOneFqy(this.state.oneOnOneFrequency)
                            this.props.onOneDates(this.state.oneOnOneDates)
                            this.props.onAllDates(this.state.meetingDates)
                        }, () => {
                            console.log(this.state.meetingDates)
                        })
                    })
                })
            })
        } else {
            this.setState({
                oneOnOneFrequency:event.target.value
            }, () => {
                this.setState({
                    meetingDates: {...this.state.meetingDates, 'ONE_ON_ONE_FQY':this.state.oneOnOneFrequency}
                }, () => {
                    this.props.onOneFqy(this.state.oneOnOneFrequency)
                    this.props.onAllDates(this.state.meetingDates)
                })
            })
        }
    }

    handleFourOnOneChange = (event) => {
        event.persist();

        if (event.target.value < this.state.fourOnOneDates.length){
            let dates = [...this.state.fourOnOneDates]
            let diff = this.state.fourOnOneDates.length - event.target.value
            dates.splice(event.target.value, diff)
            console.log(dates)
            this.setState({
                fourOnOneDates:dates
            }, () => {
                this.setState({
                    fourOnOneFrequency:event.target.value
                }, () => {
                    this.setState({
                        meetingDates: {...this.state.meetingDates, 'FOUR_ON_ONE_FQY':this.state.fourOnOneFrequency}
                    }, () => {
                        this.setState({
                            meetingDates: { ...this.state.meetingDates, 'FOUR_ON_ONE': this.state.fourOnOneDates }
                        }, () => {
                            this.props.onFourFqy(this.state.fourOnOneFrequency)
                            this.props.onFourDates(this.state.fourOnOneDates)
                            this.props.onAllDates(this.state.meetingDates)
                            console.log(this.state.meetingDates)
                        })
                    })
                })
            })
        } else {
            this.setState({
                fourOnOneFrequency:event.target.value
            }, () => {
                this.setState({
                    meetingDates: {...this.state.meetingDates, 'FOUR_ON_ONE_FQY':this.state.fourOnOneFrequency}
                }, () => {
                    this.props.onAllDates(this.state.meetingDates)
                    this.props.onFourFqy(this.state.fourOnOneFrequency)
                })
            })
        }
    }

    handleMockInterviewChange = (event) => {
        event.persist();

        if (event.target.value < this.state.mockInterviewDates.length){
            let dates = [...this.state.mockInterviewDates]
            let diff = this.state.mockInterviewDates.length - event.target.value
            dates.splice(event.target.value, diff)
            console.log(dates)
            this.setState({
                mockInterviewDates:dates
            }, () => {
                this.setState({
                    mockInterviewFrequency:event.target.value
                }, () => {
                    this.setState({
                        meetingDates: {...this.state.meetingDates, 'MOCK_INTERVIEW_FQY':this.state.mockInterviewFrequency}
                    }, () => {
                        this.setState({
                            meetingDates: { ...this.state.meetingDates, 'MOCK_INTERVIEW': this.state.mockInterviewDates }
                        }, () => {
                            this.props.onMockFqy(this.state.mockInterviewFrequency)
                            this.props.onMockDates(this.state.mockInterviewDates)
                            this.props.onAllDates(this.state.meetingDates)
                            console.log(this.state.meetingDates)
                        })
                    })
                })
            })
        } else {
            this.setState({
                mockInterviewFrequency:event.target.value
            }, () => {
                this.setState({
                    meetingDates: {...this.state.meetingDates, 'MOCK_INTERVIEW_FQY':this.state.mockInterviewFrequency}
                }, () => {
                    this.props.onAllDates(this.state.meetingDates)
                    this.props.onMockFqy(this.state.mockInterviewFrequency)
                })
            })
        }
    }

    handleOneMeetingDatesChange = (event) => {
        event.persist();
        const value = event.target.value;
        
        if(this.state.oneOnOneDates.some(date => date.id === event.target.id)){
            let dates = [...this.state.oneOnOneDates]
            let index = findDate(dates, 'id', event.target.id)
            dates.splice(index,1)

            this.setState({
                oneOnOneDates: dates,
            }, () => {
                this.setState({
                    oneOnOneDates: [...this.state.oneOnOneDates, { 'id': event.target.id, 'date': value }]
                }, () => {
                    this.setState({
                        meetingDates: { ...this.state.meetingDates, 'ONE_ON_ONE': this.state.oneOnOneDates }
                    }, () => {
                        this.props.onAllDates(this.state.meetingDates)
                        this.props.onOneDates(this.state.oneOnOneDates)
                        console.log(this.state.meetingDates)
                    })
                })
            })
        } else {
            this.setState({
                oneOnOneDates: [...this.state.oneOnOneDates, { 'id': event.target.id, 'date': value }]
            }, () => {
                this.setState({
                    meetingDates: { ...this.state.meetingDates, 'ONE_ON_ONE': this.state.oneOnOneDates }
                }, () => { 
                    this.props.onOneDates(this.state.oneOnOneDates)
                    this.props.onAllDates(this.state.meetingDates)
                    console.log(this.state.meetingDates) 
                })
            })
        }
    }

    handleFourMeetingDatesChange = (event) => {
        event.persist();
        const value = event.target.value;

        if(this.state.fourOnOneDates.some(date => date.id === event.target.id)){
            let dates = [...this.state.fourOnOneDates]
            let index = findDate(dates, 'id', event.target.id)
            dates.splice(index,1)

            this.setState({
                fourOnOneDates: dates,
            }, () => {
                this.setState({
                    fourOnOneDates: [...this.state.fourOnOneDates, { 'id': event.target.id, 'date': value }]
                }, () => {
                    this.setState({
                        meetingDates: { ...this.state.meetingDates, 'FOUR_ON_ONE': this.state.fourOnOneDates }
                    }, () => { 
                        this.props.onAllDates(this.state.meetingDates)
                        this.props.onFourDates(this.state.fourOnOneDates)
                        console.log(this.state.meetingDates) 
                    })
                })
            })
        } else {
            this.setState({
                fourOnOneDates: [...this.state.fourOnOneDates, { 'id': event.target.id, 'date': value }]
            }, () => {
                this.setState({
                    meetingDates: { ...this.state.meetingDates, 'FOUR_ON_ONE': this.state.fourOnOneDates }
                }, () => { 
                    this.props.onFourDates(this.state.fourOnOneDates)
                    this.props.onAllDates(this.state.meetingDates)
                    console.log(this.state.meetingDates) 
                })
            })
        }
    }

    handleMockMeetingDatesChange = (event) => {
        event.persist();
        const value = event.target.value;

        if(this.state.mockInterviewDates.some(date => date.id === event.target.id)){
            let dates = [...this.state.mockInterviewDates]
            let index = findDate(dates, 'id', event.target.id)
            dates.splice(index,1)

            this.setState({
                mockInterviewDates: dates,
            }, () => {
                this.setState({
                    mockInterviewDates: [...this.state.mockInterviewDates, { 'id': event.target.id, 'date': value }]
                }, () => {
                    this.setState({
                        meetingDates: { ...this.state.meetingDates, 'MOCK_INTERVIEW': this.state.mockInterviewDates }
                    }, () => { 
                        this.props.onAllDates(this.state.meetingDates)
                        this.props.onMockDates(this.state.mockInterviewDates)
                        console.log(this.state.meetingDates) 
                    })
                })
            })
        } else {
            this.setState({
                mockInterviewDates: [...this.state.mockInterviewDates, { 'id': event.target.id, 'date': value }]
            }, () => {
                this.setState({
                    meetingDates: { ...this.state.meetingDates, 'MOCK_INTERVIEW': this.state.mockInterviewDates }
                }, () => { 
                    this.props.onMockDates(this.state.mockInterviewDates)
                    this.props.onAllDates(this.state.meetingDates)
                    console.log(this.state.meetingDates) 
                })
            })
        }
    }


    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="lg">
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="center">

                    <div className={classes.form}>
                        <Tooltip>
                            <b className={classes.chatTypeText}>Please Select the types of meeting you will be available for:</b>
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
                        <Grid
                            container
                            item xs={12}
                            alignItems="center"
                            justify="center">

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="outlined-select-education"
                                    className={classes.chatFreqQuestion}
                                    fullWidth
                                    select
                                    label="Number of 1-on-1 Chats per year"
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
                        </Grid>
                        <br />
                        <Grid
                            container
                            item
                            xs={12}
                            direction="row"
                            alignItems="center"
                            justify="center"
                        >

                            {[...Array(this.state.oneOnOneFrequency)].map((elementInArray, index) => (

                                <Grid
                                    item
                                    xs={6} sm={4} md={3} lg={2}
                                    alignItems="center"
                                    justify="center"
                                >
                                    <div className={classes.dateInput} key={index}>
                                        <TextField
                                            required
                                            label={`Date ${index + 1}`}
                                            variant="outlined"
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            type="date"
                                            id={`${index}`}
                                            onChange={this.handleOneMeetingDatesChange}
                                        />
                                    </div>
                                </Grid>
                            )
                            )
                            }
                        </Grid>
                        <br />
                        {this.state.fourOnOne === true &&
                            <div>
                                <Grid
                                    container
                                    item xs={12}
                                    alignItems="center"
                                    justify="center">
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="outlined-select-education"
                                            className={classes.chatFreqQuestion}
                                            fullWidth
                                            select
                                            label="Number of 4-on-1 Chats per year"
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
                                </Grid>
                                <br />
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    direction="row"
                                    alignItems="center"
                                    justify="center"
                                >
                                    {[...Array(this.state.fourOnOneFrequency)].map((elementInArray, index) => (
                                        <Grid
                                            item
                                            xs={6} sm={4} md={3} lg={2}
                                            alignItems="center"
                                            justify="center"
                                        >
                                            <div className={classes.dateInput} key={index}>
                                                <TextField
                                                    label={`Date ${index + 1}`}
                                                    variant="outlined"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                    type="date"
                                                    id={`${index}`}
                                                    min={this.state.date}
                                                    onChange={this.handleFourMeetingDatesChange}
                                                />
                                            </div>
                                        </Grid>
                                    ))}

                                </Grid>
                            </div>

                        }
                        <br />
                        {this.state.mockInterview &&
                            <div>
                                <Grid
                                    container
                                    item xs={12}
                                    alignItems="center"
                                    justify="center">
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="outlined-select-education"
                                            className={classes.chatFreqQuestion}
                                            fullWidth
                                            select
                                            label="Number of Mock Interviews per year"
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
                                </Grid>
                                <br />
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    direction="row"
                                    alignItems="center"
                                    justify="center"
                                >
                                    {[...Array(this.state.mockInterviewFrequency)].map((elementInArray, index) => (

                                        <Grid
                                            item
                                            xs={6} sm={4} md={3} lg={2}
                                            alignItems="center"
                                            justify="center"
                                        >
                                            <div className={classes.dateInput} key={index}>
                                                <TextField
                                                    label={`Date ${index + 1}`}
                                                    variant="outlined"
                                                    fullWidth
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                    type="date"
                                                    id={`${index}`}
                                                    min={this.state.date}
                                                    onChange={this.handleMockMeetingDatesChange}
                                                />

                                            </div>
                                        </Grid>
                                    )
                                    )
                                    }
                                </Grid>
                            </div>
                        }
                    </div>
                </Grid>
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
                            <b>Please fill out all the required fields properly</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialog} color="primary">
                            <b>Close</b>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
}


SeniorExec = withMyHook(SeniorExec);

export default SeniorExec;