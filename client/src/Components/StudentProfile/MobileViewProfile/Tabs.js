import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import classes from "./mview.module.css";
import Icon from "@mui/material/Icon";
import { loadCSS } from "fg-loadcss";

const cookies = new Cookies();

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions(props) {

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

  /*const handleChange = (event, newValue) => {
    setValue(newValue);
  };*/

  const changeWorkExperience = (key, value) => {
    let changedStudentProfile = { ...studentProfile };
    changedStudentProfile[key[0]][key[1]][key[2]][key[3]][key[4]] = value;
    setEdit(true);
    setStudentProfile(changedStudentProfile);
  };

  const changestudentProfile = (key, value) => {
    console.log(props.studentProfile);
    let changedstudentProfile = { ...props.studentProfile };
    changedstudentProfile[key[0]][key[1]][key[2]][key[3]] = value;
    setStudentProfile(changedstudentProfile);
    setEdit(true);
  };

  const changeSocialMedia = (key, value) => {
    let changedstudentProfile = { ...props.studentProfile };
    changedstudentProfile[key[0]][key[1]][key[2]][key[3]][key[4]] = value;
    setEdit(true);
    setStudentProfile(changedstudentProfile);
  };

  const addWorkExperience = (key) => {
    let changedStudentProfile = { ...props.studentProfile };
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
    axios
      .get("/updateInfo", {
        params: {
          rollno: cookies.get("userData").person_id,
          user_type: cookies.get("userData").user_type,
          student_desc: props.studentProfile.data,
        },
      })
      .then((respnse) => {
        setLoading(false);
        setSuccessful(true);
        setTimeout(() => {
          setSuccessful(false);
        }, 2000);
      })
      .catch((e) => console.log(e));
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  for (let i = 0; i < props.studentProfile.data.work_experience.length; i++) {
    rows.push(
      createData(
        props.studentProfile.data.work_experience[i].name_organisation.value,
        props.studentProfile.data.work_experience[i].name_organisation.disbale,
        props.studentProfile.data.work_experience[i].role.value,
        props.studentProfile.data.work_experience[i].role.disable,
        props.studentProfile.data.work_experience[i].from_period.value,
        props.studentProfile.data.work_experience[i].from_period.disable,
        props.studentProfile.data.work_experience[i].to_period.value,
        props.studentProfile.data.work_experience[i].to_period.disable
      )
    );
  }
  
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Admission Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%" }}>
                <div className={classes.textInput}>
                  <TextField
                    id="outlined-size-small"
                    label="Department"
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={props.studentProfile.data.admission_info.dept.value}
                    disabled={
                      props.studentProfile.data.admission_info.dept.disable
                    }
                  />
                </div>
                <div className={classes.textInput1}>
                  <TextField
                    id="outlined-size-small"
                    label="Program"
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={
                      props.studentProfile.data.admission_info.program.value
                    }
                    disabled={
                      props.studentProfile.data.admission_info.program.disable
                    }
                  />
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <div className={classes.textInput}>
                  <TextField
                    id="outlined-size-small"
                    label="Course"
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={
                      props.studentProfile.data.admission_info.course.value
                    }
                    disabled={
                      props.studentProfile.data.admission_info.course.disable
                    }
                  />
                </div>
                <div className={classes.textInput1}>
                  <TextField
                    id="outlined-size-small"
                    label="Academic Session"
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={
                      props.studentProfile.data.admission_info.academic_session.value
                    }
                    disabled={
                      props.studentProfile.data.admission_info.academic_session.disable
                    }
                  />
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Contact Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div className={classes.textAddressInput}>
                <TextField
                  id="outlined-size-small"
                  label="Address"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={props.studentProfile.data.contact_info.address.value}
                  disabled={
                    props.studentProfile.data.contact_info.address.disable
                  }
                  onChange={(event) => {
                    changestudentProfile(
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
                      value={
                        props.studentProfile.data.contact_info.country.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.country.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "country", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="City"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.city.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.city.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "city", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Mobile No."
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.mobile.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.mobile.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "mobile", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Institute Email Id"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info
                          .institute_email_id.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info
                          .institute_email_id.disable
                      }
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Alternate Email Id"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.alt_email_id
                          .value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.alt_email_id
                          .disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "alt_email_id", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Fcaebook"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.social_media.fb
                          .value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.social_media.fb
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
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Twitter"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.social_media
                          .twitter.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.social_media
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
                      value={props.studentProfile.data.contact_info.state.value}
                      disabled={
                        props.studentProfile.data.contact_info.state.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "state", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Pin Code"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={props.studentProfile.data.contact_info.pin.value}
                      disabled={
                        props.studentProfile.data.contact_info.pin.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "pin", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Alternate Mobile No."
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.alt_mobile.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.alt_mobile
                          .disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "alt_mobile", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Email Id"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.email_id.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.email_id.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "email_id", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Linkedin"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.social_media
                          .linkedin.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.social_media
                          .linkedin.disable
                      }
                      onChange={(event) => {
                        changeSocialMedia(
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
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Instagram"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.social_media
                          .insta.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.social_media
                          .insta.disable
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
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Educational Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div className={classes.si}>
                <p>Secondary</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className={classes.textInput}>
                      <TextField
                        id="outlined-size-small"
                        label="School Name"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail.secondary
                            .school.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail.secondary
                            .school.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Subjects"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail.secondary
                            .subject.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail.secondary
                            .subject.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Marks Obtained"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail.secondary
                            .marks_obt.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail.secondary
                            .marks_obt.disable
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
                          props.studentProfile.data.educational_detail.secondary
                            .board.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail.secondary
                            .board.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Month & Year of Passing"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail.secondary
                            .passing.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail.secondary
                            .passing.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Total Marks"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail.secondary
                            .tot_marks.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail.secondary
                            .tot_marks.disable
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div className={classes.si}>
                <p>Senior-Secondary/Diploma</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className={classes.textInput}>
                      <TextField
                        id="outlined-size-small"
                        label="School Name"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.school.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.school.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Subjects"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.subject.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.subject.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Marks Obtained"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.marks_obt.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.marks_obt.disable
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
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.board.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.board.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Month & Year of Passing"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.passing.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.passing.disable
                        }
                      />
                    </div>
                    <div className={classes.textInput1}>
                      <TextField
                        id="outlined-size-small"
                        label="Total Marks"
                        variant="outlined"
                        style={{ width: "100%" }}
                        value={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.tot_marks.value
                        }
                        disabled={
                          props.studentProfile.data.educational_detail
                            .senior_secondary_diploma.tot_marks.disable
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            {Object.keys(
              props.studentProfile.data.educational_detail.graduation
            ).length != 0 && (
              <Grid>
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
                            props.studentProfile.data.educational_detail
                              .graduation.program.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.program.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="University"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.university.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.university.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.department.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.department.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.marks_obt.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.marks_obt.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Month & Year of Passing"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.month_year_passing.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.month_year_passing.disable
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
                            props.studentProfile.data.educational_detail
                              .graduation.college.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.college.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Marking Type"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.marking_type.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.marking_type.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.course.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.course.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .graduation.tot_marks.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .graduation.tot_marks.disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            )}

            {Object.keys(
              props.studentProfile.data.educational_detail.post_graduation
            ).length != 0 && (
              <Grid>
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
                            props.studentProfile.data.educational_detail
                              .post_graduation.program.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.program.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="University"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.university.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.university.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.department.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.department.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.marks_obt.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.marks_obt.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Month & Year of Passing"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.month_year_passing.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.month_year_passing.disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="College"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.college.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.college.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Marking Type"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.marking_type.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.marking_type.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.course.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.course.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail
                              .post_graduation.tot_marks.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail
                              .post_graduation.tot_marks.disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            )}

            {Object.keys(props.studentProfile.data.educational_detail.phd)
              .length != 0 && (
              <Grid>
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
                            props.studentProfile.data.educational_detail.phd
                              .university.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .university.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Department"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .department.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .department.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Course"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .course.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .course.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Marks Obtained"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .marks_obt.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .marks_obt.disable
                          }
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div className={classes.textInput}>
                        <TextField
                          id="outlined-size-small"
                          label="College"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .college.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .college.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Marking Type"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .marking_type.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .marking_type.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Month & Year of Passing"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .month_year_passing.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .month_year_passing.disable
                          }
                        />
                      </div>
                      <div className={classes.textInput1}>
                        <TextField
                          id="outlined-size-small"
                          label="Total Marks"
                          variant="outlined"
                          style={{ width: "100%" }}
                          value={
                            props.studentProfile.data.educational_detail.phd
                              .tot_marks.value
                          }
                          disabled={
                            props.studentProfile.data.educational_detail.phd
                              .tot_marks.disable
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Qualifying Exam Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <div className={classes.textInput}>
                    <TextField
                      id="outlined-size-small"
                      label="Exam Name"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.qualifying_exam.exam_name
                          .value
                      }
                      disabled={
                        props.studentProfile.data.qualifying_exam.exam_name
                          .disable
                      }
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Score"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.qualifying_exam.score.value
                      }
                      disabled={
                        props.studentProfile.data.qualifying_exam.score.disable
                      }
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Valid upto"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.qualifying_exam.valid_upto
                          .value
                      }
                      disabled={
                        props.studentProfile.data.qualifying_exam.valid_upto
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
                        props.studentProfile.data.qualifying_exam
                          .month_year_passing.value
                      }
                      disabled={
                        props.studentProfile.data.qualifying_exam
                          .month_year_passing.disable
                      }
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="All India Rank"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.qualifying_exam.air.value
                      }
                      disabled={
                        props.studentProfile.data.qualifying_exam.air.disable
                      }
                    />
                  </div>
                  <div className={classes.textInput1}>
                    <TextField
                      id="outlined-size-small"
                      label="Qualified"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.qualifying_exam.is_qualified
                          .value
                          ? "Yes"
                          : "No"
                      }
                      disabled={
                        props.studentProfile.data.qualifying_exam.is_qualified
                          .disable
                      }
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Work Experience</Typography>
        </AccordionSummary>
        {rows.map((row, index) => (
          <AccordionDetails>
            <Typography>
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
                  <div className={classes.textInput1}>
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
                          ["data", "work_experience", index, "role", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className={classes.textInput1}>
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
            </Typography>
          </AccordionDetails>
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
      </Accordion>
      {successful ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Updated Successfully — <strong>check it out!</strong>
        </Alert>
      ) : null}
      <Button
        style={{ marginTop: "5%" }}
        variant="contained"
        disabled={!isEdit}
        onClick={() => updateStudentProfile()}
      >
        SAVE
      </Button>
    </div>
  );
}
