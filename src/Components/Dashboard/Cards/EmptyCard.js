import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardTypes from '../CardTypes';

const useStyles = makeStyles(() => ({
  cardCoffee: {
    width: '100%',
    maxWidth: '350px',
    height: '180px',
    marginBottom: '10px',
    borderRadius: '20px',
    backgroundColor: '#B5A165',
    color: 'white',
    overflow: 'hidden'
  },
  cardApp: {
    width: '100%',
    maxWidth: '350px',
    height: '180px',
    borderStyle: 'solid',
    borderRadius: '20px',
    backgroundColor: '#6EA0B5',
    color: 'white',
    borderColor: '#6EA0B5',
    overflow: 'hidden'
  },
  cardPosting: {
    width: '100%',
    maxWidth: '350px',
    height: '180px',
    marginBottom: '20px',
    borderRadius: '20px',
    backgroundColor:'#58595B',
    overflow: 'hidden'
  },
  title: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bolder',
    width: '100%',
    paddingTop: '5px',
    fontSize: '20px',
    '@media (max-width: 480px)': {
      fontSize: '15px'
    },
    color: 'white',
    margin: '0px',
    marginTop: '5px',
    
  },
  subtitle: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    color: 'white',
    margin: '0px',
    '@media (max-width: 480px)': {
      fontSize: '10px'
    },
    fontSize: '15px',
    marginTop: '5px',
    marginBottom: '20px',
    
  },
  button_container: {
    alignItems: 'flex-end',
    justify: 'flex-end',
  },
  button: {
    fontSize: '8px',
    fontWeight: '400',
    borderRadius: 50,
    backgroundColor :'white',
    color: '#58595B',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  container: {
    width: '95%',
    display: 'inline-block',
    alignItems: 'center',
    overflow: 'hidden'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class EmptyCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Grid
        container
        item xs={8}
        spacing={0}
        alignItems="center"
        justify="center"
        className={this.props.type === CardTypes.coffeeChat ? classes.cardCoffee : this.props.type === CardTypes.jobApplication ? classes.cardApp : classes.cardPosting}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            {this.props.type === CardTypes.coffeeChat ? "No booked coffee chats" : this.props.type === CardTypes.jobApplication ? "No submitted job applications" : "No job postings created"}
          </h1>
          <p className={classes.subtitle}>{this.props.type === CardTypes.coffeeChat ? "To book one, click the button below." : this.props.type === CardTypes.jobApplication ? "To view job applications, click the button below." : "To post one, click the button below."}</p>
          <span className={classes.button_container}>
            <Button className={classes.button} variant="contained" color="primary">
              {this.props.type === CardTypes.coffeeChat ? "View coffee chats" : this.props.type === CardTypes.jobApplication ? "View job applications" : "Create job posting"}
            </Button>
          </span>
        </div>
      </Grid>
    )
  }
}

EmptyCard = withMyHook(EmptyCard);
export default EmptyCard;
