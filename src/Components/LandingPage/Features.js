import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import FeatureCard from "./FeatureCard.js"

class Features extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div style={{backgroundColor: 'lightgray'}}>
        <h1 style={{paddingTop: '30px'}}>Features</h1>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
        >
          <Grid
            container
            item xs={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
            </div>
          </Grid>
          <Grid
            container
            item xs={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <FeatureCard />
              <FeatureCard />
              <FeatureCard />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Features;