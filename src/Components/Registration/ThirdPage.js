import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaxBrand from "../Images/max_brand_logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinearWithValueLabel from "./linearprogress";
import { DropzoneDialog } from 'material-ui-dropzone';
import SecondPage from "./SecondPage";
import Tooltip from "@material-ui/core/Tooltip";
import S3FileUpload from 'react-s3';
import FinalPage from "./FinalPage";
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withRouter } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Routes } from "../../entry/routes/Routes";

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
    uploadText: {
        margin: theme.spacing(2, 0, 1),
        '@media (max-width: 480px)': { width: '180px' },
        width: '200px',
    },
    uploadImage: {
        marginLeft: theme.spacing(1, 0, 1),
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
    profilePic: {
        margin: theme.spacing(3, 0, 2),
        width: '120px',
        height: 'auto',
        borderRadius: '50%'
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
    textAlignment: {
        marginLeft: '10%',
        margin: theme.spacing(1, 0, 1),
        textAlign: 'left'
    }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes} />
    }
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ThirdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            mentor: false,
            resumeURL: "",
            profilePicURL: "",
            open: false,
            fileDialogOpen: false,
            imageFiles: [],
            resumeFiles: [],
            profilePicPreviewText: 'Upload your Profile Photo *',
            profilePicButtonText: 'Upload',
            resumeUploadText: 'Upload your Resume *',
            resumeButtonText: 'Upload',
            progress: 75,
            filePreview: [],
            dialogueOpen: false,
        };
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleDialog = (event) => {
        this.setState({
            dialogueOpen: !this.state.dialogueOpen
        })
    };

    uploadToS3(file, folder, resume = true) {
        let config = {
            bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
            dirName: this.state.email + '/' + folder, /* will change based on users */
            region: 'us-east-1',
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        };
        let page = this
        S3FileUpload
            .uploadFile(file, config)
            .then(data => {
                if (!resume) {
                    page.setState({
                        profilePicURL: data.location
                    })
                } else {
                    page.setState({
                        resumeURL: data.location
                    })
                }
            })
            .catch(err => console.error(err))
    };

    handleResumeSave(resume) {
        this.setState({
            resumeUploadText: resume[0]['name'],
            resumeButtonText: 'Upload Again',
            fileDialogOpen: false,
            resumeFiles: resume
        });
        this.uploadToS3(resume[0], 'resumes', true);
    }

    handleSave(files) {
        let document = "";
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        let page = this;
        reader.onload = function () {
            // Saving files to state for further use and closing Modal.
            document = reader.result;
            page.setState({
                profilePicPreviewText: files[0].name,
                profilePicButtonText: 'Upload Again',
                imageFiles: [document],
                open: false
            });
            page.uploadToS3(files[0], 'pictures', false);
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
        this.props.history.push(`${Routes.Register}/2`)
    };
    changeToFinalPage = (event) => {
        if (this.state.resumeURL === "" || this.state.profilePicURL === "") {
            this.setState({
                dialogueOpen: true
            });
        } else {
            this.props.setPrev(this.state);
            this.props.history.push(`${Routes.Register}/4`)
        }
    };

    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={MaxBrand} alt="MAX_brand" className={classes.avatar} />
                    <Typography component="h1" variant="h5">
                        Registration
                    </Typography>
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {this.state.imageFiles.map((file, i) => {
                                    return <img key={i} src={file} alt={"profile-pic"} className={classes.profilePic} />
                                })}
                            </Grid>
                            <Grid item xs={12} className={classes.textAlignment}>
                                <div style={{ display: 'inline-flex' }}>
                                    <Typography className={classes.uploadText} component="h6" variant="subtitle2">
                                        <b>{this.state.profilePicPreviewText}</b>
                                        <Tooltip title={"For various reasons"}>
                                            <Typography variant="caption" style={{ color: 'grey', cursor: 'pointer' }} display="block" gutterBottom>
                                                Why am I being asked about this?
                                            </Typography>
                                        </Tooltip>
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

                            <Grid item xs={12} className={classes.textAlignment}>
                                <div style={{ display: 'inline-flex' }}>
                                    <Typography className={classes.uploadText} component="h6" variant="subtitle2">
                                        <b>{this.state.resumeUploadText}</b>
                                        <Tooltip title={"For various reasons"}>
                                            <Typography variant="caption" style={{ color: 'grey', cursor: 'pointer' }} display="block" gutterBottom>
                                                Why am I being asked about this?
                                            </Typography>
                                        </Tooltip>
                                    </Typography>
                                    <Button className={classes.uploadImage} onClick={event => this.setState({ fileDialogOpen: true })}>
                                        <b>
                                            {this.state.resumeButtonText}
                                        </b>
                                    </Button>
                                </div>
                                <DropzoneDialog
                                    open={this.state.fileDialogOpen}
                                    onSave={this.handleResumeSave.bind(this)}
                                    acceptedFiles={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessing']}
                                    maxFileSize={5000000}
                                    onClose={event => { this.setState({ fileDialogOpen: false }) }}
                                    filesLimit={1}
                                    fileObjects={this.state.resumeFiles}
                                />
                            </Grid>
                        </Grid>
                        <LinearWithValueLabel progress={this.state.progress} />
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
                            onClick={this.changeToFinalPage}
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
                    <DialogTitle id="alert-dialog-slide-title">{"Resume and Profile picture are required!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <b>Please provide a Resume and a Profile picture to proceed</b>
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
ThirdPage = withRouter(ThirdPage);
export default ThirdPage;