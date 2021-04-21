import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CommunityCard from "./Cards/CommunityCard";
import { withRouter } from "react-router";
import { httpGet } from "../../lib/dataAccess";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";
import Skeleton from "@material-ui/lab/Skeleton";
import StarIcon from "@material-ui/icons/Star";
import InfiniteScroll from "react-infinite-scroll-component";

import jwtDecode from "jwt-decode";
import TextField from "@material-ui/core/TextField";
import Industries from "../Registration/industry";
import MenuItem from "@material-ui/core/MenuItem";
import CardTypes from "./CardTypes";
import EmptyCard from "./Cards/EmptyCard";

const IndustryLabels = [];
IndustryLabels.push("All");
for (let i = 0; i < Industries.length; ++i) {
  IndustryLabels.push(Industries[i]["name"]);
}

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

  filter: {
    marginBottom: "40px",
  },

  filterText: {
    fontFamily: "PT Sans",
    fontSize: "18px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
  },

  filterOption: {
    padding: "12px",
    margin: "0px",
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
      requestorResponse: [],
      currentUserEmail: jwtDecode(localStorage.getItem("idToken"))["email"],
      industry: "",
      unfilteredMembers: [],
      pagination_token:"",
      hasMore: true
    };
  }

  fetchConnects = async () => {
    await httpGet(
      "connect?requestee=" + this.state.currentUserEmail,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    )
      .then((res) => {
        this.setState({
          requesteeResponse: res.data["connections"],
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.enqueueSnackbar("Failed to fetch connections: " + err, {
          variant: "err",
        });
      });
  };

  fetchConnectRequests = async () => {
    await httpGet(
      "connect?requestor=" + this.state.currentUserEmail,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    )
      .then((res) => {
        this.setState({
          requestorResponse: res.data["connections"],
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
    const mentorUsers = await httpGet(
      //"users?type=MENTOR",
      "users?limit=8&token="+encodeURIComponent(this.state.pagination_token),
      (await Auth.currentSession()).getIdToken().getJwtToken()
    ).catch((err) => {
      console.log(err);
      this.props.enqueueSnackbar("Failed to fetch users: " + err, {
        variant: "err",
      });
    });

    let full = [];
    if(this.state.community_data && this.state.community_data.length > 0){
      full = mentorUsers.data.users.concat(this.state.community_data);
    }else{
      full = mentorUsers.data.users;
    }
    this.setState({
      community_data: full,
      isCommunityLoaded: true,
      unfilteredMembers: full,
      pagination_token:mentorUsers.data.pagination_token,
      hasMore:mentorUsers.data.pagination_token==null?false:true
    });
  };

  filterMembers = async () => {
    let industry = this.state.industry;
    let filteredMembers = this.state.unfilteredMembers;

    if (industry !== "" && industry !== "All") {
      filteredMembers = this.state.unfilteredMembers.filter(
        (member) => member.attributes["custom:industry"] === this.state.industry
      );
    }

    await this.setState({
      community_data: [],
    });

    this.setState({
      community_data: filteredMembers,
      isCommunityLoaded: true,
    });
  };

  handleIndustryChange = async (event) => {
    await this.setState({ industry: event.target.value });
    this.filterMembers();
  };

  componentDidMount() {
    this.fetchConnects();
    this.fetchConnectRequests();
    this.fetchUsers();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.mainPage}>
          <div className={classes.padding}>
            <h1 className={classes.JobBoard}>Members</h1>
            <p style={{ textAlign: "left" }}>
              All Senior Executives are marked with a star:{" "}
              <StarIcon style={{ paddingTop: 5 }} htmlColor={"#B5A165"} />
            </p>
          </div>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <h1 className={classes.filterText}>Filter by</h1>
            </Grid>
            <Grid container item xs={12} className={classes.filter}>
              <Grid item xs={4} className={classes.filterOption}>
                <TextField
                  id="outlined-select-education"
                  fullWidth
                  select
                  label="Industry"
                  value={this.state.industry}
                  onChange={this.handleIndustryChange}
                  variant="outlined"
                >
                  {IndustryLabels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          ></Grid>
          
          <InfiniteScroll
            dataLength={this.state.community_data.length}
            next={this.fetchUsers}
            hasMore={this.state.hasMore}
            loader={<h4>Loading...</h4>}
          >
            <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            {this.state.isCommunityLoaded === true ? (
              this.state.community_data &&
              this.state.community_data.length > 0 ? (
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
                      requestorResponse={this.state.requestorResponse}
                    />
                  </Grid>
                ))
              ) : (
                <EmptyCard type={CardTypes.community} filtered={true} />
              )
            ) : (
              <Skeleton variant="rect" className={classes.communitycard} />
            )}
          </Grid>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

JobBoard = withRouter(JobBoard);
JobBoard = withMyHook(JobBoard);
export default withSnackbar(JobBoard);
