import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import classes from "./UserData.module.css";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
const jsonData = require("../countriesStatesCities.json");

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

export default function UserData() {
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

  const [loading, setLoading] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);

  const [value, setValue] = React.useState(0);

  //handleChange for accordian
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [studentData, setStudentData] = React.useState({
    personal_info: {
      name: {
        value: "",
        disable: true,
      },
      father_name: {
        value: "",
        disable: true,
      },
      mother_name: {
        value: "",
        disable: true,
      },
      dob: {
        value: null,
        disable: true,
      },
      gender: {
        value: "",
        disable: true,
      },
      category: {
        value: "",
        disable: true,
      },
      marital_status: {
        value: "",
        disable: true,
      },
      roll: {
        value: "",
        disable: true,
      },
    },
    admission_info: {
      dept: {
        value: "",
        disable: true,
      },
      program: {
        value: "",
        disable: true,
      },
      course: {
        value: "",
        disable: true,
      },
      academic_session: {
        value: "",
        disable: true,
      },
    },
    contact_info: {
      address: {
        value: "",
        disable: true,
      },
      city: {
        value: "",
        disable: true,
      },
      country: {
        value: "",
        disable: true,
      },
      state: {
        value: "",
        disable: true,
      },
      pin: {
        value: "",
        disable: true,
      },
      mobile: {
        value: "",
        disable: false,
      },
      alt_mobile: {
        value: "",
        disable: false,
      },
      email_id: {
        value: "",
        disable: false,
      },
      alt_email_id: {
        value: "",
        disable: false,
      },
      institute_email_id: {
        value: "",
        disable: true,
      },
      social_media: {
        fb: {
          value: "",
          disable: false,
        },
        insta: {
          value: "",
          disable: false,
        },
        twitter: {
          value: "",
          disable: false,
        },
        linkedin: {
          value: "",
          disable: false,
        },
      },
    },
    educational_detail: {
      secondary: {
        school: {
          value: "",
          disable: true,
        },
        board: {
          value: "",
          disable: true,
        },
        subject: {
          value: "",
          disable: true,
        },
        marks_obt: {
          value: "",
          disable: true,
        },
        tot_marks: {
          value: "",
          disable: true,
        },
        passing: {
          value: null,
          disable: true,
        },
      },
      senior_secondary_diploma: {
        school: {
          value: "",
          disable: true,
        },
        board: {
          value: "",
          disable: true,
        },
        subject: {
          value: "",
          disable: true,
        },
        marks_obt: {
          value: "",
          disable: true,
        },
        tot_marks: {
          value: "",
          disable: true,
        },
        passing: {
          value: null,
          disable: true,
        },
      },
      graduation: {
        program: {
          value: "",
          disable: true,
        },
        college: {
          value: "",
          disable: true,
        },
        university: {
          value: "",
          disable: true,
        },
        marking_type: {
          value: "",
          disable: true,
        },
        department: {
          value: "",
          disable: true,
        },
        course: {
          value: "",
          disable: true,
        },
        marks_obt: {
          value: "",
          disable: true,
        },
        tot_marks: {
          value: "",
          disable: true,
        },
        month_year_passing: {
          value: null,
          disable: true,
        },
      },
      post_graduation: {
        program: {
          value: "",
          disable: true,
        },
        college: {
          value: "",
          disable: true,
        },
        university: {
          value: "",
          disable: true,
        },
        marking_type: {
          value: "",
          disable: true,
        },
        department: {
          value: "",
          disable: true,
        },
        course: {
          value: "",
          disable: true,
        },
        marks_obt: {
          value: "",
          disable: true,
        },
        tot_marks: {
          value: "",
          disable: true,
        },
        month_year_passing: {
          value: null,
          disable: true,
        },
      },
      phd: {
        program: {
          value: "",
          disable: true,
        },
        college: {
          value: "",
          disable: true,
        },
        university: {
          value: "",
          disable: true,
        },
        marking_type: {
          value: "",
          disable: true,
        },
        department: {
          value: "",
          disable: true,
        },
        course: {
          value: "",
          disable: true,
        },
        marks_obt: {
          value: "",
          disable: true,
        },
        tot_marks: {
          value: "",
          disable: true,
        },
        month_year_passing: {
          value: null,
          disable: true,
        },
      },
    },
    qualifying_exam: {
      exam_name: {
        value: "",
        disable: true,
      },
      month_year_passing: {
        value: null,
        disable: true,
      },
      score: {
        value: "",
        disable: true,
      },
      air: {
        value: "",
        disable: true,
      },
      valid_upto: {
        value: null,
        disable: true,
      },
      is_qualified: {
        value: "",
        disable: true,
      },
    },
    work_experience: [
      {
        name_organisation: {
          value: "",
          disable: false,
        },
        role: {
          value: "",
          disable: false,
        },
        from_period: {
          value: null,
          disable: false,
        },
        to_period: {
          value: null,
          disable: false,
        },
      },
    ],
  });

  const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedState, setSelectedState] = React.useState();
  const [selectedCity, setSelectedCity] = React.useState();

  const availableState = jsonData.countries.find(
    (c) => c.name === studentData.contact_info.country.value
  );

  const availableCities = availableState?.states?.find(
    (s) => s.name === studentData.contact_info.state.value
  );

  const handleChangeProfile = (key, value) => {
    console.log(studentData);
    let temp = { ...studentData };
    temp[key[0]][key[1]][key[2]] = value;
    setStudentData(temp);
  };

  const handleChangeProfile1 = (key, value) => {
    console.log(studentData);
    let temp = { ...studentData };
    temp[key[0]][key[1]][key[2]][key[3]] = value;
    setStudentData(temp);
  };

  const handleWorkExperience = (key, value) => {
    let changedStudentData = { ...studentData };
    changedStudentData[key[0]][key[1]][key[2]][key[3]] = value;
    // setEdit(true);
    setStudentData(changedStudentData);
  };

  const addWorkExperience = (key) => {
    console.log(studentData);
    let changedStudentData = { ...studentData };
    let newWorkExperience = {
      name_organisation: { value: "", disable: false },
      from_period: { value: null, disable: false },
      role: { value: "", disable: false },
      to_period: { value: null, disable: false },
    };
    changedStudentData.work_experience.push(newWorkExperience);
    setStudentData(changedStudentData);
    // updateStudentProfile();
  };

  function checkSaveCondition() {
    if(studentData.personal_info.name.value &&
      studentData.personal_info.father_name.value &&
      studentData.personal_info.mother_name.value &&
      studentData.personal_info.dob.value &&
      studentData.personal_info.gender.value &&
      studentData.personal_info.category.value &&
      studentData.personal_info.marital_status.value &&
      studentData.personal_info.roll.value) return false;
      return true;
  }

  const saveStudentData = () => {
    console.log("Save Button Clicked");
    setLoading(true);
    console.log(studentData);
    axios
      .post("/studentRegistration", {
        person_id: cookies.get("userData").person_id,
        studentData: studentData,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        // setEdit(false);
        // setSuccessful(true);
        // setTimeout(() => {
        //   setSuccessful(false);
        // }, 2000);
      })
      .catch((e) => console.log(e));
  };
  let container = null;
  container = (
    <div className={classes.upper}>
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
                  style={{
                    fontSize: 52,
                    width: 150,
                    height: 150,
                    margin: 20,
                  }}
                />
              </div>
              <div style={{ width: "85%" }}>
                <div className={classes.textStyle} style={{ display: "flex" }}>
                  <TextField
                    id="outlined-size-small"
                    label="Name"
                    variant="outlined"
                    value={studentData.personal_info.name.value}
                    onChange={(event) =>
                      handleChangeProfile(
                        ["personal_info", "name", "value"],
                        event.target.value
                      )
                    }
                    style={{ width: "93%" }}
                  />
                  <Checkbox
                    checked={studentData.personal_info.name.disable}
                    onChange={(event) =>
                      handleChangeProfile(
                        ["personal_info", "name", "disable"],
                        event.target.checked
                      )
                    }
                  />
                </div>
                <div className={classes.textStyle} style={{ display: "flex" }}>
                  <TextField
                    id="outlined-size-small"
                    label="Father's Name"
                    variant="outlined"
                    style={{ width: "93%" }}
                    value={studentData.personal_info.father_name.value}
                    onChange={(event) =>
                      handleChangeProfile(
                        ["personal_info", "father_name", "value"],
                        event.target.value
                      )
                    }
                  />
                  <Checkbox
                    checked={studentData.personal_info.father_name.disable}
                    onChange={(event) =>
                      handleChangeProfile(
                        ["personal_info", "father_name", "disable"],
                        event.target.checked
                      )
                    }
                  />
                </div>
                <div className={classes.textStyle} style={{ display: "flex" }}>
                  <TextField
                    id="outlined-size-small"
                    label="Mother's Name"
                    variant="outlined"
                    style={{ width: "93%" }}
                    value={studentData.personal_info.mother_name.value}
                    onChange={(event) =>
                      handleChangeProfile(
                        ["personal_info", "mother_name", "value"],
                        event.target.value
                      )
                    }
                  />
                  <Checkbox
                    checked={studentData.personal_info.mother_name.disable}
                    onChange={(event) =>
                      handleChangeProfile(
                        ["personal_info", "mother_name", "disable"],
                        event.target.checked
                      )
                    }
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className={classes.textStyleLeft}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Date of Birth"
                          // value={dob}
                          // minDate={new Date('1969-03-01')}
                          // maxDate={new Date('2023-06-01')}
                          value={studentData.personal_info.dob.value}
                          inputFormat="dd/MM/yyyy"
                          onChange={(newValue) => {
                            handleChangeProfile(
                              ["personal_info", "dob", "value"],
                              newValue
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} style={{ width: "86%" }} />
                          )}
                        />
                      </LocalizationProvider>
                      <Checkbox
                        checked={studentData.personal_info.dob.disable}
                        onChange={(event) =>
                          handleChangeProfile(
                            ["personal_info", "dob", "disable"],
                            event.target.checked
                          )
                        }
                      />
                    </div>
                    <div className={classes.textStyleLeft}>
                      <FormControl sx={{ width: "86%" }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          autoWidth
                          label="Gender"
                          value={studentData.personal_info.gender.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["personal_info", "gender", "value"],
                              event.target.value
                            )
                          }
                          style={{ textAlign: "left" }}
                        >
                          <MenuItem value={"Male"}>Male</MenuItem>
                          <MenuItem value={"Female"}>Female</MenuItem>
                          <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                      <Checkbox
                        checked={studentData.personal_info.gender.disable}
                        onChange={(event) =>
                          handleChangeProfile(
                            ["personal_info", "gender", "disable"],
                            event.target.checked
                          )
                        }
                      />
                    </div>
                    <div className={classes.textStyleLeft}>
                      <FormControl sx={{ width: "86%" }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          autoWidth
                          label="Category"
                          value={studentData.personal_info.category.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["personal_info", "category", "value"],
                              event.target.value
                            )
                          }
                          style={{ textAlign: "left" }}
                        >
                          <MenuItem value={"GEN"}>GEN</MenuItem>
                          <MenuItem value={"OBC"}>OBC</MenuItem>
                          <MenuItem value={"SC"}>SC</MenuItem>
                          <MenuItem value={"ST"}>ST</MenuItem>
                        </Select>
                      </FormControl>
                      <Checkbox
                        checked={studentData.personal_info.category.disable}
                        onChange={(event) =>
                          handleChangeProfile(
                            ["personal_info", "category", "disable"],
                            event.target.checked
                          )
                        }
                      />
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div
                      className={classes.textStyleRight}
                      style={{ display: "flex" }}
                    >
                      <FormControl sx={{ width: "86%" }}>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Marital Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={studentData.personal_info.marital_status.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["personal_info", "marital_status", "value"],
                              event.target.value
                            )
                          }
                          autoWidth
                          label="Marital Status"
                          style={{ textAlign: "left" }}
                        >
                          <MenuItem value={"Married"}>Married</MenuItem>
                          <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                          <MenuItem value={"Divorcee"}>Divorcee</MenuItem>
                        </Select>
                      </FormControl>
                      <Checkbox
                        checked={
                          studentData.personal_info.marital_status.disable
                        }
                        onChange={(event) =>
                          handleChangeProfile(
                            ["personal_info", "marital_status", "disable"],
                            event.target.checked
                          )
                        }
                      />
                    </div>
                    <div
                      className={classes.textStyleRight}
                      style={{ display: "flex" }}
                    >
                      <TextField
                        id="outlined-size-small"
                        label="Roll No."
                        variant="outlined"
                        style={{ width: "86%" }}
                        value={studentData.personal_info.roll.value}
                        onChange={(event) =>
                          handleChangeProfile(
                            ["personal_info", "roll", "value"],
                            event.target.value
                          )
                        }
                      />
                      <Checkbox
                        checked={studentData.personal_info.roll.disable}
                        onChange={(event) =>
                          handleChangeProfile(
                            ["personal_info", "roll", "disable"],
                            event.target.checked
                          )
                        }
                      />
                    </div>
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
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.admission_info.dept.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "dept", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.admission_info.dept.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "dept", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentData.admission_info.course.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "course", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.admission_info.course.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "course", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Program"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.admission_info.program.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "program", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.admission_info.program.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "program", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Academic Session"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.admission_info.academic_session.value
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "academic_session", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.admission_info.academic_session.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["admission_info", "academic_session", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} id="contact">
                <div className={classes.si}>
                  <div
                    className={classes.textAddressInput}
                    style={{ display: "flex" }}
                  >
                    <TextField
                      id="outlined-size-small"
                      label="Address"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={studentData.contact_info.address.value}
                      onChange={(event) =>
                        handleChangeProfile(
                          ["contact_info", "address", "value"],
                          event.target.value
                        )
                      }
                    />
                    <Checkbox
                      checked={studentData.contact_info.address.disable}
                      onChange={(event) =>
                        handleChangeProfile(
                          ["contact_info", "address", "disable"],
                          event.target.checked
                        )
                      }
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            autoWidth
                            label="Country"
                            value={studentData.contact_info.country.value}
                            onChange={(event) =>
                              handleChangeProfile(
                                ["contact_info", "country", "value"],
                                event.target.value
                              )
                            }
                            style={{ textAlign: "left" }}
                          >
                            <MenuItem>--Choose Country--</MenuItem>
                            {jsonData.countries.map((value, key) => {
                              return (
                                <MenuItem value={value.name} key={key}>
                                  {value.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <Checkbox
                          checked={studentData.contact_info.country.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "country", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            City
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            autoWidth
                            label="City"
                            value={studentData.contact_info.city.value}
                            onChange={(event) =>
                              handleChangeProfile(
                                ["contact_info", "city", "value"],
                                event.target.value
                              )
                            }
                            style={{ textAlign: "left" }}
                          >
                            <MenuItem>--Choose City--</MenuItem>
                            {availableCities?.cities.map((e, key) => {
                              return (
                                <MenuItem value={e.name} key={key}>
                                  {e.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <Checkbox
                          checked={studentData.contact_info.city.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "city", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Mobile No."
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.contact_info.mobile.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "mobile", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.contact_info.mobile.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "mobile", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Institute Email Id"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={
                            studentData.contact_info.institute_email_id.value
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "institute_email_id", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.contact_info.institute_email_id.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "institute_email_id", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Alternate Email-Id"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.contact_info.alt_email_id.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "alt_email_id", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.contact_info.alt_email_id.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "alt_email_id", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Facebook"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.contact_info.social_media.fb.value}
                          onChange={(event) =>
                            handleChangeProfile1(
                              ["contact_info", "social_media", "fb", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.contact_info.social_media.fb.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              ["contact_info", "social_media", "fb", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Twitter"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={
                            studentData.contact_info.social_media.twitter.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "contact_info",
                                "social_media",
                                "twitter",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.contact_info.social_media.twitter
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "contact_info",
                                "social_media",
                                "twitter",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            State
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            autoWidth
                            label="State"
                            value={studentData.contact_info.state.value}
                            onChange={(event) =>
                              handleChangeProfile(
                                ["contact_info", "state", "value"],
                                event.target.value
                              )
                            }
                            style={{ textAlign: "left" }}
                          >
                            <MenuItem>--Choose State--</MenuItem>
                            {availableState?.states.map((e, key) => {
                              return (
                                <MenuItem value={e.name} key={key}>
                                  {e.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <Checkbox
                          checked={studentData.contact_info.city.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "city", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Pin Code"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.contact_info.pin.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "pin", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.contact_info.pin.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "pin", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Alternate Mobile No."
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={studentData.contact_info.alt_mobile.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "alt_mobile", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.contact_info.alt_mobile.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "alt_mobile", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Email Id"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentData.contact_info.email_id.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "email_id", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.contact_info.email_id.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["contact_info", "email_id", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Linkedin"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={
                            studentData.contact_info.social_media.linkedin.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "contact_info",
                                "social_media",
                                "linkedin",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.contact_info.social_media.linkedin
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "contact_info",
                                "social_media",
                                "linkedin",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Instagram"
                          variant="outlined"
                          style={{ width: "97%" }}
                          value={
                            studentData.contact_info.social_media.insta.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "contact_info",
                                "social_media",
                                "insta",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.contact_info.social_media.insta.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "contact_info",
                                "social_media",
                                "insta",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
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
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="School Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.secondary.school
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "school",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.secondary.school
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "school",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Board"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.secondary.board.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "board",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.secondary.board
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "board",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.si}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Subjects"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.secondary.subject
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "subject",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.secondary.subject
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "subject",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.secondary.marks_obt
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "marks_obt",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.secondary.marks_obt
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "marks_obt",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Month & Year of Passing"
                            views={["year", "month"]}
                            // minDate={new Date('1970-03-01')}
                            // maxDate={new Date('2023-06-01')}
                            value={
                              studentData.educational_detail.secondary.passing
                                .value
                            }
                            onChange={(newValue) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "secondary",
                                  "passing",
                                  "value",
                                ],
                                newValue
                              )
                            }
                            // onChange={(newValue) => {
                            //   setValue(newValue);
                            // }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.educational_detail.secondary.passing
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "passing",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.secondary.tot_marks
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "tot_marks",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.secondary.tot_marks
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "secondary",
                                "tot_marks",
                                "disable",
                              ],
                              event.target.checked
                            )
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
                        <div
                          className={classes.textInput}
                          style={{ display: "flex" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="School Name"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentData.educational_detail.senior_secondary_diploma
                                .school.value
                            }
                            onChange={(event) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "senior_secondary_diploma",
                                  "school",
                                  "value",
                                ],
                                event.target.value
                              )
                            }
                          />
                          <Checkbox
                            checked={
                              studentData.educational_detail.senior_secondary_diploma
                                .school.disable
                            }
                            onChange={(event) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "senior_secondary_diploma",
                                  "school",
                                  "disable",
                                ],
                                event.target.checked
                              )
                            }
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          className={classes.textInput}
                          style={{ display: "flex" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Board"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={
                              studentData.educational_detail.senior_secondary_diploma
                                .board.value
                            }
                            onChange={(event) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "senior_secondary_diploma",
                                  "board",
                                  "value",
                                ],
                                event.target.value
                              )
                            }
                          />
                          <Checkbox
                            checked={
                              studentData.educational_detail.senior_secondary_diploma
                                .board.disable
                            }
                            onChange={(event) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "senior_secondary_diploma",
                                  "board",
                                  "disable",
                                ],
                                event.target.checked
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Subjects"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.senior_secondary_diploma
                              .subject.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "subject",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.senior_secondary_diploma
                              .board.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "board",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.senior_secondary_diploma
                              .marks_obt.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "marks_obt",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.senior_secondary_diploma
                              .marks_obt.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "marks_obt",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Month & Year of Passing"
                            views={["year", "month"]}
                            // minDate={new Date("1970-03-01")}
                            // maxDate={new Date("2023-06-01")}
                            // onChange={(newValue) => {
                            //   setValue(newValue);
                            // }}
                            value={
                              studentData.educational_detail.senior_secondary_diploma
                                .passing.value
                            }
                            onChange={(newValue) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "senior_secondary_diploma",
                                  "passing",
                                  "value",
                                ],
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.educational_detail.senior_secondary_diploma
                              .passing.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "passing",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.senior_secondary_diploma
                              .tot_marks.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "tot_marks",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.senior_secondary_diploma
                              .tot_marks.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "senior_secondary_diploma",
                                "tot_marks",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.si}>
                  <p>Graduation</p>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Program"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.program
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "program",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.program
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "program",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="University"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.university
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "university",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.university
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "university",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.department
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "department",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.department
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "department",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.marks_obt
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "marks_obt",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.marks_obt
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "marks_obt",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Month & Year of Passing"
                            views={["year", "month"]}
                            // minDate={new Date("1970-03-01")}
                            // maxDate={new Date("2023-06-01")}
                            value={
                              studentData.educational_detail.graduation
                                .month_year_passing.value
                            }
                            onChange={(newValue) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "graduation",
                                  "month_year_passing",
                                  "value",
                                ],
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation
                              .month_year_passing.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "month_year_passing",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="College Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.college
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "college",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.college
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "college",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marking Type"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation
                              .marking_type.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "marking_type",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation
                              .marking_type.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "marking_type",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.course
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "course",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.course
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "course",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.graduation.tot_marks
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "tot_marks",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.graduation.tot_marks
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "graduation",
                                "tot_marks",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.si}>
                  <p>Post Graduation</p>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Program"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .program.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "program",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .program.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "program",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="University"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .university.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "university",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .university.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "university",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .department.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "department",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .department.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "department",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .marks_obt.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "marks_obt",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .marks_obt.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "marks_obt",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Month & Year of Passing"
                            views={["year", "month"]}
                            value={
                              studentData.educational_detail.post_graduation
                                .month_year_passing.value
                            }
                            onChange={(newValue) =>
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "post_graduation",
                                  "month_year_passing",
                                  "value",
                                ],
                                newValue
                              )
                            }
                            // minDate={new Date("1970-03-01")}
                            // maxDate={new Date("2023-06-01")}
                            // onChange={(newValue) => {
                            //   setValue(newValue);
                            // }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .month_year_passing.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "month_year_passing",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="College Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .college.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "college",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .college.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "college",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marking Type"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .marking_type.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "marking_type",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .marking_type.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "marking_type",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .course.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "course",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .course.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "course",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.post_graduation
                              .tot_marks.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "tot_marks",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.post_graduation
                              .tot_marks.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "post_graduation",
                                "tot_marks",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={classes.si}>
                  <p>PHD/Doctrate</p>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="University"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.university.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "university",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.university
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "university",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.department.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "department",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.department
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "department",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.course.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              ["educational_detail", "phd", "course", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.course.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "course",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.marks_obt.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "marks_obt",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.marks_obt.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "maks_obt",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="College Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.college.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              ["educational_detail", "phd", "college", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.college.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "college",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Marking Type"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.marking_type
                              .value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "marking_type",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.marking_type
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "marking_type",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Month & Year Of Passing"
                            // value={dob}
                            // minDate={new Date('1969-03-01')}
                            // maxDate={new Date('2023-06-01')}
                            views={["year", "month"]}
                            value={
                              studentData.educational_detail.phd
                                .month_year_passing.value
                            }
                            onChange={(newValue) => {
                              handleChangeProfile1(
                                [
                                  "educational_detail",
                                  "phd",
                                  "month_year_passing",
                                  "value",
                                ],
                                newValue
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd
                              .month_year_passing.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "month_year_passing",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            studentData.educational_detail.phd.tot_marks.value
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "tot_marks",
                                "value",
                              ],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.educational_detail.phd.tot_marks
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile1(
                              [
                                "educational_detail",
                                "phd",
                                "tot_marks",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3} id="contact">
                <div className={classes.si}>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Exam Name"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentData.qualifying_exam.exam_name.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "exam_name", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={
                            studentData.qualifying_exam.exam_name.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "exam_name", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="Score"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentData.qualifying_exam.score.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "score", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.qualifying_exam.score.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "score", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Valid Upto"
                            views={["year", "month"]}
                            // minDate={new Date("1970-03-01")}
                            // maxDate={new Date("2023-06-01")}
                            value={studentData.qualifying_exam.valid_upto.value}
                            onChange={(newValue) =>
                              handleChangeProfile(
                                ["qualifying_exam", "valid_upto", "value"],
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.qualifying_exam.valid_upto.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "valid_upto", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className={classes.textInput}
                        style={{ display: "flex" }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label="Month & Year of Passing"
                            views={["year", "month"]}
                            // minDate={new Date("1970-03-01")}
                            // maxDate={new Date("2023-06-01")}
                            value={
                              studentData.qualifying_exam.month_year_passing
                                .value
                            }
                            onChange={(newValue) =>
                              handleChangeProfile(
                                [
                                  "qualifying_exam",
                                  "month_year_passing",
                                  "value",
                                ],
                                newValue
                              )
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        <Checkbox
                          checked={
                            studentData.qualifying_exam.month_year_passing
                              .disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              [
                                "qualifying_exam",
                                "month_year_passing",
                                "disable",
                              ],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        <TextField
                          id="outlined-size-small"
                          label="All India Rank"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={studentData.qualifying_exam.air.value}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "air", "value"],
                              event.target.value
                            )
                          }
                        />
                        <Checkbox
                          checked={studentData.qualifying_exam.air.disable}
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "air", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                      <div
                        className={classes.textInput}
                        style={{ marginTop: "4%", display: "flex" }}
                      >
                        {/* <TextField
                          id="outlined-size-small"
                          label="Qualified"
                          variant="outlined"
                          style={{ width: "100%" }}
                        /> */}
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Qualified
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={
                              studentData.qualifying_exam.is_qualified.value
                            }
                            onChange={(event) =>
                              handleChangeProfile(
                                ["qualifying_exam", "is_qualified", "value"],
                                event.target.value
                              )
                            }
                            autoWidth
                            label="Qualification Status"
                            style={{ textAlign: "left" }}
                          >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                          </Select>
                        </FormControl>
                        <Checkbox
                          checked={
                            studentData.qualifying_exam.is_qualified.disable
                          }
                          onChange={(event) =>
                            handleChangeProfile(
                              ["qualifying_exam", "is_qualified", "disable"],
                              event.target.checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={4} id="contact">
                {studentData.work_experience.map((row, index) => (
                  <div className={classes.si}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div
                          className={classes.textInput}
                          style={{ display: "flex" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Name of Organisation"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={row.name_organisation.value}
                            onChange={(event) => {
                              handleWorkExperience(
                                [
                                  "work_experience",
                                  index,
                                  "name_organisation",
                                  "value",
                                ],
                                event.target.value
                              );
                            }}
                          />
                          <Checkbox
                            checked={row.name_organisation.disable}
                            onChange={(event) => {
                              handleWorkExperience(
                                [
                                  "work_experience",
                                  index,
                                  "name_organisation",
                                  "disable",
                                ],
                                event.target.checked
                              );
                            }}
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%", display: "flex" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="From"
                              views={["year", "month"]}
                              value={row.from_period.value}
                              onChange={(newValue) => {
                                handleWorkExperience(
                                  [
                                    "work_experience",
                                    index,
                                    "from_period",
                                    "value",
                                  ],
                                  newValue
                                );
                              }}
                              // minDate={new Date("1970-03-01")}
                              // maxDate={new Date("2023-06-01")}
                              // onChange={(newValue) => {
                              //   setValue(newValue);
                              // }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  style={{ width: "100%" }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                          <Checkbox
                            checked={row.from_period.disable}
                            onChange={(event) => {
                              handleWorkExperience(
                                [
                                  "work_experience",
                                  index,
                                  "from_period",
                                  "disable",
                                ],
                                event.target.checked
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          className={classes.textInput}
                          style={{ display: "flex" }}
                        >
                          <TextField
                            id="outlined-size-small"
                            label="Role"
                            variant="outlined"
                            style={{ width: "100%" }}
                            value={row.role.value}
                            onChange={(event) => {
                              handleWorkExperience(
                                ["work_experience", index, "role", "value"],
                                event.target.value
                              );
                            }}
                          />
                          <Checkbox
                            checked={row.role.disable}
                            onChange={(event) => {
                              handleWorkExperience(
                                ["work_experience", index, "role", "disable"],
                                event.target.checked
                              );
                            }}
                          />
                        </div>
                        <div
                          className={classes.textInput}
                          style={{ marginTop: "4%", display: "flex" }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="To"
                              views={["year", "month"]}
                              value={row.to_period.value}
                              onChange={(newValue) => {
                                handleWorkExperience(
                                  [
                                    "work_experience",
                                    index,
                                    "to_period",
                                    "value",
                                  ],
                                  newValue
                                );
                              }}
                              // minDate={new Date("1970-03-01")}
                              // maxDate={new Date("2023-06-01")}
                              // onChange={(newValue) => {
                              //   setValue(newValue);
                              // }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  style={{ width: "100%" }}
                                />
                              )}
                            />
                          </LocalizationProvider>
                          <Checkbox
                            checked={row.to_period.disable}
                            onChange={(event) => {
                              handleWorkExperience(
                                [
                                  "work_experience",
                                  index,
                                  "to_period",
                                  "disable",
                                ],
                                event.target.checked
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <Icon
                  baseClassName="fas"
                  className="fa-plus-circle"
                  sx={{ fontSize: 30 }}
                  onClick={() => {
                    console.log("hello");
                    addWorkExperience();
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
              // disabled={!isEdit}
              disabled={checkSaveCondition()}
              onClick={() => saveStudentData()}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // else{
  //   container = (
  //     // include spinner tag
  //     //material ui: spinner tag
  //   );
  // }

  return <div>{container}</div>;
}
