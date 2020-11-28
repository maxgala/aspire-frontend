import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import view from "../../Images/view.png";
import edit from "../../Images/edit.png";
import Tooltip from "@material-ui/core/Tooltip";
import Moment from "react-moment";

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    minHeight: "130px",
    maxWidth: "350px",
    height: "180px",
    marginBottom: "20px",
    borderRadius: "20px",
    backgroundColor: "#58595B",
    boxShadow: "0px 6px 6px #00000029",
  },

  innerMargin: {
    marginLeft: "10%",
    marginRight: "5%",
  },

  title: {
    fontFamily: "PT Sans",
    fontWeight: "bold",
    width: "100%",
    textAlign: "left",
    marginBottom: "2%",
    marginRight: "0%",
    marginLeft: "0%",
    fontSize: "17px",
    color: "white",
  },

  line: {
    width: "55%",
    marginLeft: "0px",
  },

  datePosted: {
    fontSize: "10px",
    textAlign: "left",
    left: "10%",
    color: "white",
    fontWeight: "700",
    padding: "4px",
    margin: "5px 0px 8px 0px",
  },

  status: {
    fontSize: "10px",
    margin: "0px 0px 6px 8px",
    color: "white",
    fontWeight: "700",
  },

  active: {
    fontSize: "10px",
    marginLeft: "35%",
    marginBottom: "6px",
    marginTop: "0px",
    marginRight: "0px",
    color: "#6EA0B5",
    left: "10%",
    fontWeight: "700",
  },

  padding: {
    padding: "0px",
    margin: "0px",
  },

  image1: {
    width: "15px",
    height: "30px",
    display: "block",
    margin: "10px 0px 0px 20px",
    marginLeft: "5%",
    marginTop: "10px",
    cursor: "pointer",
  },

  image2: {
    width: "22px",
    height: "22px",
    display: "block",
    margin: "15px 0px 8px 10px",
    marginLeft: "5%",
    marginTop: "15px",
    marginBottom: "8px",
    cursor: "pointer",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class JobPostingCard extends Component {
  render() {
    Moment.globalFormat = "MMM DD, YYYY";
    const classes = this.props.classes;

    return (
      <div className={classes.card}>
        <div className={classes.innerMargin}>
          <p className={classes.title}>{this.props.data.title}</p>
          <hr className={classes.line}></hr>
          <p className={classes.datePosted}>
            Date Posted:{" "}
            <Moment unix>
              {this.props.data && this.props.data.created_on}
            </Moment>
          </p>

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
              xs={5}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.status}>Status:</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.status}>Submissions:</p>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={4}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.active}>Active</p>
              </Grid>

              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.active}>
                  {this.props.data.job_applications.length}
                </p>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={2}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-end"
                justify="flex-end"
              >
                <Tooltip title="Edit" arrow>
                  <img
                    className={classes.image1}
                    src={edit}
                    alt="Edit Job Posting"
                  />
                </Tooltip>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={2}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Tooltip title="View" arrow>
                  <img
                    className={classes.image2}
                    src={view}
                    alt="View Job Posting"
                  />
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

JobPostingCard = withMyHook(JobPostingCard);
export default JobPostingCard;
