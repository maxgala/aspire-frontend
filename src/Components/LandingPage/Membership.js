import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import MembershipCard from "./MembershipCard.js"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  background: { 
    backgroundColor: 'white',
    paddingTop:'3%',
    paddingBottom:'5%',
  },
  grid: { 
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '30px',
  },
  features_title: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "48px",
    margin: '0px',
    paddingTop: '30px',
    paddingBottom: '30px',
    color: 'black',
  },
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Membership extends Component {
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
            item xs={12} sm={9} md={6} lg={5}
            alignItems="center"
            justify="center"
          >
            <MembershipCard
              front_text="Aspiring Professionals"
              inner_text="Pricing Plan:"
              description="As an aspiring professional, you can use the MAX Aspire application to apply to jobs, schedule coffee chats with senior executives, and connect with fellow aspiring professionals!"
              type="aspiring_professional"
              buttonText="Join Now"
              appContext={this.props.appContext}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={5}
            alignItems="center"
            justify="center"
          >
            <MembershipCard
              front_text="Senior Professionals"
              inner_text="Pricing Plan"
              description="As a senior professional, you can get exclusive access to board positions, get the opportunity to mentor aspiring professionals, hire great talent, and connect with fellow senior professionals!"
              type="senior_professional"
              buttonText="Join Now"
              appContext={this.props.appContext}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Membership = withMyHook(Membership);
export default Membership;
