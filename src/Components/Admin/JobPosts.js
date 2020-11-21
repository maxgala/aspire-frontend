import React, {Component} from 'react';
import { makeStyles} from "@material-ui/core/styles";
import { httpGet, httpPut } from "../../lib/dataAccess";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import { AddBox , ArrowUpward} from "@material-ui/icons";

import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Moment from "react-moment";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  
    
const useStyles = makeStyles((theme) => ({
  home_page: { 
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '90vh',
    marginLeft:"20px",
    
  },
  booking_history: {
    fontFamily: 'PT Sans',
    fontSize: '20px',
    textAlign: 'left',
    color: '#58595b',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '0px'
  },
  section_title: {
    width: '100%',
    fontFamily: 'PT Sans',
    fontSize: '15px',
    margin: '5px',
    marginBottom: '10px',
    marginTop: '15px',
    textAlign: 'left',
    color: 'black'
  },
  example: {
    width: '1000px',
    height: '100px',
  },
  body: {
    fontSize: 14,
  },
  table : {
    minWidth: 700,
  },  JobTable: {
    padding: '8px'
  },

}));

function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      columns: [
        { title: 'Title', field: 'title' },
        { title: "Status", field: 'job_status'},
        { title: 'Company', field: 'company' },
        { title: 'Region', field: 'region'},
        { title: 'City', field: "city"},
        { title: "Created", field: "created_on", render: rowData => {
          return <Moment unix>{rowData.created_on}</Moment>
        }},
        { title: "Applications", field: "applicantCount"}
      ]
    }
  }

  fetchJobs = async () => {
    const existingJobsData = await httpGet("jobs", localStorage.getItem("idToken"));
    
    console.log(existingJobsData);

    // const jobsData = Object.keys(existingJobsData.jobs);
    // console.log(jobsData);
    // Add the number of applicants for each job property and save their date.
    Object.keys(existingJobsData.data.jobs).forEach(function(jobID){
      let currentJob = existingJobsData.data.jobs[jobID];

      currentJob.applicantCount = currentJob.job_applications.length; 
      // console.log(currentJob.job_applicants);
    })
    console.log(existingJobsData.data.jobs);

    this.setState({
      jobs: existingJobsData.data.jobs
    })
  }

  removeJob = async (jobID) => {

    let removedJob = {
      "job_status" : "REJECTED",
    };
    await httpPut(`jobs/${jobID}`, localStorage.getItem("idToken"), removedJob);
    this.fetchJobs();
  }

  approveJob = async (jobID) => {

    let removedJob = {
      "job_status" : "APPROVED",
    };
    await httpPut(`jobs/${jobID}`, localStorage.getItem("idToken"), removedJob);
    this.fetchJobs();
  }

  componentDidMount() {
    this.fetchJobs();
  }

  render() {
    Moment.globalFormat = "MMM DD, YYYY";

    const actions = [
      {
        icon: () => <Check/>,
        tooltip: "Approve Job Posting",
        onClick: (event,rowData) => {
          console.log(rowData);
        }
      },
      {
        icon: () => <DeleteOutline/>,
        tooltip: "Remove Job Posting",
        onClick: (event, rowData) => {
          new Promise((resolve, reject) => {


            // Make a copy of the jobs in state prior to removing the deleted job
            const dataDelete = [...this.state.jobs];
            const index = rowData.tableData.id;

            dataDelete.splice(index, 1);
            // this.setState({
            //   jobs: [...dataDelete]
            // });
            // Set the job status to REJECTED in the DB.
            this.removeJob(rowData.job_id);
    
            resolve();
          })        }
      }
    ]
  return (
    <MaterialTable
      title="Global Job Postings"
      actions={actions}
      columns={this.state.columns}
      icons={tableIcons}
      data={this.state.jobs}
      options={{
        paging:true,
        pageSize:15,
        emptyRowsWhenPaging:true,
        pageSizeOptions:[5,10,15,30,50],
        exportButton: true,
        exportTrue: true
      }}
      editable={{
        onRowDelete: oldData => 
          new Promise((resolve, reject) => {


            // Make a copy of the jobs in state prior to removing the deleted job
            const dataDelete = [...this.state.jobs];
            const index = oldData.tableData.id;

            dataDelete.splice(index, 1);
            // this.setState({
            //   jobs: [...dataDelete]
            // });
            // Set the job status to REJECTED in the DB.
            this.removeJob(oldData.job_id);
    
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // Make a copy of the jobs in state prior to removing the deleted job
            const dataUpdate = [...this.state.jobs];
            const index = oldData.tableData.id;

            dataUpdate.splice(index, 1);
            // this.setState({
            //   jobs: [...dataDelete]
            // });
            // Set the job status to REJECTED in the DB.
            this.approveJob(oldData.job_id);
    
            resolve();
          }),
        
      }}
    />
  );
  }
}

JobPosts = withMyHook(JobPosts);
export default JobPosts;
