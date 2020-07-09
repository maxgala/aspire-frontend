import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import image from "../../Images/faceShot/pic1.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    maxWidth: '700px',
    height: '160px',
    marginBottom: '20px',
    borderRadius: '20px',
    backgroundColor: '#B6A165'
  },
  image:{
    width: '100px',
    height: 'auto',
    borderRadius: '50%',
    margin: 'auto',
  },
  title: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bolder',
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    paddingTop: '10px',
    fontSize: '20px',
    color: 'white'
  },
  subtitle: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    color: 'white'
  },
  company: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    color: 'white'
  },
  date: {
    fontFamily: 'myriad-pro, sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'right',
    margin: '5px',
    paddingTop: '20px',
    fontSize: '10px',
    color: 'white'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class CoffeeChatCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <Grid
          container
          item xs={12}
          spacing={1}
          alignItems="flex-start"
          justify="center"
        >
          <Grid
            container
            item xs={4}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
            style={{height: '160px'}}
          >
            <img className={classes.image} src={image} alt={"Coffee Chat Card"}/>
          </Grid>
          <Grid
            container
            item xs={8}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <p className={classes.title}>One-on-One</p>
            <p className={classes.subtitle}>Yusuf H, Finance Professional</p>
            <p className={classes.company}>TD</p>
            <p className={classes.date}>Scheduled: July 10th, 2020</p>
          </Grid>
        </Grid>
      </div>
    )
  }
}

CoffeeChatCard = withMyHook(CoffeeChatCard);
export default CoffeeChatCard;
