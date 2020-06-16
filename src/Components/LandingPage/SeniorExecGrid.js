import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SeniorExec from "./SeniorExec.js"
import {makeStyles} from "@material-ui/core/styles";
import SeniorExecText from "./SeniorExecText";
import SmallSeniorExec from "./SmallSeniorExec";

const useStyles = makeStyles(() => ({
  background: { 
    backgroundColor: 'white',
  },
  grid: { 
    paddingLeft: '15%',
    paddingRight: '15%',
    justifyContent: 'center',
    alignItems: 'start',
    paddingBottom: '0px'
  }
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
        
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          className={classes.grid}
          > 
          <Grid
            container
            item xs={8} 
            spacing={0}
            alignItems="center"
            justify="center"
          >
              <Grid
              container
              item xs={12} 
              spacing = {3}
              alignItems="center"
              justify="center"
              
              >
                  <Grid
                  container
                  item xs={6}
                  alignItems="center"
                  justify="center"
                  >
                      <SeniorExec
                    front_text="Aspiring Professionals"
                    inner_text="Pricing Plan:"
                    description="As an aspiring professional, you can use the MAX Aspire application to apply to jobs, schedule coffee chats with senior executives, and connect with fellow aspiring professionals!"
                    type="aspiring_professional"
                    />
                    
                  </Grid>
                  <Grid
                  container
                  item xs={6}
                  alignItems="center"
                  justify="center"
                  >
                      <SeniorExec
                    front_text="Aspiring Professionals"
                    inner_text="Pricing Plan:"
                    description="As an aspiring professional, you can use the MAX Aspire application to apply to jobs, schedule coffee chats with senior executives, and connect with fellow aspiring professionals!"
                    type="aspiring_professional"
                    />
                    
                  </Grid>
                  <SeniorExecText/>
                  
              </Grid>  
          </Grid>
          <Grid
            container
            item xs={4} 
            alignItems="flex-end"
            justify="flex-end"
          >
            <SmallSeniorExec
              front_text="Senior Executives"
              inner_text="Pricing Plan"
              description="As a senior executive, you can get exclusive access to board positions, get the opportunity to mentor aspiring professionals, hire great talent, and connect with fellow senior executives!"
              type="senior_executive"
            />
            <SmallSeniorExec
              front_text="Senior Executives"
              inner_text="Pricing Plan"
              description="As a senior executive, you can get exclusive access to board positions, get the opportunity to mentor aspiring professionals, hire great talent, and connect with fellow senior executives!"
              type="senior_executive"
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Membership = withMyHook(Membership);
export default Membership;