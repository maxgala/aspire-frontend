import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// TODO: Hiding filters until they get implemented
// import Filter from "./Cards/FilterCard";
// import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import CommunityCard from "./Cards/CommunityCard";
import { withRouter } from "react-router";
import { httpGet } from "../../lib/dataAccess";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";
import Skeleton from "@material-ui/lab/Skeleton";
import jwtDecode from "jwt-decode";

const useStyles = makeStyles(() => ({
  mainPage: {
    paddingLeft: "8%",
    paddingRight: "8%",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    paddingBottom: "8%",
  },

  communitycard: {
    width: "95%",
    maxWidth: "400px",
    height: "450px",
    marginBottom: "10px",
    marginLeft: "7px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#455e69",
    color: "black",
    boxShadow: "0px 6px 6px #00000029",
  },

  JobBoard: {
    fontFamily: "PT Sans",
    fontSize: "30px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
    marginTop: "40px",
  },

  padding: {},

  grid: {
    justifyContent: "center",
    alignItems: "center",
  },

  section_title: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    margin: "5px",
    marginBottom: "10px",
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
  },

  select: {
    background: "#EAEAEA",
    borderColor: "#EAEAEA",
    outline: "none",
    color: "#6EA0B5",
    fontWeight: "800",
  },

  sort: {
    alignItems: "flex-start",
    textAlign: "left",
    marginBottom: "40px",
  },

  date: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    fontWeight: "bold",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class JobBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // temporary - just wanted more test data to fill the page
      community_data: [],
      isCommunityLoaded: false,
      requesteeResponse: [],
      currentUserEmail: jwtDecode(localStorage.getItem("idToken"))["email"],
    };
  }

  fetchConnects = async () => {
    await httpGet(
      "connect?requestee=" + this.state.currentUserEmail,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    )
      .then((res) => {
        this.setState({
          requesteeResponse: res.data["connect_ses"],
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.enqueueSnackbar("Failed to fetch connections: " + err, {
          variant: "err",
        });
      });
  };

  fetchUsers = async () => {
    const paidUsers = await httpGet(
      "users?type=PAID",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    ).catch((err) => {
      console.log(err);
      this.props.enqueueSnackbar("Failed to fetch users: " + err, {
        variant: "err",
      });
    });

    const freeUsers = await httpGet(
      "users?type=FREE",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    ).catch((err) => {
      console.log(err);
      this.props.enqueueSnackbar("Failed to fetch users: " + err, {
        variant: "err",
      });
    });

    const mentorUsers = await httpGet(
      "users?type=MENTORS",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    ).catch((err) => {
      console.log(err);
      this.props.enqueueSnackbar("Failed to fetch users: " + err, {
        variant: "err",
      });
    });

    const full = mentorUsers.data.users.concat(
      freeUsers.data.users,
      paidUsers.data.users
    );
    this.setState({
      community_data: full,
      isCommunityLoaded: true,
    });
  };

  componentDidMount() {
    this.fetchConnects();
    this.fetchUsers();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {/* <PerfectScrollbar> */}
        <div className={classes.mainPage}>
          <div className={classes.padding}>
            <h1 className={classes.JobBoard}>Members</h1>
          </div>

          {/* TODO: Hiding filters until they get implemented
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Job Title</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Location</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>

            <div className={classes.sort}>
              <p className={classes.date}> Sort date posted by:
                <select className={classes.select}>
                  <option value="Ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </p>
            </div>
          */}

          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          ></Grid>
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            {this.state.isCommunityLoaded === true ? (
              this.state.community_data.map((chat, key) => (
                <Grid
                  key={key}
                  container
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <CommunityCard
                    data={chat}
                    currentUserEmail={this.state.currentUserEmail}
                    requesteeResponse={this.state.requesteeResponse}
                  />
                </Grid>
              ))
            ) : (
              <Skeleton variant="rect" className={classes.communitycard} />
            )}
          </Grid>
        </div>
        {/* </PerfectScrollbar> */}
      </div>
    );
  }
}

JobBoard = withRouter(JobBoard);
JobBoard = withMyHook(JobBoard);
export default withSnackbar(JobBoard);
