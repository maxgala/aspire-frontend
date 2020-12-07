import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import ResumeBankCard from "./Cards/ResumeBankCard";
// TODO: Hiding filters until they get implemented
// import Filter from "./Cards/FilterCard";
import { withRouter } from "react-router";
import { httpGet } from "../../lib/dataAccess";
import { withSnackbar } from "notistack";
import { Auth } from "aws-amplify";

const useStyles = makeStyles(() => ({
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

    const full = paidUsers.data.users.concat(freeUsers.data.users);
    this.setState({
      job_board_data: full,
    });
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
              md={6}
              lg={3}
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
              md={6}
              lg={3}
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

            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
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
                <p className={classes.section_title}>Additional Filters</p>
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
          </Grid>

          <div className={classes.sort}>
            <p className={classes.date}>
              {" "}
              Sort date posted by:
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
          >
            {this.state.job_board_data.map((chat, key) => (
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
            ))}
          </Grid>
        </div>
        {/* </PerfectScrollbar> */}
      </div>
    );
  }
}

JobBoard = withMyHook(JobBoard);
JobBoard = withRouter(JobBoard);
export default withSnackbar(JobBoard);
