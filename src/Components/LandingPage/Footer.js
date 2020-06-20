import React, {Component} from "react";
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Newsletter from "../Images/newsletter.png";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { faFacebookF, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MailchimpSubscribe from "react-mailchimp-subscribe";

const useStyles = makeStyles(theme => ({
  newsletterText: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '40px',
    textAlign: 'left',
    margin: '0',
  },
  subscribeButton: {
    display: 'inline-block',
    width: '250px',
    height: '50px',
    fontSize: window.innerWidth < 885 ? '0.875rem' : '20px',
    backgroundColor: "#6EA0B5",
    borderRadius: 50,
    color: "white",
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  newsletter: {
    position: 'absolute',
    width: '100%',
    bottom: '0',
    paddingBottom: window.innerWidth < 590 ? '110px' : window.innerWidth < 1280 ? '140px' : '190px',
    textAlign: 'left',
    display: 'inline-block',
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  grid: { 
    paddingLeft: '5vw',
    paddingRight: '5vw',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '300px',
    marginBottom: '-10px',
    marginTop: '10vh'
  },
  input: {
    color: 'white',
    fontSize: '20px',
    padding: '20px',
    width: '100%'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

const CustomForm = ({ status, message, onValidated, classes }) => {
  let email;

  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value
    });

  const updateEmail = (event) => email = event.target;

  return (
    <Grid
      container
      item xs={12}
      spacing={1}
      className={classes.grid}
    >
      <Grid
        container
        item xs={12} lg={6}
        spacing={1}
      >
        <h1 className={classes.newsletterText}>Subscribe to our newsletter</h1>
      </Grid>
      <Grid
        container
        item xs={12} lg={3}
        spacing={1}
        alignItems="center"
        justify="flex-start"
      >
        {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
        {status === "error" && (
          <div
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "green" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        <TextField
          id="standard-basic"
          onChange={updateEmail}
          type="email"
          placeholder="yourEmail@email.com"
          InputProps={{className: classes.input}}/>
      </Grid>
      <Grid
        container
        item xs={12} lg={2}
        spacing={1}
        alignItems="center"
        justify="flex-start"
      >
        <Button onClick={submit} className={classes.subscribeButton} variant="contained">Subscribe</Button>
      </Grid>
    </Grid>
  );
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: process.env.MAILCHIMP_URL
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.toolbar}>
          <img className={classes.image} src={Newsletter} alt="Newsletter"/>
          <div className={classes.newsletter}>
            <MailchimpSubscribe
              url={this.state.url}
              render={({ subscribe, status, message }) => (
                <CustomForm
                  status={status}
                  message={message}
                  onValidated={formData => subscribe(formData)}
                  classes={classes}
                />
              )}
            />
          </div>
        </div>
        <div style={{width: '100%', height: '80px', margin: '0px', backgroundColor: 'black'}}>
          <a href="https://www.facebook.com/muslimawardsXgala/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', margin: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faFacebookF} style={{width: '30px', height: '30px', margin: '10px', padding: '0px'}}/></Button></a>
          <a href="https://www.instagram.com/max.gala/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', margin: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faInstagram} style={{width: '30px', height: '30px', margin: '10px', padding: '0px'}}/></Button></a>
          <a href="https://www.linkedin.com/company/max-muslim-awards/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', margin: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faLinkedin} style={{width: '30px', height: '30px', margin: '10px', padding: '0px'}}/></Button></a>
        </div>
      </div>
    );
  }
}

Footer = withMyHook(Footer);
export default Footer;
