import React, {Component} from 'react';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



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
    padding: '20px'
  },

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

function createData(name, salary, location, state, country) {
  return { name, salary, location, state, country };
}

const rows = [
  createData('Senior Waste Collector', 50, 'Surrey', 'BC', 'Canada'),
  createData('Ice Cream Product Manager', 40, 'Surrey', 'BC', 'Canada'),
  createData('Fried Chicken Architect', 200, 'Brampton', 'OT', 'Canada'),
  createData('Orange Wasteman', 400, "Washington", 'DC', 'USA'),
];


class JobPosts extends Component{
  render() {

    const classes = this.props.classes;

    return (
        <div>
          <PerfectScrollbar>
            <div className={classes.mainPage}>
              <h1 className={classes.JobBoard}>
                Job Postings
              </h1>
              <Grid
               container
               item xs={12}
               spacing={1}
               alignItems="flex-start"
               justify="flex-start"
               className={classes.JobTable}
               >
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Hourly Salary</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">State/Province</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">${row.salary}</StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.state}</StyledTableCell>
              <StyledTableCell align="right">{row.country}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                 
               </Grid>

            </div>
          </PerfectScrollbar>
        </div>
      );
  }
}

JobPosts = withMyHook(JobPosts);
export default JobPosts;
