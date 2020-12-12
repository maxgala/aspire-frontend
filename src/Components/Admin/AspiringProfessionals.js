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
  },  AspiringProfessionalsTable: {
    padding: '8px'
  },

}));

function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class AspiringProfessionals extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aspiringProfessionals: [],
      columns: [
        { title: 'Name', field: 'name' },
        { title: "Age", field: 'age'},
        { title: "Email", field: 'email'},
        { title: 'Company', field: 'company' },
        {title : "Industry", field : 'industry'},
        { title: 'Region', field: 'region'},
        { title: 'Country', field: 'country'},
        { title: "Applied Date", field: "created_on", defaultSort: "desc", render: rowData => {
          // Format unix Timestamp to date time
          return <Moment unix>{rowData.created_on}</Moment>
        }},
      ]
    }
  }

  /**
   * This function takes in a string date of birth and return the age 
   * @param {string} dob the date of birth to calculate the age from 
   */
  calculate_age(dob) { 

    dob = new Date(dob);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  fetchAspiringProfessionals = async () => {
    
    // TODO: Need to have two calls where type=PAID as well and merge the data 
    const existingAspiringProfessionalsData = await httpGet("users/?type=FREE&status=DISABLED", localStorage.getItem("idToken"));
    const aspiringProfessionalData = [];
    
    // Added sanity check incase API returns broken response
    if(existingAspiringProfessionalsData.data.users !== undefined){

      let tempThis = this;

      // Go through every aspiring professionalutive data and derive the # of applicants to fill in table
      Object.keys(existingAspiringProfessionalsData.data.users).forEach(function(aspiringProfessionalID){

        let currentExecObject = existingAspiringProfessionalsData.data.users[aspiringProfessionalID].attributes;

        let aspiringProfessional = {};
        aspiringProfessional.name = `${currentExecObject.given_name} ${currentExecObject.family_name}`;
        aspiringProfessional.age =  tempThis.calculate_age(currentExecObject.birthdate);
      
        aspiringProfessional.company = (currentExecObject['custom:company'] !== undefined ?currentExecObject['custom:company'] : "N/A" );
        aspiringProfessional.industry =  (currentExecObject['custom:industry'] !== undefined ?currentExecObject['custom:industry'] : "N/A" );
        aspiringProfessional.region =  (JSON.parse(currentExecObject['address']).region !== undefined ?JSON.parse(currentExecObject['address']).region : "N/A" );
        aspiringProfessional.country =  (JSON.parse(currentExecObject['address']).country !== undefined ?JSON.parse(currentExecObject['address']).country : "N/A" );

        aspiringProfessional.email = (currentExecObject['email'] !== undefined ? currentExecObject['email'] : "N/A" );
        aspiringProfessional.created_on = currentExecObject['custom:start_date'];
        aspiringProfessionalData.push(aspiringProfessional);

      });

      this.setState({
        aspiringProfessionals: aspiringProfessionalData
      })

    }
  }

  /**
   * This function will reject a aspiring professionals application 
   * @param {string} aspiringProfessionalEmail the email of the aspiring professionalutive to reject
   */
  rejectAspiringProfessional = async (aspiringProfessionalEmail) => {

    let disableAspiringProfessional = {
      "email" : `${aspiringProfessionalEmail}`,
    };
    await httpPut("users/disable", localStorage.getItem("idToken"), disableAspiringProfessional);
    this.fetchAspiringProfessionals();
  }

  /**
   * This function will approve a aspiring professionals application 
   * @param {string} aspiringProfessionalEmail the email of the aspiring professionalutive to approve
   */
  approveAspiringProfessional = async (aspiringProfessionalEmail) => {

    let disableAspiringProfessional = {
      "email" : `${aspiringProfessionalEmail}`,
    };
    await httpPut("users/disable", localStorage.getItem("idToken"), disableAspiringProfessional);
    this.fetchAspiringProfessionals();
  }

  componentDidMount() {
    this.fetchAspiringProfessionals();
  }

  render() {

    // Use Moment library to format timestamp returned from API.
    Moment.globalFormat = "MMM DD, YYYY";

    // These are the actions on the left of every column in the table.
    const actions = [
      {
        icon: () => <Check/>,
        tooltip: "Approve Aspiring Professional posting",
        onClick: (event,rowData) => {
          new Promise((resolve, reject) => {
  
            console.log(rowData);

            // Send PUT request to approve aspiring professional.
            this.approveAspiringProfessional(rowData.email);
  
            resolve();
          })        
        }
      },
      {
        icon: () => <DeleteOutline/>,
        tooltip: "Reject Aspiring Professional Posting",
        onClick: (event, rowData) => {
          new Promise((resolve, reject) => {

            console.log(rowData);
            // Send PUT request to reject aspiring professional
            this.rejectAspiringProfessional(rowData.email);
    
            resolve();
          })        
        }
      }
    ]
  return (
    <MaterialTable
      title="Global Aspiring Professional Postings"
      actions={actions}
      columns={this.state.columns}
      icons={tableIcons}
      data={this.state.aspiringProfessionals}
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

AspiringProfessionals = withMyHook(AspiringProfessionals);
export default AspiringProfessionals;
