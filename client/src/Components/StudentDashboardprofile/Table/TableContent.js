import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import classes from "./tablecontent.module.css";
import axios from "../../../axios.automate";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const StyledMenu = styled((props) => (
  <Menu
    elevation={16}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 8,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus() {
  const [cursemDetail, setcurSemDetail] = React.useState(null);
  const [currSemIndex, setcurrSemIndex] = React.useState(null);
  const [semDetail, setSemDetail] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [activeSem, setactiveSem] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [semData, setSemData] = useState(null);
  // const [Sem, setSem] = React.useState(true);
  const sem_index_map = React.useRef({});
  const fetchSemDetails = async (student_id) => {
    const response = await axios.get(
      "http://localhost:5002/m_student_reg/getByStudentId/" + student_id
    );

    const gradeResp = await axios.get(
      "http://localhost:5002/m_student_grade/getByStudentId/" + student_id
    );
    const grade_data = gradeResp.data.data.grade_details.sem;
    console.log(grade_data);
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
    const _sem_data = new Array(null, Array(array.length));
    for (var i = 0; i < grade_data.length; i++) {
      const sem_index = sem_index_map.current[grade_data[i].sem_id];
      console.log(sem_index);
      const _sem_result_data = [];
      for (var j = 0; j < grade_data[i].gradeDetails.length; j++) {
        const sub = await axios.get(
          "http://localhost:5002/sub_master/get/" +
            grade_data[i].gradeDetails[j].sub_id
        );
        let grade_id = grade_data[i].gradeDetails[j].grade_id;
        if (grade_id == null) grade_id = "grade_master_1638267109564_20161565";
        const grade = await axios.get(
          "http://localhost:5002/grade_master/get/" + grade_id
        );
        _sem_result_data.push({
          subject: sub.data.data,
          grade: grade.data.data,
        });
      }
      _sem_data[sem_index] = _sem_result_data;
    }
    console.log(_sem_data);
    setSemData(_sem_data);
    setcurrSemIndex(1);
  };
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const student_id = profile.student_id;
    fetchSemDetails(student_id);
    setactiveSem(1);
    setLoading(false);
  }, []);
  useEffect(() => {
    console.clear();
    console.log(semDetail, activeSem);
  }, [semDetail, activeSem]);

  const setNewSemDetail = (semNo) => {
    console.log(semNo);
    setactiveSem(semNo);
    setcurrSemIndex(semNo);
    setAnchorEl(null);
  };

  let container = null;
  if (loading || semData == null) {
    container = (
      <div style={{ height: "100vh" }}>
        <CircularProgress />
      </div>
    );
  } else if (semData && activeSem) {
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    let rows = [];

    // const [Sem, setSem] = React.useState(true);
    // const onClick = () => {
    //   setSem(true);
    // }
    function createData(sn, cname, cid, result) {
      return { sn, cname, cid, result };
    }



    function Text() {
      if (semData[currSemIndex] == null) {
        return <div></div>;
      }
      return (
        <div className={classes.tableContainer}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 480 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "deepskyblue" }}>
                <TableRow>
                  <TableCell align="left">Sr. No.</TableCell>
                  <TableCell align="left">Subject Name</TableCell>
                  <TableCell align="left">Subject ID</TableCell>
                  <TableCell align="left">Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "1" }}>
                {semData[currSemIndex].map((row, index) => (
                  <TableRow
                    // key={row.sn}
                    sx={{
                      " td,  th": { border: 1 },
                      backgroundColor: "smokewhite",
                      border: "1",
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{"Physics"}</TableCell>
                    <TableCell align="left">{row.subject.sub_code}</TableCell>
                    <TableCell align="left">
                      {/* {row.result ? row.result : "NA"} */}
                      {row.grade.grade_pt + " gpa"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
    container = (
      <div>
        <Grid style={{ display: "flex" }}>
          <div className={classes.tableText}>
            <div className={classes.tableStyle}>
              <p style={{ width: "43%" }}>Semester Performance</p>

              <Button
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                value={activeSem}
                sx={{
                  backgroundColor: "#7f7f7f",
                  marginLeft: "23%",
                  marginTop: "1%",
                  marginBottom: "1%",
                }}
              >
                Semester {activeSem}
              </Button>
            </div>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {semData.map((sem, index) => {
                if (index == 0) return <div></div>;
                return (
                  <MenuItem
                    onClick={() => {
                      setNewSemDetail(index);
                      setcurrSemIndex(index);
                      // handleClose();
                    }}
                  >
                    Semester {index}
                  </MenuItem>
                );
              })}
            </StyledMenu>
          </div>
        </Grid>
        {/* {Sem ? <Text /> : null} */}
        <Text />
      </div>
    );
  }

  return <div>{container}</div>;
}
