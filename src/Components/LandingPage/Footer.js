import React, {Component} from "react";
import { Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Newsletter from "../Images/newsletter.png";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import { faFacebookF, faInstagram, faLinkedin, faReact , faTwitter} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MailchimpSubscribe from "react-mailchimp-subscribe";

const useStyles = makeStyles(theme => ({
  newsletterText: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: '36px',
    '@media (max-width: 480px)': {
      fontSize: '25px',
      marginTop: '5%'
    },
    textAlign: 'left',
    margin: '0',
    marginLeft: '20px',
  },
  subscribeButton: {
    textTransform: 'none',
    display: 'inline-block',
    width: '250px',
    height: '50px',
    '@media (max-width: 885px)': {fontSize: '0.875rem'},
    fontFamily: 'Nunito Sans',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: "#6EA0B5",
    borderRadius: 50,
    color: "white",
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  newsletter: {
    fontFamily: 'Nunito Sans',
    fontSize: '36px',
    fontWeight: 'bold',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6  )',
    width: '100%',
    
    '@media (max-width: 1280px)': {
      paddingBottom: '140px',
      '@media (max-width: 599px)': {paddingBottom: '110px'},
    },
    
    paddingBottom: '185px',
    textAlign: 'left',
    display: 'inline-block',
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  grid: { 
    paddingLeft: '5vw',
    paddingRight: '5vw',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  image: {
    width: '100%',
    height: '300px',
    marginBottom: '-10px',
    objectFit: 'cover',
  },

  socialIcons:{
    width: '30px',
    height: '30px',
    margin: '10px', 
    padding: '0px'
  },

  input: {
    color: 'white',
    border: '1px solid #8e8e8e',
    borderRadius: '20px',
    fontSize: '20px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '25px',
    paddingRight: '25px',
    '@media (max-width: 1280px)': {marginTop: '10px'},
    marginTop: '20px',
    marginBottom: '20px',
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
      id="footer"
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
        {status === "sending" && <div style={{ color: "blue", fontSize: '12px' }}>sending...</div>}
        {status === "error" && (
          <div
            style={{ color: "red", fontSize: '12px' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "green", fontSize: '12px' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        <TextField
          id="outlined"
          onChange={updateEmail}
          type="email"
          variant="standard"
          placeholder="email@maxaspire.com"
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
      url: process.env.REACT_APP_MAILCHIMP_URL
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
        <div style={{width: '100%', height: '80px', margin: '0px', backgroundColor: 'black', position: 'relative'}}>
          <a href="https://www.facebook.com/muslimawardsXgala/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', marginTop: '5px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faFacebookF} style={{width: '25px', height: '25px', margin: '10px', padding: '0px'}}/></Button></a>
          <a href="https://twitter.com/max_gala" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', marginTop: '5px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faTwitter} style={{width: '25px', height: '25px', margin: '10px', padding: '0px'}}/></Button></a>
          <a href="https://www.instagram.com/max.gala/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', marginTop: '5px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faInstagram} style={{width: '25px', height: '25px', margin: '10px', padding: '0px'}}/></Button></a>
          <a href="https://www.linkedin.com/company/max-muslim-awards/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', marginTop: '5px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon icon={faLinkedin} style={{width: '25px', height: '25px', margin: '10px', padding: '0px'}}/></Button></a>
          <a href="http://maxgala.com/" target="_blank" rel="noopener noreferrer"><Button style={{bottom: '0', color: '#d3d3d3', marginTop: '5px', marginBottom: '10px', paddingTop: '10px', paddingBottom: '0px', float: 'left'}}><FontAwesomeIcon  icon={faReact} style={{width: '25px', height: '25px', margin: '10px', padding: '0px'}}/></Button></a>
        </div>
      </div>
    );
  }
}

Footer = withMyHook(Footer);
export default Footer;
