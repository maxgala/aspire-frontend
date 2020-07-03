import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import MembershipCard from "./MembershipCard.js"
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  background: { 
    backgroundColor: 'white',
    paddingTop:'3%',
    paddingBottom:'5%',
    textAlign: 'center'
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
  more_info: {
    fontSize: '15px',
    fontFamily: 'myriad-pro, sans-serif',
    color: '#6ea0b5',
    cursor: 'pointer',
    display: 'inline',
    padding: '5px',
    '&:hover': {
      backgroundColor: "#F1F1F1",
      color: '#484848'
    }
  },
  membership_table: {
    width: '100%',
    border: '4px solid #dddddd',
  },
  table_element: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px'
  }
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
      aspire_platinum: {},
      open: false
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

  openMemberships = (event) => {
    this.setState({
      open: true
    })
  };

  handleClose = event =>{
    this.setState({
      open: false
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
        <p className={classes.more_info} onClick={this.openMemberships}>more information about the membership options</p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle id="scroll-dialog-title">
            <div>
              <h2 style={{margin: '0px', marginTop: '10px'}}>Membership Breakdown</h2>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              component={'span'}
            >
              <table className={classes.membership_table}>
                <thead>
                  <tr>
                    <th className={classes.table_element}>Feature</th>
                    <th className={classes.table_element}>Free</th>
                    <th className={classes.table_element}>Premium</th>
                    <th className={classes.table_element}>Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes.table_element}>See Profiles of Senior Executives Committed to MAX Aspire</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Request 1-on-1 Coffee Chats wtih Senior Executives</td>
                    <td className={classes.table_element}>Pay per use</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>N/A</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Request 4-on-1 Coffee Chats wtih Senior Executives</td>
                    <td className={classes.table_element}>Pay per use</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>N/A</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Access to Mock Interviews</td>
                    <td className={classes.table_element}>Pay per use</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>N/A</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Apply to Board Roles</td>
                    <td className={classes.table_element}>No</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Contact Individual who Posted Board Role</td>
                    <td className={classes.table_element}>No</td>
                    <td className={classes.table_element}>Yes</td>
                    <td className={classes.table_element}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Access to Resume Bank</td>
                    <td className={classes.table_element}>N/A</td>
                    <td className={classes.table_element}>N/A</td>
                    <td className={classes.table_element}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Option to Sponsor an Aspiring Professional who is Financially Constrained</td>
                    <td className={classes.table_element}>N/A</td>
                    <td className={classes.table_element}>Yes ($49 or $98)</td>
                    <td className={classes.table_element}>Yes ($49 or $98)</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Starting Credits Received</td>
                    <td className={classes.table_element}>0</td>
                    <td className={classes.table_element}>30</td>
                    <td className={classes.table_element}>30</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Cost to Purchase 5 Additional Credits</td>
                    <td className={classes.table_element}>$10</td>
                    <td className={classes.table_element}>$5</td>
                    <td className={classes.table_element}>$5</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Refer a Friend Signup Bonus</td>
                    <td className={classes.table_element}>10 credits</td>
                    <td className={classes.table_element}>10 credits</td>
                    <td className={classes.table_element}>10 credits</td>
                  </tr>
                </tbody>
              </table>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              type="submit"
              variant="contained"
              color="primary"
              style={{margin: 'auto'}}
            >
              <b>Close</b>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Membership = withMyHook(Membership);
export default Membership;
