import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import MembershipCard from "./MembershipCard.js"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  background: { 
    backgroundColor: 'white',
  },
  grid: { 
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  features_title: { 
    paddingTop: '30px',
    fontWeight: '500',
    fontSize: '36px',
    color: 'black',
  },
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Membership extends Component{
  render() {
    const classes = this.props.classes;
    return(
      <div className={classes.background}>
        <h1 className={classes.features_title}>Memberships</h1>
        <Grid
          container
          spacing={8}
          alignItems="center"
          justify="center"
          className={classes.grid}
          > 
          <Grid
            container
            item xs={12} sm={6} md={6} lg={4}
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <MembershipCard
              front_text="Mentee"
              inner_text="Pricing Plan:"
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={6} md={6} lg={4}
            spacing={0}
            alignItems="center"
            justify="center"
          >
            <MembershipCard
              front_text="Mentor"
              inner_text="Pricing Plan"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Membership = withMyHook(Membership);
export default Membership;