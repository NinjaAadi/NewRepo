import React, { useEffect, useState, useRef } from "react";
import classes from "./Dashboard.module.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";
import DownloadIcon from "@mui/icons-material/Download";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import CircularProgress from "@mui/material/CircularProgress";
const cookies = new Cookies();

function Dash() {
  const [curSemDetail, setcurSemDetail] = React.useState(null);
  const [sembtnStyle, setsembtnStyle] = React.useState(classes.sembtn);
  const [semDetail, setsemDetail] = React.useState(null);
  const [activeSem, setactiveSem] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [semArray, setSemArray] = useState(null);
  const [attendanceArr, setAttendanceArr] = useState(null);
  const sem_index_map = useRef({});
  const [cgpaArr, setCgpaArr] = useState(null);
  const [sgpaArr, setSgpaArr] = useState(null);
  const fetchSemDetail = async (student_id) => {
    const response = await axios.get(
      "http://localhost:5002/m_student_reg/getByStudentId/" + student_id
    );
    const attendanceResp = await axios.get(
      "http://localhost:5002/m_student_attendance/getByStudentId/" + student_id
    );
    const gradeResp = await axios.get(
      "http://localhost:5002/m_student_grade/getByStudentId/" + student_id
    );

    const grade_data = gradeResp.data.data.grade_details.sem;
    const attendance_array = attendanceResp.data.data.attendance_details.sem;
    const array = response.data.data[0].sem_sub_details.sem;
    const sem_array = Array.apply(null, Array(array.length));
    for (var i = 0; i < array.length; i++) {
      const res = await axios.get(
        "http://localhost:5002/sem_master/getBySemId/" + array[i].sem_id
      );
      const d = JSON.parse(res.data.data.sem_desc);
      sem_index_map.current[array[i].sem_id] = d.dispNumber;
      sem_array[d.dispNumber] = {
        sem: array[i].sem_id,
        subjects: array[i].subject,
      };
    }
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
    setSgpaArr(sgpa_data);
    var sum = 0;
    for (var l = 1; l < sgpa_data.length; l++) {
      console.log(parseFloat(sgpa_data[l]) / (l + 1).toFixed(3));
      sum += parseFloat(sgpa_data[l]);
      console.log(sum);
      cgpa_data[l] = (sum / l).toFixed(3);
    }
    setCgpaArr(cgpa_data);
    console.log(sgpa_data, cgpa_data);
    const attendance_data = Array.apply(null, Array(array.length));
    for (var i = 0; i < attendance_array.length; i++) {
      var sem_index_ = sem_index_map.current[attendance_array[i].sem_id];
      var total_present = 0;
      var total_classes = 0;
      for (var j = 0; j < attendance_array[i].subject.length; j++) {
        for (
          var k = 0;
          k < attendance_array[i].subject[j].attendance_detail.length;
          k++
        ) {
          if (
            attendance_array[i].subject[j].attendance_detail[k].is_present ===
            "true"
          ) {
            total_present++;
          }
          total_classes++;
        }
      }
      attendance_data[sem_index_] = (total_present / total_classes) * 100;
    }
    setAttendanceArr(attendance_data);
    setSemArray(sem_array);
    setactiveSem(1);
  };
  useEffect(() => {
    setLoading(true);
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const student_id = profile.student_id;
    fetchSemDetail(student_id);
  }, []);
  useEffect(() => {
    setLoading(false);
    console.log(semArray);
  }, [semArray]);
  const setCurrentShowingSem = (sem) => {
    setactiveSem(sem);
  };
  const sem_dummy = [1, 2, 3, 4, 5, 6, 7, 8];
  let container = null;
  if (
    loading ||
    !semArray ||
    !attendanceArr ||
    attendanceArr == null ||
    attendanceArr == undefined ||
    cgpaArr == null ||
    cgpaArr == undefined ||
    sgpaArr == null ||
    sgpaArr == undefined
  ) {
    container = (
      <div style={{ height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  } else if (semArray && attendanceArr && cgpaArr && sgpaArr) {
    container = (
      <div>
        <div className={classes.main}>
          <p className={classes.Academic} style={{ paddingTop: "0.5%" }}>
            <div style={{ display: "flex" }}>
              <h3 className={classes.acadStyle}>Academic Storyboard</h3>
              <div className={classes.iconStyle}>
                <DownloadIcon />
                &nbsp;&nbsp;&nbsp;
                <LocalPrintshopIcon />
              </div>
            </div>
          </p>
          <div className={classes.hi} style={{ display: "flex" }}>
            {semArray.map((sem, index) => {
              if (index == 0) return <div></div>;
              return (
                <div className={classes.border}>
                  <button
                    className={[
                      activeSem === index
                        ? classes.curSem
                        : activeSem > index
                        ? classes.prevSem
                        : classes.nextSem,
                      activeSem === index ? classes.activeSem : null,
                    ].join(" ")}
                    // disabled={
                    //   index > curSemDetail.current_sem_number ? true : false
                    // }
                    onClick={() => setCurrentShowingSem(index)}
                  >
                    {index}
                  </button>
                </div>
              );
            })}
            {sem_dummy.map((i) => {
              if (i > semArray.length - 1) {
                return (
                  <div className={classes.border}>
                    <button disabled={true} className={classes.nextSem}>
                      {i}
                    </button>
                  </div>
                );
              }
            })}
          </div>
          <div className={classes.out}>
            <div className={classes.in}>
              <div className={classes.card}>
                <input
                  type="text"
                  className={classes.title}
                  style={{ border: "none" }}
                  value="Subjects"
                ></input>
                <input
                  type="text"
                  className={classes.dis}
                  style={{ border: "none" }}
                  value={
                    activeSem == null || activeSem == 0
                      ? 0
                      : semArray[activeSem].subjects.length
                  }
                ></input>
              </div>
              <div className={classes.card}>
                <input
                  type="text"
                  className={classes.title}
                  style={{ border: "none" }}
                  value="Attendance"
                ></input>
                <input
                  type="text"
                  className={classes.dis}
                  style={{ border: "none" }}
                  value={
                    activeSem == null || activeSem == 0
                      ? 0
                      : attendanceArr[activeSem].toFixed(2) + "%"
                    // semDetail.average_attendance
                    //   ? semDetail.average_attendance.toFixed(2)
                    //   : "-"
                  }
                ></input>
              </div>
            </div>
            <div className={classes.in}>
              <div className={classes.card}>
                <input
                  type="text"
                  style={{ border: "none" }}
                  className={classes.title}
                  value="SGPA"
                ></input>
                <input
                  type="text"
                  style={{ border: "none" }}
                  className={classes.dis}
                  value={
                    activeSem == null || activeSem == 0 ? 0 : sgpaArr[activeSem]
                  }
                ></input>
              </div>
              <div className={classes.card}>
                <input
                  type="text"
                  style={{ border: "none" }}
                  className={classes.title}
                  value="CGPA"
                ></input>
                <input
                  type="text"
                  style={{ border: "none" }}
                  className={classes.dis}
                  value={
                    activeSem == null || activeSem == 0 ? 0 : cgpaArr[activeSem]
                  }
                ></input>
              </div>
            </div>
          </div>
          <div className={classes.download}>
            <div className={classes.bu}>
              <button className={classes.cource}>Course Materials</button>
              <button className={classes.cource}>Video Lectures</button>
            </div>

            <div className={classes.bu1}>
              <button className={classes.cource}>Assignments & Solution</button>
              <button className={classes.cource}>NPTEL Courses</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>{container}</div>;
}

export default Dash;
