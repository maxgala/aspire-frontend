import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import FeatureCard from "./FeatureCard.js"

class Features extends Component{
  render() {
    return(
      <div style={{backgroundColor: '#F1F1F1'}}>
        <h1 style={{paddingTop: '30px'}}>Features</h1>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
        >
          <Grid
            container
            item xs={9}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <FeatureCard front_text="Exclusive Coffee Chat Series" back_text="To be determined"/>
              <FeatureCard front_text="Professional Career & Board Opportunities" back_text="To be determined"/>
              <FeatureCard front_text="Hire MAX Professional Talent" back_text="To be determined"/>
            </div>
          </Grid>
          <Grid
            container
            item xs={9}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <FeatureCard front_text="Resume Bank" back_text="To be determined"/>
              <FeatureCard front_text="MAX Events" back_text="To be determined"/>
              <FeatureCard front_text="MAX Resources" back_text="To be determined"/>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Features;