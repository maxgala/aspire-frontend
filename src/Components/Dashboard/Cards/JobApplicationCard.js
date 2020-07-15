import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = makeStyles(() => ({
  card: {
    width: '290px',
    maxWidth: '400px',
    height: '150px',
    borderStyle: 'solid',
    borderRadius: 11,
    backgroundColor: '#6EA0B5',
    marginLeft: '7%',
    color: 'white',
    borderColor: '#6EA0B5',
    textAlign: 'left',
    fontWeight: '100',
    fontFamily: 'Arial', 
    marginBottom: '5%'
  },
  jobTitle:{
    fontSize: '13px',
    marginLeft: '7%',
    fontSize: '19px',
    marginTop:'5%px',
    fontWeight: '100',
    marginBottom: '1%',
  },
  text2:{
    fontSize: '15px',
    marginLeft: '7%',
    fontSize: '10px',
    marginTop:'66px',
    fontWeight: '100',
  },
  text3:{
    fontSize: '15px',
    marginLeft: '7%',
    fontSize: '10px',
    marginTop:'6px',
    fontWeight: '100',
  },
  text4:{
    marginLeft: '7%',
    marginTop: '3%',
    fontSize: '6px',
    fontWeight: '100',
    float: 'left',
    marginBottom: '15%',
    
  },
  button: {
    fontSize: '8px',
    position: 'absolute',
    fontWeight: '400',
    color: 'gray',
    borderRadius: 50,
    backgroundColor :'white',
    color: '#58595B',
    display: 'flex',
    marginLeft: '150px',
    marginTop: '1%',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '0.5%',
    paddingBottom: '0.5%',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
  }
  },
  tag: {
    transform: 'translate(-110%, 340%)',
    float: 'left',
    borderStyle: 'solid',
    fontSize: '7px',
    fontWeight: '100',
    color: 'white',
    borderWidth: '0.5px',
    borderRadius: 50,
    marginRight: '2%',
    borderColor: 'white',
    display: 'flex',
    paddingLeft: '3%',
    paddingRight: '3%',
    
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobApplicationCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <h1 className={classes.jobTitle}>Cheese Eater</h1>
        <span className={classes.text2}><span><FontAwesomeIcon icon={faBuilding} style={{width: '9px', height: '9px'}}/></span>Google</span>
        <span className={classes.text3}>Guelph, ON</span>
        <hr style={{width: '30%', textAlign:'right', marginLeft: '7%', marginTop:'5%', marginBottom: '0' , height: 1, paddingBottom:'0'}}></hr>
        <span className={classes.text4}>Posted Jan 5, 2020</span>
        <Button className={classes.button} variant="contained" color="primary" >View Job</Button>
        <span className={classes.tag}>Marketing</span>
        <span className={classes.tag}>Software</span>
        
     
      </div>
    )
  }
}

JobApplicationCard = withMyHook(JobApplicationCard);
export default JobApplicationCard;

