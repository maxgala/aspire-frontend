import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import FeatureCard from "./FeatureCard.js"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  background: { 
    backgroundColor: '#F1F1F1',
    paddingTop:'1%',
    paddingBottom:'5%',
  },
  features_title: { 
    fontFamily: "Nunito Sans",
    fontWeight: "bold",
    fontSize: "48px",
    paddingTop: '30px',
    color: 'black',
  },
  grid: { 
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '30px',
  },
}));

function withMyHook(Component){
    return function WrappedComponent(props){
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Features extends Component{
  render() {
    const classes = this.props.classes;
    return(
      <div className={classes.background}>
        <h1 className={classes.features_title}>Features</h1>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          className={classes.grid}
          id="features"
        >  
          <Grid
            container
            item xs={12} sm={9} md={6} lg={true}
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <FeatureCard
              front_text="Exclusive Coffee Chat Series"
              back_text="Schedule an exclusive meeting with a high performing, accomplished Senior Executive to help guide, mentor, and assist in shaping your career."
              card_number={1}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={true}
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <FeatureCard
              front_text="Professional Job Opportunities"
              back_text="Employers are eager to hire from the talented individuals in the MAX Network. Apply to job opportunities posted directly from a MAX Aspire member."
              card_number={2}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={true}
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <FeatureCard
              front_text="Board of Director Opportunities"
              back_text="As MAX grows and is recognized for its talent, Board positions are presented. Apply to opportunities to serve on a Board of Directors."
              card_number={3}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={true}
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <FeatureCard
              front_text="Hire MAX Professional Talent"
              back_text="Are you looking to hire exceptional aspiring professionals from the MAX Network? Post a job on MAX Aspire so you can hire great talent!"
              card_number={4}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={true}
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <FeatureCard
              front_text="Resume Bank"
              back_text="Senior Professionals on MAX Aspire have access to all resumes of Aspiring Professionals who sign up. You may fortuitously be contacted regarding a potential match for a listed or unlisted role."
              card_number={5}
            />
          </Grid>
          <Grid
            container
            item xs={12} sm={9} md={6} lg={true}
            spacing={2}
            alignItems="center"
            justify="center"
          >
            <FeatureCard
              front_text="Mock Interviews"
              back_text="Ace your next interview by being well prepared through MAX Aspire’s Mock Interviews. Book an interview and get that dream job you have been preparing for!"
              card_number={6}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Features = withMyHook(Features);
export default Features;
