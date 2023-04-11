import React, { useEffect, useState, useRef } from "react";
import classes from "./dashboard.module.css";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { minWidth } from "@mui/system";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
const cookies = new Cookies();

export default function ClickableChips() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const [student_details, setStudentDetails] = useState(null);
  const [loading, setLoading] = React.useState(false);

  const sem_index_map = useRef({});
  const fetchDetails = async (student_id) => {
    const response = await axios.get(
      "http://localhost:5002/m_student_dept_prg_course/getByStudentId/" +
        student_id
    );
    const data = response.data.data;
    const _student_details = {};
    //Fetch the department name
    const dept = await axios.get(
      "http://localhost:5002/dept_master/get/" + data.dept_id
    );

    const dept_name = JSON.parse(dept.data.data.dept_details).dispName;
    _student_details.dept_name = dept_name;
    //Fetch the program_name
    const program = await axios.get(
      "http://localhost:5002/program_master/get/" + data.prog_id
    );
    const program_name = JSON.parse(program.data.data.prog_details).dispName;
    _student_details.program_name = program_name;
    //Data for semester registrations
    const sem_reg = await axios.get(
      "http://localhost:5002/m_student_reg/getByStudentId/" + student_id
    );
    const array = sem_reg.data.data[0].sem_sub_details.sem;
    //Map all the sem with it's id
    const sem_array = Array.apply(null, Array(array.length));
    for (var i = 0; i < array.length; i++) {
      const res = await axios.get(
        "http://localhost:5002/sem_master/getBySemId/" + array[i].sem_id
      );
      const d = JSON.parse(res.data.data.sem_desc);
      console.log(array[i].sem_id);
      sem_index_map.current[array[i].sem_id] = d.dispNumber;
      sem_array[d.dispNumber] = {
        sem: array[i].sem_id,
        subjects: array[i].subject,
      };
    }
    _student_details.semester = array.length;
    //Fetch the grades
    const gradeResp = await axios.get(
      "http://localhost:5002/m_student_grade/getByStudentId/" + student_id
    );

    const grade_data = gradeResp.data.data.grade_details.sem;
    const cgpa_data = Array.apply(null, Array(array.length));
    const sgpa_data = Array.apply(null, Array(array.length));
    for (var i = 0; i < grade_data.length; i++) {
      var sem_index = sem_index_map.current[grade_data[i].sem_id];
      var total_pt = 0;
      var cumulative_pt = 0;
      for (var j = 0; j < grade_data[i].gradeDetails.length; j++) {
        var gradeId = grade_data[i].gradeDetails[j].grade_id;
        if (gradeId == null) continue;
        const gradeD = await axios.get(
          "http://localhost:5002/grade_master/get/" + gradeId
        );
        var pt = parseInt(gradeD.data.data.grade_pt);
        cumulative_pt += pt;
        total_pt += 10;
      }
      if (total_pt == 0) sgpa_data[sem_index] = 0;
      else sgpa_data[sem_index] = ((cumulative_pt / total_pt) * 10).toFixed(3);
    }
    var sum = 0;
    for (var l = 1; l < sgpa_data.length; l++) {
      sum += parseFloat(sgpa_data[l]);
      cgpa_data[l] = (sum / l).toFixed(3);
    }
    _student_details.cgpa = cgpa_data[array.length];

    //Fetch the course
    const course = await axios.get(
      "http://localhost:5002/course_master/get/" + data.course_id
    );
    const course_name = JSON.parse(course.data.data.course_details).dispName;
    _student_details.course_name = course_name;

    setStudentDetails(_student_details);
    console.log(_student_details);
  };
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const student_id = profile.student_id;
    setLoading(true);
    fetchDetails(student_id);
    setLoading(false);
    
  }, []);

  let container = null;
  if (loading || student_details == null || student_details == undefined) {
    container = (
      <div style={{ height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  } else if (student_details) {
    container = (
      <Grid className={classes.marginSet}>
        <Grid className={classes.style}>
          <Grid style={{ width: "100%", display: "flex" }}>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>Department</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>{student_details.dept_name}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>Program</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>{student_details.program_name}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid style={{ width: "100%", display: "flex" }}>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>Course</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>{student_details.course_name}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>Semester</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>{student_details.semester}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.style}>
          <Grid style={{ width: "100%", display: "flex" }}>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>CGPA</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>
                      {student_details.cgpa ? student_details.cgpa : "-"}
                    </strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>Scholarship/Certificates</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>-</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid style={{ width: "100%", display: "flex" }}>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong> Warning/Penalties</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>-</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid style={{ width: "100%" }} className={classes.paddingStyle}>
              <Card
                sx={{
                  minWidth: 150,
                  minHeight: 120,
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <CardContent>
                  <Typography align="left" sx={{ fontSize: 14 }}>
                    <strong>Cohorts</strong>
                  </Typography>
                  <Typography align="center">
                    <strong>-</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <div>{container}</div>;
}
