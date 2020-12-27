import React, { Component } from "react";
import Membership from "../Images/membership.jpg";
import freeMembership from "../Images/free-membership.jpg";
import premiumMembership from "../Images/premium-membership.jpg";
import platinumMembership from "../Images/platinum-membership.jpg";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "250px",
    paddingBottom: "30px",
    objectFit: "cover",
  },
  card: {
    height: "100%",
    backgroundColor: "white",
    border: "1px solid black",
  },
  membership_type_text: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "28px",
    color: "white",
    textAlign: "center",
    marginTop: "-200px",
  },
  front_text: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "22px",
    paddingBottom: "10px",
    color: "white",
    textAlign: "center",
  },
  small_text: {
    fontFamily: "Montserrat",
    fontSize: "18px",
    fontWeight: "1",
    textAlign: "left",
    marginLeft: "10%",
    marginRight: "10%",
    height: "200px",
    color: "#484848",
  },
  payment: {
    borderRadius: "50%",
    width: "170px",
    height: "170px",
    padding: "10px",
    background: "#f7f7f7",
    color: "white",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "-20px",
    position: "relative",
  },
  number: {
    fontSize: "60px",
    marginTop: "30px",
  },
  month: {
    fontSize: "20px",
    marginTop: "30px",
  },
  button: {
    textTransform: "none",
    backgroundColor: "#f7f7f7",
    fontFamily: "sans-serif",
    marginTop: "2%",
    marginBottom: "6%",
    borderRadius: 50,
    color: "black",
    width: "90%",
    maxWidth: "250px",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
    "@media (max-width: 480px)": {
      marginTop: "10%",
    },
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class MembershipCard extends Component {
  render() {
    const classes = this.props.classes;

    const membType = this.props.membership_type_text;
    let membImg;
    if (membType === "Free") {
      membImg = <img className={classes.image} src={freeMembership} alt="Membership" />;
    } else if (membType === "Premium") {
      membImg = <img className={classes.image} src={premiumMembership} alt="Membership" />;
    } else {
      membImg = <img className={classes.image} src={platinumMembership} alt="Membership" />;
    }



    return (
      <div id="membership">
        <div className={classes.card}>
          <div>

            {membImg}
            {/* <img className={classes.image} src={Membership} alt="Membership" /> */}
            <h2 className={classes.membership_type_text}>
              {this.props.membership_type_text}
            </h2>
            <h2 className={classes.front_text}>{this.props.front_text}</h2>
            <div className={classes.payment} style={this.props.payment}>
              <div className={classes.number}>
                {this.props.number}
                <span className={classes.month}> /y</span>
              </div>
            </div>
          </div>
          <h2 className={classes.small_text}>{this.props.description}</h2>
          <Button
            className={classes.button}
            variant="contained"
            onClick={this.props.buttonFunction}
          >
            <b>{this.props.buttonText}</b>
          </Button>
        </div>
      </div>
    );
  }
}

MembershipCard = withMyHook(MembershipCard);
export default MembershipCard;
