import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import classes from "./StudentProfile.module.css";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const cookies = new Cookies();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function StudentProfile() {
  //For '+' Icon in work experience
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
      // Inject before JSS
      document.querySelector("#font-awesome-css") || document.head.firstChild
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const [value, setValue] = React.useState(0);

  const [studentProfile, setStudentProfile] = React.useState(null);

  const [isEdit, setEdit] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [successful, setSuccessful] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeStudentProfile = (key, value) => {
    console.log(studentProfile);
    let changedStudentProfile = { ...studentProfile };
    changedStudentProfile[key[0]][key[1]][key[2]][key[3]] = value;
    setStudentProfile(changedStudentProfile);
    setEdit(true);
  };

  const changeSocialMedia = (key, value) => {
    let changedStudentProfile = { ...studentProfile };
    changedStudentProfile[key[0]][key[1]][key[2]][key[3]][key[4]] = value;
    setEdit(true);
    setStudentProfile(changedStudentProfile);
  };

  const changeWorkExperience = (key, value) => {
    let changedStudentProfile = { ...studentProfile };
    changedStudentProfile[key[0]][key[1]][key[2]][key[3]][key[4]] = value;
    setEdit(true);
    setStudentProfile(changedStudentProfile);
  };

  const addWorkExperience = (key) => {
    let changedStudentProfile = { ...studentProfile };
    let newWorkExperience = {
      name_organisation: { value: null, disable: false },
      from_period: { value: null, disable: false },
      role: { value: null, disable: false },
      to_period: { value: null, disable: false },
    };
    // changedStudentProfile[[key[0]][key[1]]["2"]] = newWorkExperience;
    // setStudentProfile(changedStudentProfile);
    changedStudentProfile.data.work_experience.push(newWorkExperience);
    setStudentProfile(changedStudentProfile);
    updateStudentProfile();
  };

  const updateStudentProfile = () => {
    setLoading(true);
    console.log(studentProfile.data);
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const student_id = profile.student_id;
    axios.put("http://localhost:5002/student_master/update/" + student_id, {
      student_desc: JSON.stringify(studentProfile.data),
    });
    setLoading(false);
    setEdit(false);
    setSuccessful(true);
    setTimeout(() => {
      setSuccessful(false);
    }, 2000);
    // axios
    //   .get("/updateInfo", {
    //     params: {
    //       rollno: cookies.get("userData").person_id,
    //       user_type: cookies.get("userData").user_type,
    //       student_desc: studentProfile.data,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //
    //   })
    //   .catch((e) => console.log(e));
  };

  useEffect(() => {
    const userProfile = localStorage.getItem("userProfile");
    const _userProfile = JSON.parse(userProfile);
    const userProfileData = JSON.parse(_userProfile.student_desc);
    console.log(userProfileData);
    setStudentProfile({ data: userProfileData });
  }, []);

  let container = null;
  if (loading) {
    container = (
      <div style={{ height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  } else if (studentProfile) {
    let rows = [];

    function createData(
      name_organisation_value,
      name_organisation_disable,
      role_value,
      role_disable,
      from_period_value,
      from_period_disable,
      to_period_value,
      to_period_disable
    ) {
      return {
        name_organisation_value,
        name_organisation_disable,
        role_value,
        role_disable,
        from_period_value,
        from_period_disable,
        to_period_value,
        to_period_disable,
      };
    }

    for (let i = 0; i < studentProfile.data.work_experience.length; i++) {
      rows.push(
        createData(
          studentProfile.data.work_experience[i].name_organisation.value,
          studentProfile.data.work_experience[i].name_organisation.disbale,
          studentProfile.data.work_experience[i].role.value,
          studentProfile.data.work_experience[i].role.disable,
          studentProfile.data.work_experience[i].from_period.value,
          studentProfile.data.work_experience[i].from_period.disable,
          studentProfile.data.work_experience[i].to_period.value,
          studentProfile.data.work_experience[i].to_period.disable
        )
      );
    }

    container = (
      <div className={classes.he}>
        <div style={{ padding: 20 }}>
          <div className={classes.personal}>
            <div className={classes.green}>
              <h3>Personal Information</h3>
            </div>
            <div style={{ display: "flex", border: "2px solid #0070c0" }}>
              <div>
                <Avatar
                  alt="Abhishek Gaurav"
                  src="/static/images/avatar/1.jpg"
                  style={{ fontSize: 52, width: 150, height: 150, margin: 20 }}
                />
              </div>
              <div style={{ width: "85%" }}>
                <div className={classes.textStyle}>
                  <TextField
                    id="outlined-size-small"
                    label="Name"
                    variant="outlined"
                    style={{ width: "95%" }}
                    value={studentProfile.data.personal_info.name.value}
                    disabled={studentProfile.data.personal_info.name.disable}
                  />
                </div>
                <div className={classes.textStyle}>
                  <TextField
                    id="outlined-size-small"
                    label="Father's Name"
                    variant="outlined"
                    style={{ width: "95%" }}
                    value={studentProfile.data.personal_info.father_name.value}
                    disabled={
                      studentProfile.data.personal_info.father_name.disable
                    }
                  />
                </div>
                <div className={classes.textStyle}>
                  <TextField
                    id="outlined-size-small"
                    label="Mother's Name"
                    variant="outlined"
                    style={{ width: "95%" }}
                    value={studentProfile.data.personal_info.mother_name.value}
                    disabled={
                      studentProfile.data.personal_info.mother_name.disable
                    }
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className={classes.textStyleLeft}>
                      <TextField
                        id="outlined-size-small"
                        label="Date Of Birth"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={studentProfile.data.personal_info.dob.value}
                        disabled={studentProfile.data.personal_info.dob.disable}
                      />
                    </div>
                    <div className={classes.textStyleLeft}>
                      <TextField
                        id="outlined-size-small"
                        label="Gender"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={studentProfile.data.personal_info.gender.value}
                        disabled={
                          studentProfile.data.personal_info.gender.disable
                        }
                      />
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div className={classes.textStyleRight}>
                      <TextField
                        id="outlined-size-small"
                        label="Marital Status"
                        variant="outlined"
                        style={{ width: "90%" }}
                        value={
                          studentProfile.data.personal_info.marital_status.value
                        }
                        disabled={
                          studentProfile.data.personal_info.marital_status
                            .disable
                        }
                      />
                    </div>
                    <div className={classes.textStyleRight}>
                      <TextField
                        id="outlined-size-small"
                        label="Roll No."
                        variant="outlined"
                        style={{ width: "90%" }}
                        value={studentProfile.data.personal_info.roll.value}
                        disabled={
                          studentProfile.data.personal_info.roll.disable
                        }
                      />
                    </div>
                  </div>
                </div>
                <div style={{ width: "48%", marginBottom: "2%" }}>
                  <div className={classes.textStyle}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        label="Category"
                        value={studentProfile.data.personal_info.category.value}
                        disabled={
                          studentProfile.data.personal_info.category.disable
                        }
                        style={{ textAlign: "left" }}
                      >
                        <MenuItem value={"GEN"}>GEN</MenuItem>
                        <MenuItem value={"OBC"}>OBC</MenuItem>
                        <MenuItem value={"SC"}>SC</MenuItem>
                        <MenuItem value={"ST"}>ST</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  className={classes.personal1}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    className={classes.tab1}
                    label="Admission Info"
                    {...a11yProps(0)}
                    style={{
                      margin: "5px",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                  <Tab
                    className={classes.tab1}
                    label="Contact Info"
                    {...a11yProps(1)}
                    style={{
                      margin: "5px",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                  <Tab
                    className={classes.tab1}
                    label="Educational Details"
                    {...a11yProps(2)}
                    style={{
                      margin: "5px",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                  <Tab
                    className={classes.tab1}
                    label="Qualifying Exam Details"
                    {...a11yProps(3)}
                    style={{
                      margin: "5px",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                  <Tab
                    className={classes.tab1}
                    label="Work Experience"
                    {...a11yProps(4)}
                    style={{
                      margin: "5px",
                      borderTopLeftRadius: 30,
                      borderTopRightRadius: 30,
                    }}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} id="contact">
                <div className={classes.si}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.admission_info.dept.value}
                          disabled={
                            studentProfile.data.admission_info.dept.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.admission_info.course.value
                          }
                          disabled={
                            studentProfile.data.admission_info.course.disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Program"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.admission_info.program.value
                          }
                          disabled={
                            studentProfile.data.admission_info.program.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Academic Session"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.admission_info.academic_session
                              .value
                          }
                          disabled={
                            studentProfile.data.admission_info.academic_session
                              .disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} id="contact">
                <div className={classes.si}>
                  <div className={classes.textAddressInput}>
                    <TextField
                      id="outlined-size-small"
                      label="Address"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={studentProfile.data.contact_info.address.value}
                      disabled={
                        studentProfile.data.contact_info.address.disable
                      }
                      onChange={(event) => {
                        changeStudentProfile(
                          ["data", "contact_info", "address", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Country"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.contact_info.country.value}
                          disabled={
                            studentProfile.data.contact_info.country.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "country", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="City"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.contact_info.city.value}
                          disabled={
                            studentProfile.data.contact_info.city.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "city", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Mobile No."
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.contact_info.mobile.value}
                          disabled={
                            studentProfile.data.contact_info.mobile.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "mobile", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Institute Email Id"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.institute_email_id
                              .value
                          }
                          disabled={
                            studentProfile.data.contact_info.institute_email_id
                              .disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Alternate Email-Id"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.alt_email_id.value
                          }
                          disabled={
                            studentProfile.data.contact_info.alt_email_id
                              .disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "email_id", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Facebook"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.social_media.fb
                              .value
                          }
                          disabled={
                            studentProfile.data.contact_info.social_media.fb
                              .disable
                          }
                          onChange={(event) => {
                            changeSocialMedia(
                              [
                                "data",
                                "contact_info",
                                "social_media",
                                "fb",
                                "value",
                              ],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Twitter"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.social_media
                              .twitter.value
                          }
                          disabled={
                            studentProfile.data.contact_info.social_media
                              .twitter.disable
                          }
                          onChange={(event) => {
                            changeSocialMedia(
                              [
                                "data",
                                "contact_info",
                                "social_media",
                                "twitter",
                                "value",
                              ],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="State"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.contact_info.state.value}
                          disabled={
                            studentProfile.data.contact_info.state.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "state", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Pin Code"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.contact_info.pin.value}
                          disabled={
                            studentProfile.data.contact_info.pin.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "pin", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Alternate Mobile No."
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.alt_mobile.value
                          }
                          disabled={
                            studentProfile.data.contact_info.alt_mobile.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "alt_mobile", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Email Id"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.email_id.value
                          }
                          disabled={
                            studentProfile.data.contact_info.email_id.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              ["data", "contact_info", "email_id", "value"],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Linkedin"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.social_media
                              .linkedin.value
                          }
                          disabled={
                            studentProfile.data.contact_info.social_media
                              .linkedin.disable
                          }
                          onChange={(event) => {
                            changeStudentProfile(
                              [
                                "data",
                                "contact_info",
                                "social_media",
                                "linkedin",
                                "value",
                              ],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Instagram"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.contact_info.social_media.insta
                              .value
                          }
                          disabled={
                            studentProfile.data.contact_info.social_media.insta
                              .disable
                          }
                          onChange={(event) => {
                            changeSocialMedia(
                              [
                                "data",
                                "contact_info",
                                "social_media",
                                "insta",
                                "value",
                              ],
                              event.target.value
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={2} id="contact">
                <p>Secondary</p>
                <div className={classes.si}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="School Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail.secondary
                              .school.value
                          }
                          disabled={
                            studentProfile.data.educational_detail.secondary
                              .school.disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Board"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail.secondary
                              .board.value
                          }
                          disabled={
                            studentProfile.data.educational_detail.secondary
                              .board.disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.si}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Subjects"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail.secondary
                              .subject.value
                          }
                          disabled={
                            studentProfile.data.educational_detail.secondary
                              .subject.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail.secondary
                              .marks_obt.value
                          }
                          disabled={
                            studentProfile.data.educational_detail.secondary
                              .marks_obt.disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Month & Year of Passing"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail.secondary
                              .passing.value
                          }
                          disabled={
                            studentProfile.data.educational_detail.secondary
                              .passing.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail.secondary
                              .tot_marks.value
                          }
                          disabled={
                            studentProfile.data.educational_detail.secondary
                              .tot_marks.disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.si}>
                  <p>Senior-Secondary/Diploma</p>
                  <div className={classes.si}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="School Name"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .senior_secondary_diploma.school.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .senior_secondary_diploma.school.disable
                            }
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="Board"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .senior_secondary_diploma.board.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .senior_secondary_diploma.board.disable
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Subjects"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.subject.value
                          }
                          disabled={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.subject.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.marks_obt.value
                          }
                          disabled={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.marks_obt.disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Month & Year of Passing"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.passing.value
                          }
                          disabled={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.passing.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.tot_marks.value
                          }
                          disabled={
                            studentProfile.data.educational_detail
                              .senior_secondary_diploma.tot_marks.disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {Object.keys(studentProfile.data.educational_detail.graduation)
                  .length != 0 && (
                  <div className={classes.si}>
                    <p>Graduation</p>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="Program"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .program.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .program.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="University"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .university.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .university.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Department"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .department.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .department.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Marks Obtained"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .marks_obt.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .marks_obt.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Month & Year Of Passing"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .month_year_passing.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .month_year_passing.disable
                            }
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="College Name"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .college.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .college.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Marking Type"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .marking_type.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .marking_type.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Course"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .course.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .course.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Total Marks"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.graduation
                                .tot_marks.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.graduation
                                .tot_marks.disable
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {Object.keys(
                  studentProfile.data.educational_detail.post_graduation
                ).length != 0 && (
                  <div className={classes.si}>
                    <p>Post Graduation</p>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="Program"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.program.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.program.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="University"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.university.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.university.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Department"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.department.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.department.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Marks Obtained"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.marks_obt.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.marks_obt.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Month & Year Of Passing"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.month_year_passing.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.month_year_passing.disable
                            }
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="College Name"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.college.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.college.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Marking Type"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.marking_type.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.marking_type.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Course"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.course.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.course.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Total Marks"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail
                                .post_graduation.tot_marks.value
                            }
                            disabled={
                              studentProfile.data.educational_detail
                                .post_graduation.tot_marks.disable
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {Object.keys(studentProfile.data.educational_detail.phd)
                  .length != 0 && (
                  <div className={classes.si}>
                    <p>Doctrate</p>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="University"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd
                                .university.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd
                                .university.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Department"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd
                                .department.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd
                                .department.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Course"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd.course
                                .value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd.course
                                .disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Marks Obtained"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd
                                .marks_obt.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd
                                .marks_obt.disable
                            }
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="College Name"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd.college
                                .value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd.college
                                .disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Marking Type"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd
                                .marking_type.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd
                                .marking_type.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Month & Year Of Passing"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd
                                .month_year_passing.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd
                                .month_year_passing.disable
                            }
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Total Marks"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentProfile.data.educational_detail.phd
                                .tot_marks.value
                            }
                            disabled={
                              studentProfile.data.educational_detail.phd
                                .tot_marks.disable
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabPanel>
              <TabPanel value={value} index={3} id="contact">
                <div className={classes.si}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Exam Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.qualifying_exam.exam_name.value
                          }
                          disabled={
                            studentProfile.data.qualifying_exam.exam_name
                              .disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Score"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.qualifying_exam.score.value
                          }
                          disabled={
                            studentProfile.data.qualifying_exam.score.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Valid Upto"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.qualifying_exam.valid_upto.value
                          }
                          disabled={
                            studentProfile.data.qualifying_exam.valid_upto
                              .disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="Month & Year Of Passing"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.qualifying_exam
                              .month_year_passing.value
                          }
                          disabled={
                            studentProfile.data.qualifying_exam
                              .month_year_passing.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="All India Rank"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentProfile.data.qualifying_exam.air.value}
                          disabled={
                            studentProfile.data.qualifying_exam.air.disable
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Qualified"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentProfile.data.qualifying_exam.is_qualified
                              .value
                              ? "Yes"
                              : "No"
                          }
                          disabled={
                            studentProfile.data.qualifying_exam.is_qualified
                              .disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4} id="contact">
                {rows.map((row, index) => (
                  <div className={classes.si}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="Name of Organisation"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={row.name_organisation_value}
                            disabled={row.name_organisation_disable}
                            onChange={(event) => {
                              changeWorkExperience(
                                [
                                  "data",
                                  "work_experience",
                                  index,
                                  "name_organisation",
                                  "value",
                                ],
                                event.target.value
                              );
                            }}
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="From"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={row.from_period_value}
                            disabled={row.from_period_disable}
                            onChange={(event) => {
                              changeWorkExperience(
                                [
                                  "data",
                                  "work_experience",
                                  index,
                                  "from_period",
                                  "value",
                                ],
                                event.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div className={classes.textInput}>
                          <TextField
                            id="outlined-size-small"
                            label="Role"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={row.role_value}
                            disabled={row.role_disable}
                            onChange={(event) => {
                              changeWorkExperience(
                                [
                                  "data",
                                  "work_experience",
                                  index,
                                  "role",
                                  "value",
                                ],
                                event.target.value
                              );
                            }}
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="To"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={row.to_period_value}
                            disabled={row.to_period_disable}
                            onChange={(event) => {
                              changeWorkExperience(
                                [
                                  "data",
                                  "work_experience",
                                  index,
                                  "to_period",
                                  "value",
                                ],
                                event.target.value
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <Icon
                      baseClassName="fas"
                      className="fa-plus-circle"
                      sx={{ fontSize: 30 }}
                      onClick={() => {
                        console.log("hello");
                      }}
                    /> */}
                    <hr />
                  </div>
                ))}
                <Icon
                  baseClassName="fas"
                  className="fa-plus-circle"
                  sx={{ fontSize: 30 }}
                  onClick={() => {
                    console.log("hello");
                    addWorkExperience(["data", "work_experience"]);
                  }}
                />
              </TabPanel>
            </Box>
            {successful ? (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Updated Successfully — <strong>check it out!</strong>
              </Alert>
            ) : null}
            <Button
              variant="contained"
              disabled={!isEdit}
              onClick={() => updateStudentProfile()}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // else{
  //   container = (
  //     // include spinner tag
  //     //material ui: spinner tag
  //   );
  // }

  return <div>{container}</div>;
}
