import React, {Component} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, position, company, approve, deny) {
  return {
    name,
    position,
    company,
    approve,
    deny,
  };
}

function Row(props) {
  const { row } = props;
  // const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.position}</TableCell>
        <TableCell align="right">{row.company}</TableCell>
        <TableCell align="right">{row.approve}</TableCell>
        <TableCell align="right">{row.deny}</TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired, 
    company: PropTypes.string.isRequired,
    approve: PropTypes.node.isRequired,
    deny: PropTypes.node.isRequired
  }).isRequired,
};

const rows = [
  createData('Raho', 'Director', 'Loblaws', <Button variant="contained">✓</Button>, <Button variant="contained" >✗</Button>),
  createData('Ahmed', 'Director', 'Loblaws',<Button variant="contained" >✓</Button>, <Button variant="contained" >✗</Button>),
  createData('Fatum', 'Director', 'Loblaws',<Button variant="contained" >✓</Button>, <Button variant="contained" >✗</Button>),
  createData('Sammer', 'Director', 'Loblaws', <Button variant="contained">✓</Button>, <Button variant="contained">✗</Button>),
  createData('Malak', 'Director', 'Loblaws', <Button variant="contained">✓</Button>, <Button variant="contained">✗</Button>),
  createData('Raho', 'Director', 'Loblaws', <Button variant="contained">✓</Button>, <Button variant="contained" >✗</Button>),
  createData('Ahmed', 'Director', 'Loblaws',<Button variant="contained" >✓</Button>, <Button variant="contained" >✗</Button>),
  createData('Fatum', 'Director', 'Loblaws',<Button variant="contained" >✓</Button>, <Button variant="contained" >✗</Button>),
  createData('Sammer', 'Director', 'Loblaws', <Button variant="contained">✓</Button>, <Button variant="contained">✗</Button>),
  createData('Malak', 'Director', 'Loblaws', <Button variant="contained">✓</Button>, <Button variant="contained">✗</Button>),
];


const useStyles = makeStyles(theme => ({
total: {
  width: '95%', 
  marginTop: '10px',
  marginLeft:'40px'
}, 
header: {
  backgroundColor: '#b5a165',
  fontFamily: "Nunito",
  textTransform: "capitalize",
  fontSize: '18px'
},

button: {
  backgroundColor: '#6EA0B5'
}
}));


function withMyHook(Component){
  return function WrappedComponent(props){
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class SeniorExecs extends Component{
  constructor() {
    super();
    this.state = {
      rows: rows,
      data: []
    }
  }

  componentDidMount() {
    fetch(`https://nv4pftutrf.execute-api.us-east-1.amazonaws.com/Prod/users/mentors/pending`)
    .then(res => res.json())
    .then(json => this.setState({ data: json }));
  }

  deleteRow = (index) => {
    // make new rows. note: react state is immutable.
    const newRows = this.state.rows.slice(0, index).concat(this.state.rows.slice(index + 1));
    this.setState({
      rows: newRows,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <TableContainer component={Paper} className={classes.total}>
      <Table aria-label="collapsible table">
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell />
            <TableCell className={classes.header}>Senior Executives</TableCell>
            <TableCell className={classes.header} align="right">Position</TableCell>
            <TableCell className={classes.header} align="right">Company</TableCell>
            <TableCell className={classes.header} align="right">Approve</TableCell>
            <TableCell className={classes.header} align="right">Deny</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  }
}

SeniorExecs = withMyHook(SeniorExecs);
export default SeniorExecs;