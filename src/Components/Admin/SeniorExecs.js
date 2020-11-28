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
  },  SeniorExecsTable: {
    padding: '8px'
  },

}));

function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class SeniorExecs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      seniorExecs: [],
      // show a lot more information 
      // usecase status LinkedIn URL vets 
      // cognito date of birth
      // to do 
      columns: [
        { title: 'Name', field: 'name' },
        { title: "Age", field: 'age'},
        { title: 'Company', field: 'company' },
        { title: 'Region', field: 'region'},
        { title: 'City', field: "city"},
        { title: "Applied Date", field: "created_on", defaultSort: "desc", render: rowData => {
          // Format unix Timestamp to date time
          return <Moment unix>{rowData.created_on}</Moment>
        }},
      ]
    }
  }

  fetchSeniorExecs = async () => {
    const existingSeniorExecsData = await httpGet("SeniorExecs", localStorage.getItem("idToken"));

    // Added sanity check incase API returns broken response
    if(existingSeniorExecsData.data.SeniorExecs !== undefined){
    // Go through every senior executive data and derive the # of applicants to fill in table
    Object.keys(existingSeniorExecsData.data.SeniorExecs).forEach(function(seniorExecID){
    })

    this.setState({
      SeniorExecs: existingSeniorExecsData.data.SeniorExecs
    })

    }
  }

  /**
   * This function will set the status of a senior executive to rejected
   * @param {int} seniorExecID the ID of the senior executive to have it's status set to rejected
   */
  removedSeniorExec = async (seniorExecID) => {

    let removedSeniorExec = {
      "job_status" : "REJECTED",
    };
    await httpPut(`seniorExecs/${seniorExecID}`, localStorage.getItem("idToken"), removedSeniorExec);
    this.fetchSeniorExecs();
  }

  /**
   * This function will set the status of a senior executive to active
   * @param {int} jobID the ID of the senior executive to have it's status set to active
   */
  approveseniorExec = async (jobID) => {

    let approvedseniorExec = {
      "job_status" : "ACTIVE",
    };
    await httpPut(`SeniorExecs/${jobID}`, localStorage.getItem("idToken"), approvedseniorExec);
    this.fetchSeniorExecs();
  }

  componentDidMount() {
    this.fetchSeniorExecs();
  }

  render() {

    // Use Moment library to format timestamp returned from API.
    Moment.globalFormat = "MMM DD, YYYY";

    // These are the actions on the left of every column in the table.
    const actions = [
      {
        icon: () => <Check/>,
        tooltip: "Approve Senior executive posting",
        onClick: (event,rowData) => {
          new Promise((resolve, reject) => {
  
            // Send PUT request to set senior executive status to Active.
            this.approveSeniorExec(rowData.seniorExecID);
  
            resolve();
          })        
        }
      },
      {
        icon: () => <DeleteOutline/>,
        tooltip: "Remove senior executive Posting",
        onClick: (event, rowData) => {
          new Promise((resolve, reject) => {

            // Send PUT request to set senior executive status to Rejected.
            this.removeSeniorExec(rowData.seniorExecID);
    
            resolve();
          })        
        }
      }
    ]
  return (
    <MaterialTable
      title="Global Senior Executive Postings"
      actions={actions}
      columns={this.state.columns}
      icons={tableIcons}
      data={this.state.seniorExecs}
      options={{
        paging:true,
        pageSize:15,
        emptyRowsWhenPaging:true,
        pageSizeOptions:[5,10,15,30,50],
        exportButton: true,
        exportTrue: true
      }}
    />
  );
  }
}

SeniorExecs = withMyHook(SeniorExecs);
export default SeniorExecs;
