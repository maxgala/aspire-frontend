import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import FeatureCard from "./FeatureCard.js"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  background: { 
    backgroundColor: '#F1F1F1',
  },
  features_title: { 
    paddingTop: '30px',
    fontWeight: '500',
    fontSize: '36px',
    color: 'black',
  },
  grid: { 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
        >
          <Grid
            container
            item xs={9}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <div className={classes.grid}>
              <FeatureCard
                front_text="Exclusive Coffee Chat Series"
                back_text="To be determined"
              />
              <FeatureCard
                front_text="Professional Career & Board Opportunities"
                back_text="To be determined"
              />
              <FeatureCard
                front_text="Hire MAX Professional Talent"
                back_text="To be determined"
              />
            </div>
          </Grid>
          <Grid
            container
            item xs={9}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <div className={classes.grid}>
              <FeatureCard
                front_text="Resume Bank"
                back_text="To be determined"
              />
              <FeatureCard
                front_text="MAX Events"
                back_text="To be determined"
              />
              <FeatureCard
                front_text="MAX Resources"
                back_text="To be determined"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Features = withMyHook(Features);
export default Features;
