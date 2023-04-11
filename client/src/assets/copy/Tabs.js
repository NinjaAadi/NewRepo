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
import axios from "../../../../../axios.automate";
import Cookies from "universal-cookie";

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
  const [value, setValue] = React.useState(0);

  const [studentProfile, setstudentProfile] = React.useState(null);

  const [isEdit, setEdit] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const [successful, setSuccessful] = React.useState(false);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const changestudentProfile = (key, value) => {
    console.log(props.studentProfile);
    let changedstudentProfile = { ...props.studentProfile };
    changedstudentProfile[key[0]][key[1]][key[2]][key[3]] = value;
    setstudentProfile(changedstudentProfile);
    setEdit(true);
  };

  const changeSocialMedia = (key, value) => {
    let changedstudentProfile = { ...props.studentProfile };
    changedstudentProfile[key[0]][key[1]][key[2]][key[3]][key[4]] = value;
    setEdit(true);
    setstudentProfile(changedstudentProfile);
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

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Contact Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="District"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={
                        props.studentProfile.data.contact_info.district.value
                      }
                      disabled={
                        props.studentProfile.data.contact_info.district.disable
                      }
                      onChange={(event) => {
                        changestudentProfile(
                          ["data", "contact_info", "district", "value"],
                          event.target.value
                        );
                      }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="State"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Country"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Pin Code"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Institute Email Id"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Alternate Email Id"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Mobile No."
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Alternate Mobile No."
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Twitter"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Instagram"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Educational Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div className="si">
                <p>Class X - Secondary</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Subjects"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Month & Year of Passing"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Marks Obtained"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Total Marks"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div className="si">
                <p>Class XII - Higher Secondary</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Subjects"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Month & Year of Passing"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Marks Obtained"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Total Marks"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div className="si">
                <p>Graduation</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Subjects"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Month & Year of Passing"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Marks Obtained"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Total Marks"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div className="si">
                <p>Ph.D.</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Subjects"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Month & Year of Passing"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{ width: "50%" }}>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Marks Obtained"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="textInput">
                      <TextField
                        id="outlined-size-small"
                        label="Total Marks"
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </div>
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
          <Typography>Qualification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Exam Type"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Month & Year"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div style={{ width: "50%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Score / Rank"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Valid upto"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid>
              <div style={{ display: "flex" }}>
                <div style={{ width: "100%" }}>
                  <div className="textInput">
                    <TextField
                      id="outlined-size-small"
                      label="Is Qualified"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Work Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid>
              <div style={{ width: "100%" }}>
                <div className="textInput">
                  <TextField
                    id="outlined-size-small"
                    label="Name of Organisation"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="textInput">
                  <TextField
                    id="outlined-size-small"
                    label="Role"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Grid>
            <Grid>
              <div style={{ width: "100%" }}>
                <div className="textInput">
                  <TextField
                    id="outlined-size-small"
                    label="From Period"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="textInput">
                  <TextField
                    id="outlined-size-small"
                    label="Upto"
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
// import React, {useEffect} from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import axios from "../../../../../axios.automate";
// import Cookies from "universal-cookie";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Button from "@mui/material/Button";

// const cookies = new Cookies();

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// export default function VerticalTabs(props) {
//   const [value, setValue] = React.useState(0);

//   const [studentProfile, setstudentProfile] = React.useState(null);

//   const [isEdit, setEdit] = React.useState(false);

//   const [loading, setLoading] = React.useState(false);

//   const [successful, setSuccessful] = React.useState(false);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const changestudentProfile = (key, value) => {
//     console.log(props.studentProfile);
//     let changedstudentProfile = { ...props.studentProfile };
//     changedstudentProfile[key[0]][key[1]][key[2]][key[3]] = value;
//     setstudentProfile(changedstudentProfile);
//     setEdit(true);
//   };

//   const changeSocialMedia = (key, value) => {
//     let changedstudentProfile = { ...props.studentProfile };
//     changedstudentProfile[key[0]][key[1]][key[2]][key[3]][key[4]] = value;
//     setEdit(true);
//     setstudentProfile(changedstudentProfile);
//   };

//   const updateStudentProfile = () => {
//     setLoading(true);
//     axios
//       .get("/updateInfo", {
//         params: {
//           rollno: cookies.get("userData").person_id,
//           user_type: cookies.get("userData").user_type,
//           student_desc: props.studentProfile.data,
//         },
//       })
//       .then((respnse) => {
//         setLoading(false);
//         setSuccessful(true);
//         setTimeout(() => {
//           setSuccessful(false);
//         }, 2000);
//       })
//       .catch((e) => console.log(e));
//   };

//   return (
//     <div>
//       <Box
//         sx={{
//           flexGrow: 1,
//           bgcolor: "background.paper",
//           display: "flex",
//           height: 224,
//         }}
//       >
//         <Tabs
//           orientation="vertical"
//           variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           aria-label="Vertical tabs example"
//           sx={{ borderRight: 1, borderColor: "black" }}
//         >
//           <Tab label="CONTACT INFO" {...a11yProps(0)} />
//           <Tab label="EDUCATIONAL DETAILS" {...a11yProps(1)} />
//           <Tab label="QUALIFYING EXAM DETAILS" {...a11yProps(2)} />
//           <Tab label="WORK EXPERIENCE" {...a11yProps(3)} />
//         </Tabs>
//         <TabPanel value={value} index={0}>
//           <Grid>
//             <TextField
//               id="outlined-size-small"
//               label="Address"
//               variant="outlined"
//               style={{ width: "100%", marginLeft: "5%" }}
//               value={props.studentProfile.data.contact_info.address.value}
//               disabled={props.studentProfile.data.contact_info.address.disable}
//               onChange={(event) => {
//                 changestudentProfile(
//                   ["data", "contact_info", "address", "value"],
//                   event.target.value
//                 );
//               }}
//             />
//           </Grid>
//           <Grid>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="District"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.contact_info.district.value
//                     }
//                     disabled={
//                       props.studentProfile.data.contact_info.district.disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "district", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="State"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={props.studentProfile.data.contact_info.state.value}
//                     disabled={
//                       props.studentProfile.data.contact_info.state.disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "state", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Country"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={props.studentProfile.data.contact_info.country.value}
//                     disabled={
//                       props.studentProfile.data.contact_info.country.disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "country", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Pin Code"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={props.studentProfile.data.contact_info.pin.value}
//                     disabled={
//                       props.studentProfile.data.contact_info.pin.disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "pin", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Institute Email Id"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.contact_info.institute_email_id
//                         .value
//                     }
//                     disabled={
//                       props.studentProfile.data.contact_info.institute_email_id
//                         .disable
//                     }
//                   />
//                 </div>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Alternate Email Id"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.contact_info.alt_email_id.value
//                     }
//                     disabled={
//                       props.studentProfile.data.contact_info.alt_email_id
//                         .disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "alt_email_id", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Mobile No."
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={props.studentProfile.data.contact_info.mobile.value}
//                     disabled={
//                       props.studentProfile.data.contact_info.mobile.disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "mobile", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Alternate Mobile No."
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.contact_info.alt_mobile.value
//                     }
//                     disabled={
//                       props.studentProfile.data.contact_info.alt_mobile.disable
//                     }
//                     onChange={(event) => {
//                       changestudentProfile(
//                         ["data", "contact_info", "alt_mobile", "value"],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Twitter"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.contact_info.social_media
//                         .twitter.value
//                     }
//                     disabled={
//                       props.studentProfile.data.contact_info.social_media
//                         .twitter.disable
//                     }
//                     onChange={(event) => {
//                       changeSocialMedia(
//                         [
//                           "data",
//                           "contact_info",
//                           "social_media",
//                           "twitter",
//                           "value",
//                         ],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Instagram"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.contact_info.social_media.insta
//                         .value
//                     }
//                     disabled={
//                       props.studentProfile.data.contact_info.social_media.insta
//                         .disable
//                     }
//                     onChange={(event) => {
//                       changeSocialMedia(
//                         [
//                           "data",
//                           "contact_info",
//                           "social_media",
//                           "insta",
//                           "value",
//                         ],
//                         event.target.value
//                       );
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </Grid>
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           <Grid>
//             <div className="si">
//               <p>Class X - Secondary</p>
//               <div style={{ display: "flex" }}>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Subjects"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.subject.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.subject.disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Month & Year of Passing"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.passing.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.passing.disable
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Marks Obtained"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.marks_obt.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.marks_obt
//                           .disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Total Marks"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.tot_marks.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_10_secondary.tot_marks
//                           .disable
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div className="si">
//               <p>Class XII - Higher Secondary</p>
//               <div style={{ display: "flex" }}>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Subjects"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary.subject
//                           .value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary.subject
//                           .disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Month & Year of Passing"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary.passing
//                           .value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary.passing
//                           .disable
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Marks Obtained"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary
//                           .marks_obt.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary
//                           .marks_obt.disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Total Marks"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary
//                           .tot_marks.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.class_12_higher_secondary
//                           .tot_marks.disable
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div className="si">
//               <p>Graduation</p>
//               <div style={{ display: "flex" }}>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Subjects"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.subject.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.subject.disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Month & Year of Passing"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.passing.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.passing.disable
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Marks Obtained"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.marks_obt.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.marks_obt.disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Total Marks"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.tot_marks.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.graduation.tot_marks.disable
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div className="si">
//               <p>Ph.D.</p>
//               <div style={{ display: "flex" }}>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Subjects"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.subject.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.subject.disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Month & Year of Passing"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.passing.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.passing.disable
//                       }
//                     />
//                   </div>
//                 </div>
//                 <div style={{ width: "50%" }}>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Marks Obtained"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.marks_obt.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.marks_obt.disable
//                       }
//                     />
//                   </div>
//                   <div className="textInput">
//                     <TextField
//                       id="outlined-size-small"
//                       label="Total Marks"
//                       variant="outlined"
//                       style={{ width: "100%" }}
//                       value={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.tot_marks.value
//                       }
//                       disabled={
//                         props.studentProfile.data.academic_info
//                           .educational_detail.phd.tot_marks.disable
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Grid>
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           <Grid>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Exam Type"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={props.studentProfile.data.qualifying_exam.type.value}
//                     disabled={
//                       props.studentProfile.data.qualifying_exam.type.disable
//                     }
//                   />
//                 </div>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Month & Year"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.qualifying_exam.month_year.value
//                     }
//                     disabled={
//                       props.studentProfile.data.qualifying_exam.month_year
//                         .disable
//                     }
//                   />
//                 </div>
//               </div>
//               <div style={{ width: "50%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Score / Rank"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.qualifying_exam.score.value
//                     }
//                     disabled={
//                       props.studentProfile.data.qualifying_exam.score.disable
//                     }
//                   />
//                 </div>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Valid upto"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.qualifying_exam.valid_upto.value
//                     }
//                     disabled={
//                       props.studentProfile.data.qualifying_exam.valid_upto
//                         .disable
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div style={{ display: "flex" }}>
//               <div style={{ width: "100%" }}>
//                 <div className="textInput">
//                   <TextField
//                     id="outlined-size-small"
//                     label="Is Qualified"
//                     variant="outlined"
//                     style={{ width: "100%" }}
//                     value={
//                       props.studentProfile.data.qualifying_exam.is_qualified
//                         .value
//                         ? "Yes"
//                         : "No"
//                     }
//                     disabled={
//                       props.studentProfile.data.qualifying_exam.is_qualified
//                         .disable
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           </Grid>
//         </TabPanel>
//         <TabPanel value={value} index={3}>
//           <Grid>
//             <div style={{ width: "100%" }}>
//               <div className="textInput">
//                 <TextField
//                   id="outlined-size-small"
//                   label="Name of Organisation"
//                   variant="outlined"
//                   style={{ width: "100%" }}
//                   value={
//                     props.studentProfile.data.work_experience.name_organisation
//                       .value
//                   }
//                   disabled={
//                     props.studentProfile.data.work_experience.name_organisation
//                       .disable
//                   }
//                   onChange={(event) => {
//                     changestudentProfile(
//                       ["data", "work_experience", "name_organisation", "value"],
//                       event.target.value
//                     );
//                   }}
//                 />
//               </div>
//               <div className="textInput">
//                 <TextField
//                   id="outlined-size-small"
//                   label="Role"
//                   variant="outlined"
//                   style={{ width: "100%" }}
//                   value={props.studentProfile.data.work_experience.role.value}
//                   disabled={
//                     props.studentProfile.data.work_experience.role.disable
//                   }
//                   onChange={(event) => {
//                     changestudentProfile(
//                       ["data", "work_experience", "role", "value"],
//                       event.target.value
//                     );
//                   }}
//                 />
//               </div>
//             </div>
//           </Grid>
//           <Grid>
//             <div style={{ width: "100%" }}>
//               <div className="textInput">
//                 <TextField
//                   id="outlined-size-small"
//                   label="From Period"
//                   variant="outlined"
//                   style={{ width: "100%" }}
//                   value={props.studentProfile.data.work_experience.period.value}
//                   disabled={
//                     props.studentProfile.data.work_experience.period.disable
//                   }
//                   onChange={(event) => {
//                     changestudentProfile(
//                       ["data", "work_experience", "period", "value"],
//                       event.target.value
//                     );
//                   }}
//                 />
//               </div>
//               <div className="textInput">
//                 <TextField
//                   id="outlined-size-small"
//                   label="Upto"
//                   variant="outlined"
//                   style={{ width: "100%" }}
//                   value={props.studentProfile.data.work_experience.upto.value}
//                   disabled={
//                     props.studentProfile.data.work_experience.upto.disable
//                   }
//                   onChange={(event) => {
//                     changestudentProfile(
//                       ["data", "work_experience", "upto", "value"],
//                       event.target.value
//                     );
//                   }}
//                 />
//               </div>
//             </div>
//           </Grid>
//         </TabPanel>
//       </Box>
//       {successful ? (
//         <Alert severity="success">
//           <AlertTitle>Success</AlertTitle>
//           Updated Successfully — <strong>check it out!</strong>
//         </Alert>
//       ) : null}
//       <Button
//         variant="contained"
//         disabled={!isEdit}
//         onClick={() => updateStudentProfile()}
//       >
//         SAVE
//       </Button>
//     </div>
//   );
// }
