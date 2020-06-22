import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaxBrand from "../Images/max_brand_logo.png";
import FirstPage from "./FirstPage";
import LinearWithValueLabel from './linearprogress';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Industries from './industry';
import IndustryTags from './industry_tags';
import Country from "./Country";
import States from './States';
import Education from "./Education";
import Province from "./Provinces";
import ThirdPage from "./ThirdPage";
import Chip from "@material-ui/core/Chip";

const IndustryLabels = [];
for (let i=0; i < Industries.length; ++i){
    IndustryLabels.push(Industries[i]["name"])
}

const IndustryTagsLabels = [];
for (let i=0; i < IndustryTags.length; ++i){
    IndustryTagsLabels.push(IndustryTags[i]["name"]);
}
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    formControl:{
        width: '100%'
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
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
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
    label: {
        fontSize: 'larger'
    }
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class SecondPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.prev ? this.props.prev.firstName : '',
            lastName: this.props.prev ? this.props.prev.lastName : '',
            phone: this.props.prev ? this.props.prev.phone : '',
            email: this.props.prev ? this.props.prev.email : '',
            password: this.props.prev ? this.props.prev.password : '',
            ageGroup: this.props.prev ? this.props.prev.ageGroup : '',
            progress: 50,
            industry: this.props.prev ? this.props.prev.industry : '',
            industry_tags: this.props.prev ? this.props.prev.industry_tags : [],
            title: this.props.prev ? this.props.prev.title : '',
            company: this.props.prev ? this.props.prev.company : '',
            education: this.props.prev ? this.props.prev.education : '',
            province: this.props.prev ? this.props.prev.province : '',
            country: this.props.prev ? this.props.prev.country : '',
            states: this.props.prev ? this.props.prev.states : '',
            senior_executive: this.props.prev ? this.props.prev.senior_executive : false,
            dialogueOpen: false,
            displayProvince: 'None',
            displayStates: 'None',
            customIndustryDisplay: 'None'
        }
    }

    handleProvinceChange = (event) => {
        this.setState({
            states: '',
            province: event.target.value
        })
    };

    handleStateChange = (event) => {
        this.setState({
            states: event.target.value,
            province: ''
        })
    };
    handleCountryChange = (event) => {
        this.setState({
            country: event.target.value,
            displayStates: event.target.value === 'USA' ? '' : 'None',
            displayProvince: event.target.value === 'CA' ? '' : 'None'
        });
    };

    handleIndustryChange = (event) => {
        this.setState({
            industry: event.target.value
        })
    };

    handleEducationChange = (event) => {
        this.setState({
            education: event.target.value
        })
    };

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    };

    handleCompanyChange = (event) => {
        this.setState({
            company: event.target.value
        })
    };

    changeToPage1 = (event) => {
        this.props.appContext.setState({
            registrationScreen: <FirstPage appContext={this.props.appContext} prev={this.state}/>
        })
    };

    changeToPage3 = (event) => {
        if (this.state.industry === '' || this.state.industry === undefined ||
            this.state.title === '' || this.state.title === undefined ||
            this.state.company === '' || this.state.company === undefined ||
            this.state.education === '' || this.state.education === undefined ||
            this.state.country === '' || this.state.country === undefined){
            this.setState({
                dialogueOpen: true
            });
            return;
        }
        this.props.appContext.setState({
            registrationScreen: <ThirdPage appContext={this.props.appContext} prev={this.state}/>
        })
    };

    setIndustryTags = (event) => {
        this.setState({
            industry_tags: event.target.value
        })
    };

    handleDialog = (event) => {
        this.setState({
            dialogueOpen: !(this.state.dialogueOpen)
        })
    };

    componentDidMount() {
        if (this.state.country === 'CA'){
            this.setState({
                displayProvince: '',
                states: ''
            })
        }else if (this.state.country === 'USA'){
            this.setState({
                displayStates: '',
                province: ''
            })
        }
    }

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
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-select-education"
                                    required
                                    fullWidth
                                    select
                                    label="Industry"
                                    value={this.state.industry}
                                    onChange={this.handleIndustryChange}
                                    variant="outlined"
                                >
                                    {IndustryLabels.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel className={classes.label} id="industry-mutiple-checkbox-label">Select Tags (Up to 3)</InputLabel>
                                    <Select
                                        labelId="industry-mutiple-checkbox-label"
                                        id="industry-mutiple-checkbox"
                                        multiple
                                        value={this.state.industry_tags}
                                        onChange={this.setIndustryTags}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                    >
                                        {IndustryTagsLabels.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox checked={this.state.industry_tags.indexOf(name) > -1} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title/Position"
                                    name="title"
                                    autoComplete="title"
                                    value={this.state.title}
                                    onChange={this.handleTitleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="company"
                                    label="Company"
                                    name="company"
                                    autoComplete="company"
                                    value={this.state.company}
                                    onChange={this.handleCompanyChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-select-education"
                                    required
                                    fullWidth
                                    select
                                    label="Highest Level of Education"
                                    value={this.state.education}
                                    onChange={this.handleEducationChange}
                                    variant="outlined"
                                >
                                    {Education.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-select-education"
                                    required
                                    fullWidth
                                    select
                                    label="Country"
                                    value={this.state.country}
                                    onChange={this.handleCountryChange}
                                    variant="outlined"
                                >
                                    {Country.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid style={{display: this.state.displayStates}} item xs={12}>
                                <TextField
                                    id="outlined-select-education"
                                    required
                                    fullWidth
                                    select
                                    label="States"
                                    value={this.state.states}
                                    onChange={this.handleStateChange}
                                    variant="outlined"
                                >
                                    {States.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid style={{display: this.state.displayProvince}} item xs={12}>
                                <TextField
                                    id="outlined-select-education"
                                    required
                                    fullWidth
                                    select
                                    label="Province/Territories"
                                    value={this.state.province}
                                    onChange={this.handleProvinceChange}
                                    variant="outlined"
                                >
                                    {Province.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <LinearWithValueLabel progress={this.state.progress}/>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit_back}
                            onClick={this.changeToPage1}
                        >
                            <b>Previous</b>
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.changeToPage3}
                        >
                            <b>Next</b>
                        </Button>
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
                            <b> Please fill out all the required fields </b>
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

SecondPage = withMyHook(SecondPage);
export default SecondPage;