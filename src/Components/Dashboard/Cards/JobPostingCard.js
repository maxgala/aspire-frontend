import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Moment from "react-moment";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";

import { Auth } from "aws-amplify";
import { httpGet, httpPost } from "../../../lib/dataAccess";
import MaterialTable from "material-table";
import Save from "@material-ui/icons/SaveAlt";

import { forwardRef } from "react";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { AddBox, ArrowUpward } from "@material-ui/icons";
import PostJobPopup from "../Popups/PostJobPopup";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    minHeight: "130px",
    maxWidth: "350px",
    height: "180px",
    marginBottom: "20px",
    marginRight: "10px",
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

  button: {
    fontSize: "10px",
    "@media (max-width: 350px)": {
      fontSize: "8px",
      marginTop: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
    },
    position: "absolute",
    fontWeight: "400",
    borderRadius: 50,
    backgroundColor: "white",
    color: "#58595B",
    display: "flex",
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "5px",
    paddingBottom: "5px",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  toolbar: {
    height: "8vh",
    backgroundColor: "black",
    boxShadow: "0px 0px 0px",
    width: "100%",
  },
  textpopup: {
    fontSize: "15px",
    marginTop: "6px",
    fontWeight: "100",
    marginRight: "16%",
  },
  textpopup2: {
    fontSize: "15px",
    marginLeft: "4%",
    marginRight: "16%",
    marginTop: "6px",
    fontWeight: "100",
  },
  header: {
    textAlign: "left",
    marginLeft: "20px",
    fontWeight: "100",
    fontSize: "18px",
    "@media (max-width: 480px)": {
      marginLeft: "0px",
    },
  },
  descrip: {
    textAlign: "left",
    marginLeft: "20px",
    marginRight: "0px",
    fontWeight: "100",
    fontSize: "15px",
    "@media (max-width: 480px)": {
      fontSize: "12px",
      marginLeft: "0px",
    },
  },
  tagpopup: {
    float: "left",
    borderStyle: "solid",
    fontSize: "12px",
    fontWeight: "100",
    color: "black",
    borderWidth: "0.5px",
    borderRadius: 50,
    marginLeft: "4%",
    marginTop: "1%",
    borderColor: "black",
    display: "flex",
    paddingLeft: "3%",
    paddingRight: "3%",
  },
  closes: {
    position: "absolute",
    right: "5%",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

let openPostJobData = {};
class JobPostingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submissions: [],
      openPostJob: false,
      openPostJobLoading: false,
      openPostJobData: {},
      columns: [
        {
          title: "Email",
          field: "applicant_id",
        },
      ],
    };
  }

  handlePostJobClose = (event) => {
    openPostJobData = {};
    this.setState({
      openPostJob: false,
    });
    console.log(this.props);
    this.props.refresh();
  };

  openApplication = async (event) => {
    const jobId = this.props.data.job_id;

    const submissions = await httpGet(
      "job-applications?jobId=" + jobId,
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );

    this.setState({
      open: true,
      submissions: submissions.data,
    });
  };

  postJob = async (data) => {
    openPostJobData = data;
    this.setState({
      openPostJob: true,
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };

  render() {
    Moment.globalFormat = "MMM DD, YYYY";
    const classes = this.props.classes;

    const actions = [
      {
        icon: () => <Save />,
        tooltip: "Download Resume",
        onClick: (event, rowData) => {
          const link = document.createElement("a");
          link.setAttribute("download", rowData.resumes);
          link.href = rowData.resumes;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
    ];
    return (
      <div className={classes.card}>
        <div className={classes.innerMargin}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p className={classes.title}>{this.props.data.title}</p>
            </div>
            <div>
              <a onClick={() => this.postJob(this.props.data)}>
                <p className={classes.title}>Edit</p>
              </a>
            </div>
          </div>
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
              xs={5}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <div className={classes.divStyle}>
                <Button
                  className={classes.button}
                  onClick={this.openApplication}
                  variant="contained"
                  color="primary"
                >
                  View Submissions
                </Button>
              </div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={10}
              spacing={0}
              alignItems="flex-start"
              justify="flex-start"
            >
              {this.props.data &&
                this.props.data.job_tags &&
                this.props.data.job_tags.map((tag, key) => (
                  <Grid
                    key={key}
                    container
                    item
                    xs={4}
                    sm={4}
                    md={3}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <div className={classes.divStyle}>
                      <span className={classes.tag1}>{tag}</span>
                    </div>
                  </Grid>
                ))}
            </Grid>
            <Dialog
              className={classes.translate}
              open={this.state.open}
              onClose={this.handleClose}
              scroll={"paper"}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
              fullWidth={true}
              maxWidth={"md"}
              PaperProps={{
                style: { borderRadius: 12 },
              }}
            >
              <Toolbar className={classes.toolbar}>
                <div>
                  <h2
                    style={{ margin: "0px", marginTop: "10px", color: "white" }}
                  >
                    {this.props.data.title}
                  </h2>
                </div>
                <img
                  onClick={this.handleClose}
                  className={classes.closes}
                  style={{ width: "14px", height: "14px", cursor: "pointer" }}
                  src={close}
                  alt="Close button"
                />
              </Toolbar>

              <DialogContent>
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
                    justify="center"
                  >
                    <div style={{ width: "100%" }}>
                      <MaterialTable
                        title="Job Applications"
                        actions={actions}
                        columns={this.state.columns}
                        icons={tableIcons}
                        data={this.state.submissions}
                        options={{
                          paging: true,
                          pageSize: 15,
                          emptyRowsWhenPaging: false,
                          pageSizeOptions: [5, 10, 15, 30, 50],
                          exportButton: true,
                          exportTrue: true,
                          search: false,
                          actionsColumnIndex: -1,
                        }}
                      />
                    </div>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions />
            </Dialog>
          </Grid>
        </div>
        {this.state.openPostJob && (
          <PostJobPopup
            openPostJob={this.state.openPostJob}
            editMode={true}
            prefilledData={openPostJobData}
            handlePostJobClose={this.handlePostJobClose}
          />
        )}
      </div>
    );
  }
}

JobPostingCard = withMyHook(JobPostingCard);
export default JobPostingCard;
