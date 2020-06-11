import React, {Component} from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaxBrand from "../Images/max_brand_logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinearWithValueLabel from "./linearprogress";
import {DropzoneDialog} from 'material-ui-dropzone';
import SecondPage from "./SecondPage";

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
    uploadText: {
      margin: theme.spacing(1, 0, 1)
    },
    uploadImage:{
        marginLeft: theme.spacing(3),
        backgroundColor: "#6EA0B5",
        height: 50,
        color: "white",
        '&:hover': {
            backgroundColor: "#F1F1F1",
            color: '#484848'
        }
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
    profilePic:{
        margin: theme.spacing(3, 0, 2),
        width: '120px',
        height: 'auto',
        borderRadius: '50%'
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
    textAlignment: {
        marginLeft: '10%',
        margin: theme.spacing(3,0,2),
        textAlign: 'left'
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

class ThirdPage extends Component{
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
            title: this.props.prev ? this.props.prev.title : '',
            company: this.props.prev ? this.props.prev.company : '',
            education: this.props.prev ? this.props.prev.education : '',
            province: this.props.prev ? this.props.prev.province : '',
            country: this.props.prev ? this.props.prev.country : '',
            states: this.props.prev ? this.props.prev.states : '',
            open: false,
            fileDialogOpen: false,
            imageFiles: [],
            resumeFiles: [],
            profilePicPreviewText: 'Upload a Photo',
            profilePicButtonText: 'Upload',
            resumeUploadText: 'Upload your Resume',
            resumeButtonText: 'Upload',
            progress: 75,
            dialogueOpen: false,
            filePreview: []
        };
        console.log(this.state)
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleResumeSave(resume){
        console.log(resume)
    }

    handleSave(files) {
        let document = "";
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let page = this;
        reader.onload = function () {
            console.log(files[0].name);
            // Saving files to state for further use and closing Modal.
            document = reader.result;
            page.setState({
                profilePicPreviewText: files[0].name,
                profilePicButtonText: 'Upload Again',
                imageFiles: [document],
                open: false
            })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }

    changeToPage2 = (event) => {
        this.props.appContext.setState({
            registrationScreen: <SecondPage appContext={this.props.appContext} prev={this.state}/>
        })
    };

    render() {
        const classes = this.props.classes;
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={MaxBrand} alt="MAX_brand" className={classes.avatar}/>
                    <Typography component="h1" variant="h5">
                        Registration Info
                    </Typography>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                { this.state.imageFiles.map((file,i) => {
                                    return <img key={i} src={file} alt={"profile-pic"} className={classes.profilePic}/>
                                }) }
                            </Grid>

                            <Grid xs={12} className={classes.textAlignment}>
                                <div style={{display: 'inline-flex'}}>
                                    <Typography className={classes.uploadText} component="h6" variant="h6">
                                        {this.state.profilePicPreviewText}
                                    </Typography>
                                    <Button className={classes.uploadImage} onClick={this.handleOpen.bind(this)}>
                                        <b>
                                            {this.state.profilePicButtonText}
                                        </b>
                                    </Button>
                                </div>
                                <DropzoneDialog
                                    open={this.state.open}
                                    onSave={this.handleSave.bind(this)}
                                    acceptedFiles={['image/*']}
                                    showPreviews={true}
                                    maxFileSize={5000000}
                                    onClose={this.handleClose.bind(this)}
                                    filesLimit={1}
                                    fileObjects={this.state.files}
                                />
                            </Grid>

                            <Grid xs={12} className={classes.textAlignment}>
                                <div style={{display: 'inline-flex'}}>
                                    <Typography className={classes.uploadText} component="h6" variant="h6">
                                        {this.state.resumeUploadText}
                                    </Typography>
                                    <Button className={classes.uploadImage} onClick={event => this.setState({fileDialogOpen: true})}>
                                        <b>
                                            {this.state.resumeButtonText}
                                        </b>
                                    </Button>
                                </div>
                                <DropzoneDialog
                                    open={this.state.fileDialogOpen}
                                    onSave={this.handleResumeSave.bind(this)}
                                    maxFileSize={5000000}
                                    onClose={event=>{this.setState({fileDialogOpen: false})}}
                                    filesLimit={1}
                                    fileObjects={this.state.resumeFiles}
                                />
                            </Grid>
                        </Grid>
                        <LinearWithValueLabel progress={this.state.progress}/>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit_back}
                            onClick={this.changeToPage2}
                        >
                            <b>Previous</b>
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
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

ThirdPage = withMyHook(ThirdPage);
export default ThirdPage;