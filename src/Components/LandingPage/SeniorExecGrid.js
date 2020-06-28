import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import SeniorExec from "./SeniorExec.js"
import {makeStyles} from "@material-ui/core/styles";
import SeniorExecText from "./SeniorExecText";
import SmallSeniorExec from "./SmallSeniorExec";
import SmallSeniorExecImgHover from "../Images/senior/Latafat_Faran2.jpg";
import SmallSeniorExecImg from "../Images/senior/Latafat_Faran.jpg";
import SmallSeniorExecBottom from "./SeniorExecSmallBottom";
import SeniorExecImg from "../Images/senior/Salman_Zahid (1).jpg"
import SeniorExecImgHover from "../Images/senior/Salman_Zahid2.jpg"

const useStyles = makeStyles(() => ({
  background_lg: { 
    backgroundColor: 'white',
    '@media (max-width: 1000px)': {display: 'None'},
  },
  background_md: { 
    backgroundColor: 'white',
    '@media (max-width: 550px)': {display: 'None'},
    '@media (min-width: 1000px)': {display: 'None'}
  },
  background_sm: { 
    backgroundColor: 'white',
    '@media (min-width: 550px)': {display: 'None'}
  },
  seniorexec:{
    paddingTop :'10vh',
    backgroundColor: 'white'
  },
  grid: { 
    paddingLeft: '15%',
    paddingRight: '15%',
    justifyContent: 'center',
    alignItems: 'start',
    paddingBottom: '10vh'
  }
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class SeniorExecGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
      phone: '',
      desktop: 'None'
    };
  }

  render() {
    const classes = this.props.classes;
    return(
      <div className={classes.seniorexec}>
        <div className={classes.background_lg}>
          <Grid
            container
            spacing={2}
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
                spacing = {4}
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
                    name_text="Salman Zahid"
                    extra_text="President & CEO of Green Shield Canada"
                    image = {SeniorExecImg}
                    hover_image = {SeniorExecImgHover}
                  />
                </Grid>
                <Grid
                  container
                  item xs={6}
                  alignItems="center"
                  justify="center"
                >
                  <SeniorExec
                    name_text="Salman Zahid"
                    extra_text="President & CEO of Green Shield Canada"
                    image = {SeniorExecImg}
                    hover_image = {SeniorExecImgHover}
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
                name_text="Latafat Faran"
                extra_text="Executive Vice President at Core Development Group"
                image = {SmallSeniorExecImg}
                hover_image = {SmallSeniorExecImgHover}
              />
              <SmallSeniorExecBottom
                name_text="Latafat Faran"
                extra_text="Executive Vice President at Core Development Group"
                image = {SmallSeniorExecImg}
                hover_image = {SmallSeniorExecImgHover}
              />
            </Grid>
          </Grid>
        </div>
        
        <div className={classes.background_md}>
          <Grid
            container
            item xs={12}
            spacing={0}
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Grid
              container
              item xs={6}
              alignItems="flex-end"
              justify="flex-end"
            >
              <SmallSeniorExec
                name_text="Latafat Faran"
                extra_text="Executive Vice President at Core Development Group"
                image = {SmallSeniorExecImg}
                hover_image = {SmallSeniorExecImgHover}
              />
            </Grid>
            <Grid
              container
              item xs={6}
              spacing={0}
              alignItems="center"
              justify="center"
            >
              <SmallSeniorExecBottom
                name_text="Latafat Faran"
                extra_text="Executive Vice President at Core Development Group"
                image = {SmallSeniorExecImg}
                hover_image = {SmallSeniorExecImgHover}
              />
            </Grid>
            <SeniorExecText/>
          </Grid>
        </div>
        
        <div className={classes.background_sm}>
          <Grid
            container
            item xs={12}
            spacing={0}
            alignItems="center"
            justify="center"
            className={classes.grid}
          > 
            <Grid
              container
              item xs={12}
              alignItems="flex-end"
              justify="flex-end"
            >
              <SmallSeniorExec
                name_text="Latafat Faran"
                extra_text="Executive Vice President at Core Development Group"
                image = {SmallSeniorExecImg}
                hover_image = {SmallSeniorExecImgHover}
              />
            </Grid>
            <SeniorExecText/>
          </Grid>
        </div>
      </div>
    );
  }
}

SeniorExecGrid = withMyHook(SeniorExecGrid);
export default SeniorExecGrid;
