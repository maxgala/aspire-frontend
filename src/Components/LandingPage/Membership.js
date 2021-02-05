import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Tooltip from "@material-ui/core/Tooltip";

import MembershipCard from "./MembershipCard.js";

const useStyles = makeStyles(() => ({
  background: {
    paddingTop: "3%",
    paddingBottom: "5%",
    textAlign: "center",
  },

  grid: {
    paddingLeft: "10%",
    paddingRight: "10%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "30px",
  },
  features_title: {
    fontFamily: "Nunito Sans",
    fontWeight: "Bold",
    fontSize: "48px",
    "@media (max-width: 480px)": {
      fontSize: "30px",
    },
    margin: "0px",
    paddingTop: "30px",
    paddingBottom: "30px",
    color: "black",
  },
  more_info: {
    fontSize: "15px",
    fontFamily: "myriad-pro, sans-serif",
    color: "#6ea0b5",
    cursor: "pointer",
    display: "inline",
    padding: "5px",
    "&:hover": {
      backgroundColor: "#F1F1F1",
      color: "#484848",
    },
  },
  membership_table: {
    width: "100%",
    border: "4px solid #dddddd",
  },
  table_element: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
  table_element_free: {
    border: "1px solid #dddddd",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "#A9A9A9",
    color: "white",
  },
  table_element_premium: {
    border: "1px solid #dddddd",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "#B5A165",
    color: "white",
  },
  table_element_plat: {
    border: "1px solid #dddddd",
    textAlign: "center",
    padding: "8px",
    backgroundColor: "#6EA0B5",
    color: "white",
  },
  tooltip: {
    cursor: "pointer",
    display: "inline-block",
    marginLeft: "10px",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class Membership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aspire_free: {},
      aspire_premium: {},
      aspire_platinum: {},
      open: false,
    };
  }

  handleAspirePremiumClick = (event) => {
    this.props.premiumFunction();
    this.setState({
      aspire_free: {},
      aspire_premium: {
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "#b5a165",
      },
      aspire_platinum: {},
    });
  };

  handleAspirePlatinumClick = (event) => {
    this.props.platinumFunction();
    this.setState({
      aspire_free: {},
      aspire_premium: {},
      aspire_platinum: {
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "#b5a165",
      },
    });
  };

  handleAspireFreeClick = (event) => {
    this.props.freeFunction();
    this.setState({
      aspire_free: {
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "#b5a165",
      },
      aspire_premium: {},
      aspire_platinum: {},
    });
  };

  openMemberships = (event) => {
    this.setState({
      open: true,
    });
  };

  handleClose = (event) => {
    this.setState({
      open: false,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.background}>
        <h1 className={classes.features_title}>
          Memberships
          <div className={classes.tooltip} onClick={this.openMemberships}>
            <Tooltip title="More information about the membership options">
              <InfoOutlinedIcon size="x2" />
            </Tooltip>
          </div>
        </h1>
        <Grid
          container
          spacing={8}
          alignItems="center"
          justify="center"
          className={classes.grid}
        >
          <Grid
            container
            item
            xs={12}
            sm={9}
            md={6}
            lg={4}
            alignItems="center"
            justify="center"
          >
            <div style={this.state.aspire_free}>
              <MembershipCard
                number="$0"
                payment={{ background: "#6EA0B5" }}
                membership_type_text="Free"
                front_text={"Aspiring Professionals"}
                inner_text="Pricing Plan:"
                description="With the free membership plan, you will able to view jobs on the platform and, schedule coffee chats and mock interviews on a pay per use basis"
                type="aspiring_professional"
                buttonText={this.props.freeButtonText}
                buttonFunction={
                  this.props.landing
                    ? this.props.freeFunction
                    : this.handleAspireFreeClick
                }
                appContext={this.props.appContext}
              />
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={9}
            md={6}
            lg={4}
            alignItems="center"
            justify="center"
          >
            <div style={this.state.aspire_premium}>
              <MembershipCard
                payment={{ background: "#b5a165" }}
                number="$49"
                membership_type_text="Premium"
                front_text="Aspiring Professionals"
                inner_text="Pricing Plan:"
                description="With the premium membership plan, you can view and apply to jobs, and get 30 credits to schedule coffee chats and mock interviews with senior executives"
                type="aspiring_professional"
                buttonText={this.props.premiumButtonText}
                buttonFunction={
                  this.props.landing
                    ? this.props.premiumFunction
                    : this.handleAspirePremiumClick
                }
                appContext={this.props.appContext}
              />
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={9}
            md={6}
            lg={4}
            alignItems="center"
            justify="center"
          >
            <div style={this.state.aspire_platinum}>
              <MembershipCard
                number="$75"
                payment={{ color: "black" }}
                membership_type_text="Platinum"
                front_text="Senior Executives"
                inner_text="Pricing Plan"
                description="The Platinum plan gives you exclusive access to board positions, the opportunity to mentor aspiring professionals, hire great talent, and connect with fellow senior professionals!"
                type="senior_professional"
                buttonText={this.props.platinumButtonText}
                buttonFunction={
                  this.props.landing
                    ? this.props.platinumFunction
                    : this.handleAspirePlatinumClick
                }
                appContext={this.props.appContext}
              />
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth={true}
          maxWidth={"lg"}
        >
          <DialogTitle id="scroll-dialog-title">
            <div>
              <h2
                style={{ margin: "0px", marginTop: "10px", color: "#B5A165" }}
              >
                Membership Options
              </h2>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              component={"span"}
            >
              <table className={classes.membership_table}>
                <thead>
                  <tr>
                    <th className={classes.table_element}>Feature</th>
                    <th className={classes.table_element_free}>
                      Aspiring Professional
                      <br />
                      Free
                    </th>
                    <th className={classes.table_element_premium}>
                      Aspiring Professional
                      <br />
                      Premium
                    </th>
                    <th className={classes.table_element_plat}>
                      Senior Executive
                      <br />
                      Platinum
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={classes.table_element}>
                      Ability to View Job Postings
                    </td>
                    <td className={classes.table_element_free}>Yes</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>
                      Ability to Apply for Jobs Posted
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  {/* TODO: reanable when complete post MVP
                  <tr>
                    <td className={classes.table_element}>
                      Ability to Contact Person who Posted the Job
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  */}
                  <tr>
                    <td className={classes.table_element}>
                      Post Resume/CV on Jobs Bank (accessible by Senior
                      Executives)
                    </td>
                    <td className={classes.table_element_free}>Yes</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>
                      Ability to Post Jobs
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>
                      See Profiles of Senior Executives Committed to MAX Aspire
                    </td>
                    <td className={classes.table_element_free}>Yes</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>
                      1-on-1 Coffee Chats with Senior Executives
                    </td>
                    <td className={classes.table_element_free}>Pay per use</td>
                    <td className={classes.table_element_premium}>
                      Yes, can request
                    </td>
                    <td className={classes.table_element_plat}>Yes, leading</td>
                  </tr>
                  {/* TODO: reanable when complete post MVP
                  <tr>
                    <td className={classes.table_element}>
                      4-on-1 Coffee Chats with Senior Executives
                    </td>
                    <td className={classes.table_element_free}>Pay per use</td>
                    <td className={classes.table_element_premium}>
                      Yes, can request
                    </td>
                    <td className={classes.table_element_plat}>Yes, leading</td>
                  </tr>
                  */}
                  <tr>
                    <td className={classes.table_element}>
                      Mock Interviews with Senior Executives
                    </td>
                    <td className={classes.table_element_free}>Pay per use</td>
                    <td className={classes.table_element_premium}>
                      Yes, can request
                    </td>
                    <td className={classes.table_element_plat}>Yes, leading</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>
                      Ability to Apply to Board Roles
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  {/* TODO: reanable when complete post MVP
                  <tr>
                    <td className={classes.table_element}>
                      Ability to Contact Individual who Posted Board Role
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>Yes</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  */}
                  <tr>
                    <td className={classes.table_element}>
                      Access to Resume Bank
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>No</td>
                    <td className={classes.table_element_plat}>Yes</td>
                  </tr>
                  {/* TODO: reanable when complete post MVP
                  <tr>
                    <td className={classes.table_element}>
                      Option to Sponsor an Aspiring Professional who is
                      Financially Constrained
                    </td>
                    <td className={classes.table_element_free}>No</td>
                    <td className={classes.table_element_premium}>
                      Yes ($49 or more)
                    </td>
                    <td className={classes.table_element_plat}>
                      Yes ($49 or more)
                    </td>
                  </tr>
                  */}
                  <tr>
                    <td className={classes.table_element}>
                      Starting Credits Received
                    </td>
                    <td className={classes.table_element_free}>0 credits</td>
                    <td className={classes.table_element_premium}>
                      25 credits
                    </td>
                    <td className={classes.table_element_plat}>25 credits</td>
                  </tr>
                  <tr>
                    <td className={classes.table_element}>
                      Cost to Purchase 5 Additional Credits
                    </td>
                    <td className={classes.table_element_free}>$10</td>
                    <td className={classes.table_element_premium}>$5</td>
                    <td className={classes.table_element_plat}>$5</td>
                  </tr>
                  {/* TODO: reanable when complete post MVP
                  <tr>
                    <td className={classes.table_element}>
                      Refer a Friend Signup Bonus
                    </td>
                    <td className={classes.table_element_free}>10 credits</td>
                    <td className={classes.table_element_premium}>
                      10 credits
                    </td>
                    <td className={classes.table_element_plat}>10 credits</td>
                  </tr>
                  */}
                  <tr>
                    <th
                      style={{ borderTop: "4px solid #dddddd" }}
                      className={classes.table_element}
                    >
                      Annual Membership Price
                    </th>
                    <th
                      style={{ borderTop: "4px solid #dddddd" }}
                      className={classes.table_element_free}
                    >
                      Free
                    </th>
                    <th
                      style={{ borderTop: "4px solid #dddddd" }}
                      className={classes.table_element_premium}
                    >
                      $49
                    </th>
                    <th
                      style={{ borderTop: "4px solid #dddddd" }}
                      className={classes.table_element_plat}
                    >
                      $75
                    </th>
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
              style={{ margin: "auto", backgroundColor: "#B5A165" }}
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
