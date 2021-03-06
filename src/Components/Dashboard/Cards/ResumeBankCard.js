import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Document, Page } from "react-pdf";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import GetApp from "@material-ui/icons/GetApp";

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    maxWidth: "370px",
    height: "230px",
    margin: "auto",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "black",
    boxShadow: "0px 6px 6px #00000029",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    "@media (max-width: 480px)": {
      marginRight: "0px",
    },
    overflow: "hidden",
  },
  image: {
    width: "100px",
    height: "100px",
    "@media (max-width: 480px)": {
      width: "70px",
      height: "70px",
      // marginTop: '20px',
      marginLeft: "0px",
      marginRight: "0px",
    },
    textAlign: "left",
    borderRadius: "50%",
    margin: "auto",
    // marginTop: '30px',
    marginLeft: "20px",
    marginRight: "20px",
    display: "inline-block",
    objectFit: "cover",
  },

  cardInfo: {
    // marginTop: '30px',
    textAlign: "left",
    "@media (max-width: 480px)": {
      marginTop: "20px",
    },
  },

  name: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bolder",
    width: "100%",
    paddingTop: "5px",
    fontSize: "20px",
    "@media (max-width: 700px)": {
      fontSize: "18px",
    },
    "@media (max-width: 320px)": {
      fontSize: "16px",
    },
    color: "#58595B",
    margin: "0px",
    marginLeft: "10px",
  },
  title: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "semi-bold",
    width: "100%",
    fontSize: "16px",
    "@media (max-width: 480px)": {
      fontSize: "14px",
    },
    color: "#58595B",
    margin: "0px",
    marginLeft: "10px",
    marginTop: "5px",
  },
  subtitle: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "semi-bold",
    width: "100%",
    fontSize: "15px",
    "@media (max-width: 480px)": {
      fontSize: "13px",
    },
    color: "#58595B",
    margin: "0px",
    marginLeft: "10px",
    marginTop: "5px",
  },
  company: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    margin: "0px",
    marginLeft: "10px",
    marginTop: "5px",
    color: "white",
  },
  button_container: {
    alignItems: "center",
    justify: "center",
    margin: "22px",
    "@media (max-width: 480px)": {
      margin: "10px",
    },
  },
  button: {
    fontSize: "12px",
    "@media (max-width: 480px)": {
      fontSize: "10px",
    },
    fontWeight: "400",
    borderRadius: 75,
    backgroundColor: "#455E6A",
    color: "##FFFFFF",
    "&:hover": {
      backgroundColor: "#455E6A1",
      color: "##FFFFFF",
    },
  },
  container: {
    width: "calc(95% - 5px)",
    display: "inline-block",
    margin: "auto",
    // transform: 'translate(45%, -65%)'
  },
  company_icon: {
    width: "18px",
    height: "18px",
    marginRight: "15px",
  },
  outer_grid: {
    height: "180px",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class JobApplicationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume_popup: false,
      num_pages: 0,
      user_type: JSON.parse(localStorage.getItem("userProfile"))[
        "custom:user_type"
      ],
    };
  }

  renderResume = () => {
    this.setState({ resume_popup: true });
  };

  handleClose = () => {
    this.setState({ resume_popup: false });
  };

  onResumeLoad = ({ numPages }) => {
    this.setState({ num_pages: numPages });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <Grid
          container
          item
          xs={12}
          spacing={1}
          alignItems="center"
          justify="space-between"
          className={classes.outer_grid}
        >
          <Grid
            container
            item
            xs={12}
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <Grid
              container
              item
              xs={6}
              sm={6}
              spacing={0}
              alignItems="flex-start"
              justify="center"
            >
              <img
                className={classes.image}
                src={this.props.data.attributes["picture"]}
                alt={"Coffee Chat Card"}
              />
            </Grid>

            <Grid
              container
              item
              xs={6}
              sm={6}
              spacing={0}
              alignItems="flex-start"
              justify="center"
            >
              <div className={classes.cardInfo}>
                <h1 className={classes.name}>
                  {this.props.data.attributes["given_name"]}{" "}
                  {this.props.data.attributes["family_name"]}
                </h1>
                <p className={classes.title}>
                  {this.props.data.attributes["custom:position"]}
                </p>
                <span className={classes.subtitle}>
                  <span>
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className={classes.company_icon}
                    />
                  </span>
                  {this.props.data.attributes["custom:company"]}
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <span className={classes.button_container}>
              {this.state.user_type === "MENTOR" ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => this.renderResume()}
                >
                  View Resume
                </Button>
              ) : null}
            </span>
          </Grid>
        </Grid>

        <Dialog
          open={this.state.resume_popup}
          onClose={this.handleClose}
          scroll={"paper"}
          fullWidth={true}
          maxWidth={"md"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <div>
              <h2>
                <span>
                  {this.props.data.attributes["given_name"]}{" "}
                  {this.props.data.attributes["family_name"]}'s Resume
                </span>
                <a
                  href={this.props.data.attributes["custom:resume"]}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    color="primary"
                    aria-label="Download Resume"
                    component="span"
                  >
                    <GetApp />
                  </IconButton>
                </a>
              </h2>
            </div>
          </DialogTitle>
          <DialogContent style={{ overflowX: "hidden" }}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              component={"span"}
            >
              <div style={{ margin: "auto", height: "100%" }}>
                <Document
                  file={this.props.data.attributes["custom:resume"]}
                  onLoadSuccess={this.onResumeLoad}
                >
                  {Array.from(new Array(this.state.num_pages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={Math.min(900, window.innerWidth - 100)}
                    />
                  ))}
                </Document>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
