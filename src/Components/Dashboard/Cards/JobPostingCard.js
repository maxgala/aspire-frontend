import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    minHeight: '130px',
    maxWidth: '300px',
    height: '18vw',
    marginBottom: '20px',
    borderRadius: '20px',
    backgroundColor:'#58595B',

  },
  button: {
    textTransform: 'none',
    backgroundColor: "#FFFFFF",
    marginTop:"20%",
    borderRadius: 50,
    color: "#58595B",
    position:'relative',
    display: 'block',
    '&:hover': {
        backgroundColor: "#F1F1F1",
        color: '#484848'
    },
    width:'8vw',
    fontSize:'0.7vw',
    fontWeight: 'bold',
    fontFamily:'myriad-pro, sans-serif',
    paddingLeft: '5px',
    paddingRight: '5px'
  },

  innerMargin:{
    marginLeft: '10%',
    marginRight: '5%',
  },

  title:{
    fontFamily: 'myriad-pro , sans-serif',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'left',
    marginBottom:'5%',
    marginRight:'0%',
    marginLeft:'0%',
    fontSize: '1.3vw',
    color: 'white',
    padding:'4px',
  },

  line:{
    width:"55%",
    //marginTop: "",
    marginLeft: "0px"
  },

  datePosted:{
    fontSize: '0.8vw',
    textAlign:'left',
    left:'10%',
    color: 'white',
    fontWeight:"700",
    padding:'4px',
    margin:'0vw 0vw 0.7vw 0vw',
  },

  status:{
    fontSize: '0.8vw',
    margin:'0vw 0vw 0.7vw 0vw',
    color: 'white',
    fontWeight:"700"
  },

  active:{
    fontSize: '0.8vw',
    margin:'0vw 0vw 0.7vw 0.5vw',
    color:'#6EA0B5',
    left:'10%',
    fontWeight:"700"
  },

  padding:{
    padding:'0px',
    margin:'0px'
  }

}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobPostingCard extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.card}>
        <div className={classes.innerMargin}>
        <p className={classes.title}>Marketing and Communication Intern</p>
        <hr className={classes.line}></hr>
        <p className={classes.datePosted}>Date Posted: July 12th, 2020</p>

        <Grid
            container
            item xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="center"
          >

          <Grid
            container
            item xs={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
         
          >
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <p className={classes.status}>Status:</p>
            </Grid>
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <p className={classes.status}>Submissions:</p>
            </Grid>
          </Grid>
          <Grid
          container
          item xs={6}
          spacing={1}
          alignItems="flex-start"
          justify="flex-start"
          >
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
     
            >
              <p className={classes.active}>Active</p>
            </Grid>

            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <p className={classes.active}>34</p>
            </Grid>
          </Grid>
        </Grid>


        <Grid
            container
            item xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="center"  
          >

          <Grid
            container
            item xs={6}
            spacing={1}
            alignItems="flex-start"
            justify="center"
            style={{padding:"0px"}}
          >
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
              style={{maxheight: '3vw', width:"4vw"}}
            >
              <Button className={classes.button}>Edit Job Post</Button>
            </Grid>
          </Grid>

          <Grid
            container
            item xs={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-end"
            style={{padding:"0px"}}
          >
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="center"
              style={{maxheight: '4vw',width:"3vw"}}
            >
              <Button className={classes.button}>View Submissions</Button>
            </Grid>
          </Grid>
        </Grid>

        </div>
      </div>
    )
  }
}

JobPostingCard = withMyHook(JobPostingCard);
export default JobPostingCard;
