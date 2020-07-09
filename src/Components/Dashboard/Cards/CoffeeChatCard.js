import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import image from "../../Images/faceShot/pic1.png";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    maxWidth: '700px',
    height: '160px',
    borderStyle: 'solid',
    marginBottom: '20px',
    borderRadius: '20px'
  },
  image:{
    width: '100px',
    height: 'auto',
    borderRadius: '50%',
    margin: 'auto',
  },
  title: {
    width: '100%',
    textAlign: 'left',
    margin: '5px',
    paddingTop: '10px',
    fontSize: '20px'
  },
  subtitle: {
    width: '100%',
    textAlign: 'left',
    margin: '5px'
  },
  company: {
    width: '100%',
    textAlign: 'left',
    margin: '5px'
  },
  date: {
    width: '100%',
    textAlign: 'right',
    margin: '5px',
    paddingTop: '20px',
    fontSize: '10px'
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
