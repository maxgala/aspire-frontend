import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaxBrand from "../Images/max_brand_logo.png";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LinearWithValueLabel from "./linearprogress";
import Button from "@material-ui/core/Button";
import ThirdPage from "./ThirdPage";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SeniorExecutive from "../Images/senior_exec_membership.png";
import AspiringMember from "../Images/aspiring_prof_membership.png";

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
        marginTop: '0vh',
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
    }
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class FinalPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
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
            resumeURL: this.props.prev ? this.props.prev.resumeURL : '',
            profilePicURL: this.props.prev ? this.props.prev.profilePicURL : '',
            senior_executive: this.props.prev ? this.props.prev.senior_executive : false,
            progress: 100,
            checked: false,
            open: false
        }
    }

    changeToPage3 = (event) => {
        this.props.appContext.setState({
            registrationScreen: <ThirdPage appContext={this.props.appContext} prev={this.state}/>
        })
    };

    handleClose = event =>{
        this.setState({
            open: false,
            checked: false
        })
    };

    handleAccept = event => {
        this.setState({
            open: false,
            checked: true
        })
    };

    handleUserChoice = (event) => {
        if (this.state.senior_executive ===  false){
            this.setState({
                senior_executive: true,
            })
        }else{
            this.setState({
                senior_executive: false,
            })
        }
    };

    readConditions = (event) => {
        this.setState({
            open: true
        })
    };

    render() {
        const classes = this.props.classes;
        return(
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <img src={MaxBrand} alt="MAX_brand" className={classes.avatar}/>
                    <Typography component="h1" variant="h5">
                        Registration Info
                    </Typography>
                </div>
                <div className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.senior_executive}
                                            onChange={this.handleUserChoice}
                                            name="checkedD"
                                        />}
                                    label={
                                        <Tooltip title={
                                            <p>Senior Executive means the chief executive officer,
                                                chief operating officer, chief financial officer, or
                                                anyone in charge of a principal business unit or function.
                                            </p>}>
                                            <b>I would like to be considered as a Senior Executive</b>
                                        </Tooltip>
                                    }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.titlePaper}>
                                <Typography component="h1" variant="h5">
                                    Memberships
                                </Typography>
                            </div>
                        </Grid>
                        <div style={{display: window.innerWidth < 480 ? '' : 'inline-flex'}}>
                            <Card className={classes.cardRoot}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={AspiringMember}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <b> Mentee </b>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button fullWidth className={classes.payButton} color="primary">
                                        <b>Try for Free</b>
                                    </Button>
                                </CardActions>
                            </Card>
                            <Card className={classes.cardRoot}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={SeniorExecutive}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <b> Mentee </b>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button fullWidth className={classes.payButton} color="primary">
                                        <b>Sign Up for Premium</b>
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checked}
                                        onChange={event => {this.setState({checked: !this.state.checked})}}
                                        name="checkedD"
                                    />}
                                label={<b>I agree to the <Tooltip title={"Click on me to read the Terms and Conditions"}>
                                    <u onClick={this.readConditions} style = {{color: 'red'}}> terms and conditions </u>
                                </Tooltip> </b>}
                            />
                        </Grid>
                    </Grid>
                    <LinearWithValueLabel progress={this.state.progress}/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit_back}
                        onClick={this.changeToPage3}
                    >
                        <b>Previous</b>
                    </Button>
                    <Button
                        disabled={!this.state.checked}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        <b>Submit</b>
                    </Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    scroll={"paper"}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title"><h2><strong>Terms and Conditions</strong></h2></DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <p>Welcome to MAX Aspire!</p>

                            <p>These terms and conditions outline the rules and regulations for the use of Max Gala's Website, located at https://max-aspire-frontend.herokuapp.com/.</p>

                            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use MAX Aspire if you do not agree to take all of the terms and conditions stated on this page. Our Terms and Conditions were created with the help of the <a href="https://www.termsandconditionsgenerator.com">Terms And Conditions Generator</a> and the <a href="https://www.privacypolicyonline.com/terms-conditions-generator/Terms.js">Free Terms & Conditions Generator</a>.</p>

                            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                            <h3><strong>Cookies</strong></h3>

                            <p>We employ the use of cookies. By accessing MAX Aspire, you agreed to use cookies in agreement with the Max Gala's Privacy Policy.</p>

                            <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                            <h3><strong>License</strong></h3>

                            <p>Unless otherwise stated, Max Gala and/or its licensors own the intellectual property rights for all material on MAX Aspire. All intellectual property rights are reserved. You may access this from MAX Aspire for your own personal use subjected to restrictions set in these terms and conditions.</p>

                            <p>You must not:</p>
                            <ul>
                                <li>Republish material from MAX Aspire</li>
                                <li>Sell, rent or sub-license material from MAX Aspire</li>
                                <li>Reproduce, duplicate or copy material from MAX Aspire</li>
                                <li>Redistribute content from MAX Aspire</li>
                            </ul>

                            <p>This Agreement shall begin on the date hereof.</p>

                            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Max Gala does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Max Gala,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Max Gala shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

                            <p>Max Gala reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                            <p>You warrant and represent that:</p>

                            <ul>
                                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                            </ul>

                            <p>You hereby grant Max Gala a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

                            <h3><strong>Hyperlinking to our Content</strong></h3>

                            <p>The following organizations may link to our Website without prior written approval:</p>

                            <ul>
                                <li>Government agencies;</li>
                                <li>Search engines;</li>
                                <li>News organizations;</li>
                                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
                            </ul>

                            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

                            <p>We may consider and approve other link requests from the following types of organizations:</p>

                            <ul>
                                <li>commonly-known consumer and/or business information sources;</li>
                                <li>dot.com community sites;</li>
                                <li>associations or other groups representing charities;</li>
                                <li>online directory distributors;</li>
                                <li>internet portals;</li>
                                <li>accounting, law and consulting firms; and</li>
                                <li>educational institutions and trade associations.</li>
                            </ul>

                            <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Max Gala; and (d) the link is in the context of general resource information.</p>

                            <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

                            <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Max Gala. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

                            <p>Approved organizations may hyperlink to our Website as follows:</p>

                            <ul>
                                <li>By use of our corporate name; or</li>
                                <li>By use of the uniform resource locator being linked to; or</li>
                                <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
                            </ul>

                            <p>No use of Max Gala's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

                            <h3><strong>iFrames</strong></h3>

                            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

                            <h3><strong>Content Liability</strong></h3>

                            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

                            <h3><strong>Your Privacy</strong></h3>

                            <p>Please read Privacy Policy</p>

                            <h3><strong>Reservation of Rights</strong></h3>

                            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                            <h3><strong>Removal of links from our website</strong></h3>

                            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

                            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

                            <h3><strong>Disclaimer</strong></h3>

                            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

                            <ul>
                                <li>limit or exclude our or your liability for death or personal injury;</li>
                                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                            </ul>

                            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

                            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.disagree}
                        >
                            <b>Disagree</b>
                        </Button>
                        <Button
                            onClick={this.handleAccept}
                            variant="contained"
                            type="submit"
                            color="primary"
                            className={classes.agree}
                        >
                            <b>Agree</b>
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        );
    }
}

FinalPage = withMyHook(FinalPage);
export default FinalPage;

/*
<div style={{display: window.innerWidth < 480 ? '' : 'inline-flex'}}>
                            <Grid item xs={12}>
                                <Card className={classes.cardRoot}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={AspiringMember}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card className={classes.cardRoot}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={SeniorExecutive}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Lizard
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                                across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </div>
 */