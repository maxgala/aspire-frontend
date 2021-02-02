import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { blankProfile } from "../../Images/faceShot/blank_profile.png";
import { Auth } from "aws-amplify";
import { httpPost, S3Get } from "../../../lib/dataAccess";
import jwtDecode from "jwt-decode";
import { withSnackbar } from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";

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
    overflow: "hidden",
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
    objectFit: "cover",
  },
  name: {
    fontFamily: "myriad-pro, sans-serif",
    fontWeight: "bolder",
    width: "100%",
    textAlign: "center",
    paddingTop: "5px",
    fontSize: "25px",
    color: "#58595B",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  dialogLabel: {
    fontSize: "21px",
    "@media (max-width: 480px)": {
      fontSize: "16px",
      marginTop: "5px",
    },
    margin: "0px",
    marginTop: "10px",
    color: "white",
  },
  image2: {
    width: "20vw",
    height: "20vw",
    "@media (min-width: 1125px)": {
      width: "225px",
      height: "225px",
    },
    borderRadius: "50%",
    margin: "auto",
    marginTop: "30px",
    marginLeft: "20px",
    marginRight: "20px",
    display: "inline-block",
    objectFit: "cover",
  },
  subtitle2: {
    fontSize: "16px",
    "@media (max-width: 480px)": {
      fontSize: "14px",
      marginLeft: "0px",
    },
    fontFamily: "PT Sans",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    color: "black",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
  },
  subtitle3: {
    fontSize: "16px",
    "@media (max-width: 480px)": {
      fontSize: "14px",
      marginLeft: "0px",
    },
    fontFamily: "PT Sans",
    fontWeight: "normal",
    width: "100%",
    textAlign: "left",
    color: "black",
    margin: "0px",
    marginLeft: "5px",
    marginTop: "5px",
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
  translate: {
    transform: "translate(0%, 0%)",
  },
  overflowText: {
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
      showAccept: false,
      connect_status: "",
      open: false,
      bio: {},
      showProfile: false,
    };
  }

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };

  openBio = (event) => {
    this.setState({
      open: true,
    });
  };

  checkUserType = () => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile["custom:user_type"] === "MENTOR") {
      this.setState({
        showConnect: true,
      });
    }
  };

  findRequestor = () => {
    if (this.props.requesteeResponse) {
      for (let i = 0; i < this.props.requesteeResponse.length; i++) {
        if (
          this.props.requesteeResponse[i].requestor ===
          this.props.data.attributes.email
        ) {
          if (this.props.requesteeResponse[i].connect_status === "ACCEPTED") {
            this.setState({
              showConnect: false,
              showAccept: false,
              connect_status: this.props.requesteeResponse[i].connect_status,
            });
          } else {
            this.setState({
              showConnect: false,
              showAccept: true,
              connect_status: this.props.requesteeResponse[i].connect_status,
            });
          }
        }
      }
    }
  };

  fetchBio = async () => {
    let bioURL =
      "https://aspire-user-profile.s3.amazonaws.com/" +
      this.props.data.attributes.email +
      "/info.json";

    if (this.props.data.attributes["custom:user_type"] === "MENTOR") {
      await S3Get(bioURL)
        .then((res) => {
          this.setState({
            bio: res.data,
            showProfile: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleConnect = async () => {
    let connectPayload = {
      requestor: {
        email: jwtDecode(localStorage.getItem("idToken"))["email"],
        user_type: "MENTOR",
        name:
          jwtDecode(localStorage.getItem("idToken"))["given_name"] +
          " " +
          jwtDecode(localStorage.getItem("idToken"))["family_name"],
      },
      requestee: {
        email: this.props.data.attributes["email"],
        user_type: this.props.data.attributes["custom:user_type"],
        name:
          this.props.data.attributes["given_name"] +
          " " +
          this.props.data.attributes["family_name"],
      },
    };
    await httpPost(
      "connect",
      (await Auth.currentSession()).getIdToken().getJwtToken(),
      connectPayload
    )
      .then((res) => {
        this.setState({
          showConnect: false,
        });
        this.props.enqueueSnackbar("Connection request sent!", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.enqueueSnackbar(
          "Failed to send connection request: " + err.response.data.message,
          {
            variant: "error",
          }
        );
      });
  };

  handleAccept = async () => {
    let acceptPayload = {
      requestor: {
        email: jwtDecode(localStorage.getItem("idToken"))["email"],
        user_type: "MENTOR",
        name:
          jwtDecode(localStorage.getItem("idToken"))["given_name"] +
          " " +
          jwtDecode(localStorage.getItem("idToken"))["family_name"],
      },
      requestee: {
        email: this.props.data.attributes["email"],
        user_type: this.props.data.attributes["custom:user_type"],
        name:
          this.props.data.attributes["given_name"] +
          " " +
          this.props.data.attributes["family_name"],
      },
    };
    await httpPost(
      "connect",
      (await Auth.currentSession()).getIdToken().getJwtToken(),
      acceptPayload
    )
      .then((res) => {
        this.setState({
          showAccept: false,
        });
        this.props.enqueueSnackbar("Connection request accepted!", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.enqueueSnackbar(
          "Failed to accept connection request: " + err.message,
          {
            variant: "error",
          }
        );
      });
  };

  componentDidMount() {
    this.checkUserType();
    this.findRequestor();
    this.fetchBio();
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
              {/* <p className={classes.title}>
                {this.props.data.attributes["custom:user_type"] === "MENTOR"
                  ? "Senior Executive"
                  : "Aspiring Professional"}
              </p> */}
            </Grid>

            <Grid
              container
              item
              xs={12}
              spacing={0}
              alignItems="center"
              justify="center"
            >
              {this.state.showProfile ? (
                <span className={classes.button_container}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={this.openBio}
                  >
                    View Profile
                  </Button>
                </span>
              ) : (
                ""
              )}
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
                this.state.showAccept === true ? (
                  <span className={classes.button_container}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={this.handleAccept}
                    >
                      Accept Connection
                    </Button>
                  </span>
                ) : (
                  <span className={classes.button_container}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      disabled
                    >
                      {this.state.connect_status}
                    </Button>
                  </span>
                )
              ) : (
                <span className={classes.button_container}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!this.state.showConnect}
                    onClick={this.handleConnect}
                  >
                    Connect
                  </Button>
                </span>
              )}
            </Grid>
          </Grid>
        </div>

        <Dialog
          className={classes.translate}
          open={this.state.open}
          onClose={this.handleClose}
          // scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth={true}
          maxWidth={"md"}
          PaperProps={{
            style: { borderRadius: 12, height: "60vh" },
          }}
        >
          <Toolbar className={classes.toolbar}>
            <div>
              <h2 className={classes.dialogLabel}>Senior Executive Bio</h2>
            </div>
            <img
              onClick={this.handleClose}
              className={classes.closes}
              style={{ width: "14px", height: "14px", cursor: "pointer" }}
              src={close}
              alt="Close button"
            />
          </Toolbar>

          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              component={"span"}
            >
              <Grid
                container
                item
                xs={12}
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={4}
                  spacing={0}
                  alignItems="flex-start"
                  justify="center"
                >
                  <img
                    className={classes.image2}
                    src={this.props.data.attributes["picture"]}
                    alt={"Community Card"}
                  />
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  spacing={0}
                  alignItems="center"
                  justify="flex-start"
                  className={classes.outer_grid}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <h1 className={classes.title2}>
                      <span className={classes.name2}>
                        {this.props.data.attributes.given_name}{" "}
                        {this.props.data.attributes.family_name}
                      </span>
                    </h1>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ paddingBottom: "10px" }}
                  >
                    {this.state.bio["designation"] === "" ||
                    this.state.bio["designation"] === "N/A" ? (
                      ""
                    ) : (
                      <h3 className={classes.subtitle2}>
                        <span className={classes.name2}>
                          Designation:{" "}
                          <span className={classes.subtitle3}>
                            {this.state.bio["designation"]}
                          </span>
                        </span>
                      </h3>
                    )}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ paddingBottom: "10px" }}
                  >
                    <span className={classes.subtitle2}>
                      Current:
                      <span className={classes.subtitle3}>
                        {this.state.bio["current_company"]}
                      </span>
                    </span>
                    {this.state.bio["company_2"] === "" ||
                    this.state.bio["company_2"] === "N/A" ? (
                      ""
                    ) : (
                      <span
                        className={classes.subtitle2}
                        style={{ paddingTop: "10px" }}
                      >
                        Previous:
                      </span>
                    )}
                    {this.state.bio["company_2"] === "" ||
                    this.state.bio["company_2"] === "N/A" ? (
                      ""
                    ) : (
                      <span className={classes.subtitle3}>
                        {"   - "}
                        {this.state.bio["company_2"]}
                      </span>
                    )}
                    {this.state.bio["company_3"] === "" ||
                    this.state.bio["company_3"] === "N/A" ? (
                      ""
                    ) : (
                      <span className={classes.subtitle3}>
                        {"   - "}
                        {this.state.bio["company_3"]}
                      </span>
                    )}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ paddingBottom: "10px" }}
                  >
                    <span className={classes.subtitle2}>Education:</span>
                    <span className={classes.subtitle3}>
                      {"  - "} {this.state.bio["education_highest"]}
                    </span>
                    {this.state.bio["education_2"] === "" ||
                    this.state.bio["education_2"] === "N/A" ? (
                      ""
                    ) : (
                      <span className={classes.subtitle3}>
                        {"   - "}
                        {this.state.bio["education_2"]}
                      </span>
                    )}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={0}
                    alignItems="flex-start"
                    justify="flex-start"
                    style={{ paddingBottom: "40px" }}
                  >
                    {this.state.bio["bio"] === "" ||
                    this.state.bio["bio"] === "N/A" ? (
                      ""
                    ) : (
                      <span className={classes.subtitle2}>Bio:</span>
                    )}
                    {this.state.bio["bio"] === "" ||
                    this.state.bio["bio"] === "N/A" ? (
                      ""
                    ) : (
                      <span className={classes.subtitle3}>
                        {this.state.bio["bio"]}
                      </span>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default withSnackbar(JobApplicationCard);
