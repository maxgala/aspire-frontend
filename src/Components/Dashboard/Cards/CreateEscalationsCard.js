import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../Images/faceShot/pic1.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatTypes from "../ChatTypes";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";

const useStyles = makeStyles(() => ({
  cardEscalation: {
    width: "95%",
    maxWidth: "500px",
    marginLeft: "5px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    backgroundColor: "#455E6A",
    color: "white",
    boxShadow: "0px 6px 6px #00000029",
  },
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "10px",
    marginRight: "20px",
    display: "inline-block",
  },
  image2: {
    width: "225px",
    height: "225px",
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "20px",
    marginRight: "20px",
    display: "inline-block",
  },
  title: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bolder",
    width: "100%",
    textAlign: "left",
    paddingTop: "5px",
    fontSize: "20px",
    color: "white",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  title2: {
    fontFamily: "myriad-pro, sans-serif",
    fontSize: "30px",
    width: "100%",
    textAlign: "left",
    paddingTop: "5px",
    color: "#7D7D7D",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "15px",
  },
  subtitle: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    color: "white",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  subtitle2: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    color: "black",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  name: {
    fontStyle: "italic",
    paddingRight: "5px",
    margin: "0px",
    marginTop: "5px",
  },
  date: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    fontSize: "15px",
    color: "white",
    margin: "0px",
    float: "left",
  },
  date2: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    fontSize: "15px",
    color: "black",
    margin: "0px",
    float: "left",
  },
  button_container: {
    alignItems: "flex-end",
    justify: "flex-end",
  },
  button: {
    fontSize: "8px",
    fontWeight: "400",
    borderRadius: 50,
    backgroundColor: "white",
    color: "#58595B",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  bar: {
    width: "90%",
    textAlign: "right",
    marginLeft: "0%",
    marginTop: "1%",
    marginBottom: "1%",
    height: 1,
    paddingBottom: "0",
  },
  container: {
    display: "inline-block",
    // transform: "translate(0%, -65%)",
  },
  containerCard: {
    display: 'inline-block',
    alignItems: 'center'
  },
  company_icon: {
    width: "18px",
    height: "18px",
    marginRight: "15px",
  },
  outer_grid: {
    height: "180px",
  },
  toolbar: {
    height: "8vh",
    backgroundColor: "#455E6A",
    boxShadow: "0px 0px 0px",
    width: "100%",
  },
  closes: {
    position: "absolute",
    right: "5%",
  },
  button2: {
    textTransform: "none",
    backgroundColor: "#000000",
    marginBottom: "2%",
    marginRight: "auto",
    marginTop: "20px",
    borderRadius: 50,
    color: "#FFFFFF",
    position: "relative",
    display: "block",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
    fontSize: "15px",
    fontWeight: "bold",
    fontFamily: "myriad-pro, sans-serif",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

function CreateEscalationsCard(props) {
  const classes = useStyles();
  return (
      <div className={classes.container}>
        <Grid
          container
          item
          xs={12}
          spacing={0}
          alignItems="center"
          justify="flex-start"
          className={classes.outer_grid}
        >
          <Grid
            container
            item
            xs={8}
            spacing={0}
            alignItems="center"
            justify="center"
            className = {classes.cardEscalation}
          >
            <div className={classes.containerCard}>
                <h1 className={classes.title}>
                Having Issues?
                </h1>
                <p className={classes.subtitle}>
                    If you would like to get support from the advanced team for an
                    important issue, please create a escalation below.
                </p>
                <span className={classes.button_container}>
                    <Button
                        // onClick={this.openCoffeeChat}
                        onClick={console.log("Press")}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Create Escalation
                    </Button>
                </span>
            </div>
          </Grid>
        </Grid>
      </div>
  );
}

export default CreateEscalationsCard;
