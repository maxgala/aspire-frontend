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
  },
  table_element_free: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#daa067',
    color: 'white'
  },
  table_element_premium: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#A9A9A9',
    color: 'white'
  },
  table_element_plat: {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#B5A165',
    color: 'white'
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
      open: false
    }
  }

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
              <h2 style={{margin: '0px', marginTop: '10px', color: '#B5A165'}}>Membership Options</h2>
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
                    <th className={classes.table_element_free}>Free</th>
                    <th className={classes.table_element_premium}>Premium</th>
                    <th className={classes.table_element_plat}>Platinum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes.table_element}>Ability to View Job Postings</td>
                    <td className={classes.table_element_free}>Yes</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Apply for Jobs Posted</td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Contact Person who Posted the Job</td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Post Resume/CV on Jobs Bank (accessible by Senior Executives)</td>
                    <td className={classes.table_element_free}>Yes</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Post Jobs</td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>See Profiles of Senior Executives Committed to MAX Aspire</td>
                    <td className={classes.table_element_free}>Yes</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Request 1-on-1 Coffee Chats wtih Senior Executives</td>
                    <td className={classes.table_element_free}>Pay per use</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>-</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Request 4-on-1 Coffee Chats wtih Senior Executives</td>
                    <td className={classes.table_element_free}>Pay per use</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>-</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Access to Mock Interviews</td>
                    <td className={classes.table_element_free}>Pay per use</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>-</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Apply to Board Roles</td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Ability to Contact Individual who Posted Board Role</td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Access to Resume Bank</td>
                    <td className={classes.table_element_free}>-</td>
                    <td className={classes.table_element_premium}>-</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Option to Sponsor an Aspiring Professional who is Financially Constrained</td>
                    <td className={classes.table_element_free}>-</td>
                    <td className={classes.table_element_premium}>Yes ($49 or more)</td>
                    <td className={classes.table_element_plat}>Yes ($49 or more)</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Starting Credits Received</td>
                    <td className={classes.table_element_free}>0</td>
                    <td className={classes.table_element_premium}>30</td>
                    <td className={classes.table_element_plat}>30</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Cost to Purchase 5 Additional Credits</td>
                    <td className={classes.table_element_free}>$10</td>
                    <td className={classes.table_element_premium}>$5</td>
                    <td className={classes.table_element_plat}>$5</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>Refer a Friend Signup Bonus</td>
                    <td className={classes.table_element_free}>10 credits</td>
                    <td className={classes.table_element_premium}>10 credits</td>
                    <td className={classes.table_element_plat}>10 credits</td>
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
              style={{margin: 'auto', backgroundColor: '#B5A165'}}
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
