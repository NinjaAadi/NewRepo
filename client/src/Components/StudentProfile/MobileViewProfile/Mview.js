import React, { useEffect } from "react";
import classes from "./mview.module.css";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";



export default function MobileView(props) {

  let container = null;
  if (true) {
    // console.log(props.studentProfile);
    container = (
      <div>
        <Grid>
          <Grid className={classes.color}>
            <h2>
              <strong>Personal Information</strong>
            </h2>
          </Grid>
          <Grid>
            <div style={{ width: "100%", padding: "2% 0" }}>
              <Avatar
                alt="Abhishek Gaurav"
                src="/static/images/avatar/1.jpg"
                style={{
                  fontSize: "52px",
                  margin: "auto",
                  padding: "5%",
                }}
              />
            </div>
          </Grid>
          <Grid style={{ width: "100%" }}>
            <div>
              <div className={classes.textStyle}>
                <TextField
                  id="outlined-size-small"
                  label="Name"
                  variant="outlined"
                  style={{ width: "80%" }}
                  value={props.studentProfile.data.personal_info.name.value}
                  disabled={
                    props.studentProfile.data.personal_info.name.disable
                  }
                />
              </div>
              <div className={classes.textStyle}>
                <TextField
                  id="outlined-size-small"
                  label="Father's Name"
                  variant="outlined"
                  style={{ width: "80%", marginTop: "2%" }}
                  value={
                    props.studentProfile.data.personal_info.father_name.value
                  }
                  disabled={
                    props.studentProfile.data.personal_info.father_name.disable
                  }
                />
              </div>
              <div className={classes.textStyle}>
                <TextField
                  id="outlined-size-small"
                  label="Mother's Name"
                  variant="outlined"
                  style={{ width: "80%", marginTop: "2%" }}
                  value={
                    props.studentProfile.data.personal_info.mother_name.value
                  }
                  disabled={
                    props.studentProfile.data.personal_info.mother_name.disable
                  }
                />
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <Grid>
                    <div className={classes.textStyleRight}>
                      <TextField
                        id="outlined-size-small"
                        label="Date of Birth"
                        variant="outlined"
                        style={{
                          width: "80%",
                          marginTop: "2%",
                        }}
                        value={
                          props.studentProfile.data.personal_info.dob.value
                        }
                        disabled={
                          props.studentProfile.data.personal_info.dob.disable
                        }
                      />
                    </div>

                    <div className={classes.textStyleRight}>
                      <TextField
                        id="outlined-size-small"
                        label="Gender"
                        variant="outlined"
                        style={{
                          width: "80%",
                          marginTop: "2%",
                        }}
                        value={
                          props.studentProfile.data.personal_info.gender.value
                        }
                        disabled={
                          props.studentProfile.data.personal_info.gender.disable
                        }
                      />
                    </div>
                  </Grid>
                </div>

                <div style={{ width: "50%" }}>
                  <div className={classes.textStyleLeft}>
                    <TextField
                      id="outlined-size-small"
                      label="Marital Status"
                      variant="outlined"
                      style={{
                        width: "80%",
                        marginTop: "2%",
                      }}
                      value={
                        props.studentProfile.data.personal_info.marital_status
                          .value
                      }
                      disabled={
                        props.studentProfile.data.personal_info.marital_status
                          .disable
                      }
                    />
                  </div>
                  <div className={classes.textStyleLeft}>
                    <TextField
                      id="outlined-size-small"
                      label="Roll No."
                      variant="outlined"
                      style={{
                        width: "80%",
                        marginTop: "2%",
                      }}
                      value={props.studentProfile.data.personal_info.roll.value}
                      disabled={
                        props.studentProfile.data.personal_info.roll.disable
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <hr style={{ borderColor: "black" }}></hr>
      </div>
    );
  }

  return <div>{container}</div>;
}
