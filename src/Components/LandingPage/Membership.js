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
  constructor(props) {
    super(props);
    this.state = {
      aspire_free: {},
      aspire_premium: {},
      aspire_platinum: {}
    }
  }

  handleAspirePremiumClick = event => {
    this.setState({
      aspire_free: {},
      aspire_premium: {borderStyle: 'solid', borderWidth: '2px', borderColor: 'red'},
      aspire_platinum: {}
    })
  };

  handleAspirePlatinumClick = event => {
    this.setState({
      aspire_free: {},
      aspire_premium: {},
      aspire_platinum: {borderStyle: 'solid', borderWidth: '2px', borderColor: 'red'}
    })
  };

  handleAspireFreeClick = event => {
    this.setState({
      aspire_free: {borderStyle: 'solid', borderWidth: '2px', borderColor: 'red'},
      aspire_premium: {},
      aspire_platinum: {}
    })
  };
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
              style={this.state.aspire_free}
            container
            item xs={12} sm={9} md={6} lg={4}
            alignItems="center"
            justify="center"
          >
            <MembershipCard
                front_text={"Aspiring Professionals Free"}
                inner_text="Pricing Plan:"
                description="With the free membership plan, you will able to view jobs on the platform and you can schedule coffee chats and mock interviews on a pay per use basis"
                type="aspiring_professional"
                buttonText={"Try for Free"}
                buttonFunction={this.props.landing ? this.props.freeFunction : this.handleAspireFreeClick}
                appContext={this.props.appContext}
            />
          </Grid>
          <Grid
              style={this.state.aspire_premium}
            container
            item xs={12} sm={9} md={6} lg={4}
            alignItems="center"
            justify="center"
          >
            <MembershipCard
                front_text="Aspiring Professionals Premium"
                inner_text="Pricing Plan:"
                description="With the premium membership plan, you can view and apply to jobs, and get 30 credits to schedule coffee chats and mock interviews with senior executives"
                type="aspiring_professional"
                buttonText={"Sign Up for Premium"}
                buttonFunction={this.props.landing ? this.props.premiumFunction : this.handleAspirePremiumClick}
                appContext={this.props.appContext}
            />
          </Grid>
          <Grid
              style={this.state.aspire_platinum}
              container
              item xs={12} sm={9} md={6} lg={4}
              alignItems="center"
              justify="center"
          >
            <MembershipCard
                front_text="Senior Professionals Platinum"
                inner_text="Pricing Plan"
                description="The Platinum plan gives you exclusive access to board positions, the opportunity to mentor aspiring professionals, hire great talent, and connect with fellow senior professionals!"
                type="senior_professional"
                buttonText="Sign Up for Platinum"
                buttonFunction={this.props.landing ? this.props.platinumFunction : this.handleAspirePlatinumClick}
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
