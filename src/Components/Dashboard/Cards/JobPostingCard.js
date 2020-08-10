import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import view from "../../Images/view.png";
import edit from "../../Images/edit.png";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    minHeight: '130px',
    maxWidth: '400px',
    height: '180px',
    marginBottom: '20px',
    borderRadius: '20px',
    backgroundColor:'#58595B',
    boxShadow: "0px 6px 6px #00000029",

  },
  button: {
    textTransform: 'none',
    backgroundColor: "#FFFFFF",
    marginTop:"15%",
    borderRadius: 50,
    color: "#58595B",
    position:'relative',
    display: 'block',
    '&:hover': {
        backgroundColor: "#F1F1F1",
        color: '#484848'
    },
    width:'10vw',
    fontSize:'0.9vw',
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
    marginBottom:'2%',
    marginRight:'0%',
    marginLeft:'0%',
    fontSize: '18px',
    color: 'white',
  },

  line:{
    width:"55%",
    marginLeft: "0px"
  },

  datePosted:{
    fontSize: '0.9vw',
    textAlign:'left',
    left:'10%',
    color: 'white',
    fontWeight:"700",
    padding:'4px',
    margin:'5px 0px 8px 0px',
  },

  status:{
    fontSize: '0.9vw',
    margin:'0px 0px 6px 8px',
    color: 'white',
    fontWeight:"700"
  },

  active:{
    fontSize: '0.9vw',
    margin:'0px 0px 6px 8px',
    color:'#6EA0B5',
    left:'10%',
    fontWeight:"700"
  },

  padding:{
    padding:'0px',
    margin:'0px'
  },

  image1:{
    width: '15px',
    height:'30px',
    display: 'block',
    margin:'10px 0px 0px 20px',
    cursor: "pointer"
  },

  image2:{
    width: '22px',
    height:'22px',
    display: 'block',
    margin:'15px 0px 8px 10px',
    cursor: "pointer"
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
            justify="flex-start"
          >

          <Grid
            container
            item xs={5}
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
          item xs={4}
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

          <Grid
          container
          item xs={2}
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
              <Tooltip title="Edit" arrow>
               <img className={classes.image1} src={edit} alt="Edit Job Posting"/>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid
          container
          item xs={2}
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
              <Tooltip title="View" arrow>
                <img className={classes.image2} src={view} alt="View Job Posting"/>
              </Tooltip>
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
