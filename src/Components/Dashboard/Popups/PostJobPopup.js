import React, { useState } from "react";
import close from "../../Images/close.png";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
/* TODO: add back when industry tags is working
import IndustryTags from "../../Registration/industry_tags";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";*/

function PostJobPopup({
  jobsData,
  openPostJob,
  submitJob,
  handlePostJobClose,
  handleFormDataChange,
  /* TODO: add back when industry tags is working
  onTagsChange,
  showError,
  errorText,*/
  checkedBox,
  classes,
}) {
  const [maxCharacters] = useState(2000);

  return (
    <Dialog
      open={openPostJob}
      onClose={handlePostJobClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth={"md"}
      PaperProps={{
        style: { borderRadius: 12 },
      }}
    >
      <Toolbar className={classes.toolbar}>
        <div>
          <h2 style={{ margin: "0px", marginTop: "10px", color: "white" }}>
            Post a Job
          </h2>
        </div>
        <img
          onClick={handlePostJobClose}
          className={classes.close}
          style={{ width: "14px", height: "14px", cursor: "pointer" }}
          src={close}
          alt="Close button"
        />
      </Toolbar>
      <div className={classes.grid}>
        <Grid container item xs={12} spacing={1}>
          <Grid
            container
            item
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <div className={classes.radioMarginFirst}>
                <TextField
                  label="Job Title"
                  fullWidth
                  className={classes.textbox}
                  InputProps={{
                    classes: {
                      root: classes.outline,
                      focused: classes.cssFocused,
                      input: classes.input,
                    },
                  }}
                  onChange={handleFormDataChange("title")}
                />
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item
                xs={4}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <div className={classes.radioMarginFirst}>
                  <TextField
                    label="Country"
                    fullWidth
                    className={classes.textbox}
                    InputProps={{
                      classes: {
                        input: classes.input,
                      },
                    }}
                    onChange={handleFormDataChange("country")}
                  />
                </div>
              </Grid>
              <Grid
                container
                item
                xs={4}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <div className={classes.radioMarginFirst}>
                  <TextField
                    label="Region"
                    fullWidth
                    className={classes.textbox}
                    InputProps={{
                      classes: {
                        input: classes.input,
                      },
                    }}
                    onChange={handleFormDataChange("region")}
                  />
                </div>
              </Grid>
              <Grid
                container
                item
                xs={4}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <div className={classes.radioMarginFirst}>
                  <TextField
                    label="City"
                    fullWidth
                    className={classes.textbox}
                    InputProps={{
                      classes: {
                        input: classes.input,
                      },
                    }}
                    onChange={handleFormDataChange("city")}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <div className={classes.radioMarginSecond}>
                <TextField
                  label="Company"
                  fullWidth
                  className={classes.textbox}
                  InputProps={{
                    classes: {
                      input: classes.input,
                    },
                  }}
                  onChange={handleFormDataChange("company")}
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <div className={classes.radioMarginSecond}>
                <TextField
                  label="Salary (optional)"
                  fullWidth
                  className={classes.textbox}
                  InputProps={{
                    classes: {
                      input: classes.input,
                    },
                  }}
                  onChange={handleFormDataChange("salary")}
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-end"
            justify="flex-end"
          >
            <Grid
              container
              item
              xs={6}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <div className={classes.radioButton}>
                <FormControlLabel
                  checked={jobsData.job_type === "REGULAR_JOB"}
                  value="REGULAR_JOB"
                  control={<Radio color="primary" />}
                  label="Regular Job"
                  onChange={handleFormDataChange("job_type")}
                />
              </div>
            </Grid>
            <Grid
              container
              item
              xs={6}
              spacing={0}
              alignItems="center"
              justify="center"
            >
              <div className={classes.radioButton}>
                <FormControlLabel
                  checked={jobsData.job_type === "BOARD_POSITION"}
                  value="BOARD_POSITION"
                  control={<Radio color="primary" />}
                  label="Board Position"
                  onChange={handleFormDataChange("job_type")}
                />
              </div>
            </Grid>
          </Grid>
          {/*<Grid
            container
            item
            xs={12}
            sm={6}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <div className={classes.radioMarginFirst}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  fullWidth
                  options={IndustryTags.map((option) => option.name)}
                  defaultValue={[]}
                  freeSolo
                  onChange={onTagsChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Tags (Up to 3)"
                      error={showError}
                      helperText={errorText}
                      className={classes.textbox}
                    />
                  )}
                />
              </div>
            </Grid>
          </Grid>*/}
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <p className={classes.title}>Job Description</p>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                InputProps={{
                  maxLength: 2000,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                value={jobsData.description}
                helperText={`${jobsData.description.length}/${maxCharacters} Characters`}
                className={classes.textField}
                onChange={handleFormDataChange("description")}
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <Grid
              container
              item
              xs={12}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <p className={classes.title}>Job Requirement</p>
              <TextField
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                InputProps={{
                  maxLength: maxCharacters,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                value={jobsData.requirement}
                helperText={`${jobsData.requirements.length}/${maxCharacters} Characters`}
                className={classes.textField}
                onChange={handleFormDataChange("requirements")}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          spacing={1}
          alignItems="flex-start"
          justify="flex-start"
        >
          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="flex-start"
            justify="flex-start"
          >
            <div className={classes.contactBox}>
              <FormControlLabel
                className={classes.checkboxGrid}
                control={
                  <Checkbox
                    checked={checkedBox}
                    onChange={handleFormDataChange("contact_me")}
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
        <Button
          className={classes.button1}
          variant="contained"
          onClick={submitJob}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostJobPopup;
