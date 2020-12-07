import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { blankProfile } from "../../Images/faceShot/blank_profile.png";

const useStyles = makeStyles(() => ({
  card: {
    width: "95%",
    maxWidth: "400px",
    height: "450px",
    marginBottom: "10px",
    marginLeft: "7px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
    color: "black",
    boxShadow: "0px 6px 6px #00000029",
  },
  image: {
    width: "154px",
    height: "154px",
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "10px",
    marginRight: "10px",
    display: "block",
  },
  name: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bolder",
    width: "100%",
    textAlign: "center",
    paddingTop: "5px",
    fontSize: "28px",
    color: "#58595B",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  title: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "semi-bold",
    width: "100%",
    textAlign: "center",
    fontSize: "20px",
    color: "#58595B",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  subtitle: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "semi-bold",
    width: "100%",
    textAlign: "center",
    fontSize: "15px",
    color: "#58595B",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  company: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
    color: "white",
  },
  button_container: {
    alignItems: "flex-end",
    justify: "flex-end",
    margin: "24px",
  },
  button: {
    fontSize: "12px",
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
    width: "100%",
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
      showConnect: false,
    };
  }

  checkUserType = () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile["custom:user_type"] === "MENTOR") {
      this.setState({
        showConnect: true,
      });
    }
  };

  componentDidMount() {
    this.checkUserType();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <div className={classes.container}>
          <Grid
            container
            item
            xs={12}
            spacing={0}
            alignItems="center"
            justify="center"
            className={classes.outer_grid}
          >
            <Grid
              container
              item
              xs={12}
              spacing={0}
              alignItems="flex-start"
              justify="center"
            >
              <img
                className={classes.image}
                src={this.props.data.attributes["picture"]}
                alt={"Community Chat Card"}
              />
              <h1 className={classes.name}>
                {this.props.data.attributes["prefix"]}
                {this.props.data.attributes["given_name"]}{" "}
                {this.props.data.attributes["family_name"]}
              </h1>
              <p className={classes.title}>
                {this.props.data.attributes["custom:position"]}
              </p>
              {/* <p className={classes.subtitle}>{this.props.data.attributes["custom:industry"]}</p> */}
              <span className={classes.subtitle}>
                <span>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className={classes.company_icon}
                  />
                </span>
                {this.props.data.attributes["custom:company"]}
              </span>
            </Grid>
            <Grid
              container
              item
              xs={12}
              spacing={0}
              alignItems="center"
              justify="center"
            >
              {this.state.showConnect === false ? (
                ""
              ) : (
                <span className={classes.button_container}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!this.state.showConnect}
                  >
                    Connect
                  </Button>
                </span>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;
