import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ResumeBankCard from "./Cards/ResumeBankCard";
import { withRouter } from "react-router";
import { httpGet } from "../../lib/dataAccess";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";
import Skeleton from "@material-ui/lab/Skeleton";
import TextField from "@material-ui/core/TextField";
import Industries from "../Registration/industry";
import MenuItem from "@material-ui/core/MenuItem";

const IndustryLabels = [];
IndustryLabels.push("All");
for (let i = 0; i < Industries.length; ++i) {
  IndustryLabels.push(Industries[i]["name"]);
}

const useStyles = makeStyles(() => ({
  resumebankcard: {
    width: "100%",
    maxWidth: "370px",
    height: "230px",
    margin: "auto",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "center",
    backgroundColor: "#455e69",
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

  mainPage: {
    paddingLeft: "8%",
    paddingRight: "8%",
    paddingBottom: "8%",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },

  JobBoard: {
    fontFamily: "PT Sans",
    fontSize: "30px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
    marginTop: "40px",
  },

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
      job_board_data: [],
      isResumebankLoaded: false,
      industry: "",
      unfilteredData: [],
    };
  }

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

    const full = freeUsers.data.users.concat(paidUsers.data.users);
    this.setState({
      job_board_data: full,
      isResumebankLoaded: true,
      unfilteredData: full,
    });
  };

  filterChats = async () => {
    let industry = this.state.industry;
    let filteredData = this.state.unfilteredData;

    if (industry !== "" && industry !== "All") {
      filteredData = this.state.unfilteredData.filter(
        (member) => member.attributes["custom:industry"] === this.state.industry
      );
    }

    this.setState({
      job_board_data: filteredData,
      isResumebankLoaded: true,
    });
  };

  handleIndustryChange = async (event) => {
    await this.setState({ industry: event.target.value });
    this.filterChats();
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        {/* <PerfectScrollbar> */}
        <div className={classes.mainPage}>
          <h1 className={classes.JobBoard}>Resume Bank</h1>

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
          >
            {this.state.isResumebankLoaded ? (
              this.state.job_board_data.map((chat, key) => (
                <Grid
                  key={key}
                  container
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <ResumeBankCard data={chat} />
                </Grid>
              ))
            ) : (
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Skeleton variant="rect" className={classes.resumebankcard} />
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

JobBoard = withMyHook(JobBoard);
JobBoard = withRouter(JobBoard);
export default withSnackbar(JobBoard);
