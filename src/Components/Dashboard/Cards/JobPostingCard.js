import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import view from "../../Images/view.png";
import edit from "../../Images/edit.png";
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import close from "../../Images/close.png";
//import { httpPut } from "../../lib/dataAccess";


const useStyles = makeStyles(() => ({
  card: {
    width: '95%',
    minHeight: '130px',
    maxWidth: '350px',
    height: '180px',
    marginBottom: '20px',
    borderRadius: '20px',
    backgroundColor:'#58595B',
    boxShadow: "0px 6px 6px #00000029",

  },

  grid: {
    paddingLeft: '30px',
    paddingright: '30px',
  },

  close: {
    position: 'absolute',
    right: '8%',
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
    fontSize: '17px',
    color: 'white',
  },

  line:{
    width:"55%",
    marginLeft: "0px"
  },

  datePosted:{
    fontSize: '10px',
    textAlign:'left',
    left:'10%',
    color: 'white',
    fontWeight:"700",
    padding:'4px',
    margin:'5px 0px 8px 0px',
  },

  status:{
    fontSize: '10px',
    margin:'0px 0px 6px 8px',
    color: 'white',
    fontWeight:"700"
  },

  active:{
    fontSize: '10px',
    marginLeft:"35%",
    marginBottom:"6px",
    marginTop:"0px",
    marginRight:"0px",
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
    marginLeft:'5%',
    marginTop:"10px",
    cursor: "pointer"
  },

  image2:{
    width: '22px',
    height:'22px',
    display: 'block',
    margin:'15px 0px 8px 10px',
    marginLeft:'5%',
    marginTop:"15px",
    marginBottom:"8px",
    cursor: "pointer"
  },

  textField: {
    width: '111ch',
    margin: '5px 20px 5px 20px',
  },

  toolbar: {
    height: '8vh',
    backgroundColor: 'black',
    boxShadow: '0px 0px 0px',
    width: '100%',
  },

  radioButton: {
    color: '#58595B',
    margin: '5px 20px 0px 30px',
    fontSize: '16px'
  },

  radioMarginFirst: {
    margin: '15px 20px 5px 30px',
    width: "85%"
  },

  radioMarginSecond: {
    margin: '15px 20px 0px 30px',
    width: "85%"
  },
  textbox: {
    boxShadow: '0px 0px 0px',
    color: 'white',
    '& .MuiInput-underline:before': {
      borderBottom: "2px solid #B6A165 ",
    },
    '& .MuiInput-underline:after': {
      color: '#455E6A',
      borderBottom: "2px solid #B6A165 "
    },
    '& label.Mui-focused': {
      color: '#455E6A',
    },
  },

  title2: {
    width: '95%',
    display: 'block',
    margin: '15px 10px 2px 10px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#58595B',
  },

  checkbox: {
    color: '#B6A165',
    '&$checked': {
      color: '#B6A165',
    },
  },

  checked: {},


}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes}/>
  }
}

class JobPostingCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      description: '',
      requirement: '',
      value: 'Full-Time',
      max_characters: 2000,
    }
  }

  handleDescriptionChange = name => event => {
    this.setState({
      description: event.target.value
    })
  };

  handleRequirementChange = name => event => {
    this.setState({
      requirement: event.target.value
    })
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChange2 = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClose = event =>{
    this.setState({
      open: false
    })
  };

  handleOpen = event =>{
    this.setState({
      open: true
    })
  };

  onSubmit

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
              alignItems="flex-end"
              justify="flex-end"
            >
              <Tooltip title="Edit" arrow>
               <img className={classes.image1} onClick={this.handleOpen} src={edit} alt="Edit Job Posting"/>
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
        <form>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth={'md'}
            PaperProps={{
              style: { borderRadius: 12 }
            }}
          >
            <Toolbar className={classes.toolbar}>
              <div>
                <h2 style={{ margin: '0px', marginTop: '10px', color: 'white' }}>Edit a Job</h2>

              </div>
              <img onClick={this.handleClose} className={classes.close} style={{ width: '14px', height: '14px', cursor: 'pointer' }} src={close} alt="Close button" />
            </Toolbar>
          
            <div className={classes.grid}>
              <Grid
                container
                item xs={12}
                spacing={1}

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
                    <div className={classes.radioMarginFirst}>
                      <TextField label="Job Title" fullWidth className={classes.textbox} defaultValue={this.props.data.title}
                        InputProps={{
                          classes: {
                            root: classes.outline,
                            focused: classes.cssFocused,
                            input: classes.input,
                          }
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item xs={6}
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  <Grid
                    container
                    item xs={12}
                    spacing={1}
                    alignItems="flex-end"
                    justify="flex-end"
                  >
                    <div className={classes.radioMarginFirst}>
                      <TextField label="Location" fullWidth className={classes.textbox} defaultValue={this.props.data.city}
                        InputProps={{
                          classes: {
                            input: classes.input,
                          }
                        }}
                      />
                    </div>
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
                    <div className={classes.radioMarginSecond}>
                      <TextField label="Company" fullWidth className={classes.textbox} defaultValue={this.props.data.company}
                        InputProps={{
                          classes: {
                            input: classes.input,
                          }
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item xs={3}
                  spacing={1}
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  <Grid
                    container
                    item xs={12}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel defaultValue={this.props.data.job_type} checked={this.props.data.job_type === 'REGULAR_JOBS'} value='Full-Time' control={<Radio color="primary" />} label="Full-Time" onChange={this.handleChange} />
                    </div>
                  </Grid>
                  <Grid
                    container
                    item xs={12}
                    spacing={0}
                    alignItems="center"
                    justify="center"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel checked={this.props.data.job_type === 'Contract'} value="Contract" control={<Radio color="primary" />} label="Contract" onChange={this.handleChange} />
                    </div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item xs={3}
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
                    <div className={classes.radioButton}>
                      <FormControlLabel checked={this.props.data.job_type === 'Part-Time'} value='Part-Time' control={<Radio color="primary" />} label="Part-Time" onChange={this.handleChange} />
                    </div>
                  </Grid>
                  <Grid
                    container
                    item xs={12}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start"
                  >
                    <div className={classes.radioButton}>
                      <FormControlLabel checked={this.props.data.job_type === 'Internship'} value="Internship" control={<Radio color="primary" />} label="Internship" onChange={this.handleChange} />
                    </div>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item xs={12}
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
                    <p className={classes.title2}>Job Description</p>
                    <TextField
                      multiline
                      rows={4}
                      defaultValue={this.props.data.description}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        maxLength: this.state.max_characters,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      value={this.state.description}
                      helperText={`${this.state.description.length}/${this.state.max_characters} Characters`}
                      className={classes.textField}
                      onChange={this.handleDescriptionChange("name")}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  item xs={12}
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
                    <p className={classes.title2}>Job Requirement</p>
                    <TextField
                      multiline
                      rows={4}
                      defaultValue={this.props.data.requirements}
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        maxLength: this.state.max_characters,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                      }}
                      value={this.state.requirement}
                      helperText={`${this.state.requirement.length}/${this.state.max_characters} Characters`}
                      className={classes.textField}
                      onChange={this.handleRequirementChange("name")}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                container
                item xs={12}
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
                  <div className={classes.contactBox}>
                    <FormControlLabel
                      className={classes.checkboxGrid}
                      control={
                        <Checkbox
                          checked={this.state.checkedBox}
                          onChange={this.handleChange2('checkedBox')}
                          value="checkedBox"
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                        />
                      }
                      label="Allow candidates to contact me about the posting (maximum of 4) "
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <DialogActions>
              <Button className={classes.button1} variant="contained" onClick={this.handleSubmit}>Save</Button>
            </DialogActions>
          </Dialog>
        </form>
        
      </div>
    )
  }
}

JobPostingCard = withMyHook(JobPostingCard);
export default JobPostingCard;
