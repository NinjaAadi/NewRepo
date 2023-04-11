import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "../../axios.automate";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function DataInput() {
  const [loading, setLoading] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);
  const uniqueIds = [];

  const [data, setData] = React.useState({
    subject_id: null,
    department_id: null,
    program_id: null,
    sem_id: null,
    course_id: null,
    subjectType_id: null,
  });

  const [allData, setAllData] = React.useState({
    allSubject: null,
    allDepartment: null,
    allProgram: null,
    allSem: null,
    allCourse: null,
    allSubjectType: null
  });

  const [menuDetails,setMenuDetails] = React.useState(null)

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("facultyMenuDetails", {
        params: {
          person_id: cookies.get("userData").person_id
        },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.success) {
            setMenuDetails(res.data.menuDetails)
          //   const tempData = { ...allData };
          //   tempData.allSubject = res.data.subject;
          //   tempData.allDepartment = res.data.department;
          //   tempData.allProgram = res.data.program;
          //   tempData.allSem = res.data.sem;
          //   tempData.allCourse = res.data.course;
          //   tempData.allSubjectType = res.data.subjectType;
          //   setAllData(tempData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeData = (key, value) => {
    console.log(data);
    setData({ ...data, [key]: value });
  };

  const selectDepartment = menuDetails?menuDetails.filter(
    (ele)=>ele.subject_id===data.subject_id
  ):null

  const selectProgram = menuDetails
    ? menuDetails.filter((ele) => 
    ele.subject_id === data.subject_id && ele.dept_id===data.department_id)
    : null;

  const selectSem = menuDetails
    ? menuDetails.filter(
        (ele) =>
          ele.subject_id === data.subject_id &&
          ele.dept_id === data.department_id &&
          ele.program_id===data.program_id
      )
    : null;

  const selectCourse = menuDetails
    ? menuDetails.filter(
        (ele) =>
          ele.subject_id === data.subject_id &&
          ele.dept_id === data.department_id &&
          ele.program_id === data.program_id && 
          ele.sem_id === data.sem_id
      )
    : null;

    const selectSubjectType = menuDetails
      ? menuDetails.filter(
          (ele) =>
            ele.subject_id === data.subject_id &&
            ele.dept_id === data.department_id &&
            ele.program_id === data.program_id &&
            ele.sem_id === data.sem_id && 
            ele.course_id === data.course_id
        )
      : null;

  const searchStudent = () => {
    axios
      .get("/searchStudent", {
        params: {
        data: { ...data },
        }
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setSuccessful(true);
          setTimeout(() => {
            setSuccessful(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {loading ? (
        <div style={{ height: "100vh" }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Subject
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Subject"
              value={data.subject_id ? data.subject_id : ""}
              onChange={(event) =>
                handleChangeData("subject_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Subject--</MenuItem>
              {menuDetails
                ? menuDetails.map((value, key) => {
                    return (
                      <MenuItem value={value.subject_id} key={key}>
                        {value.subject_name}
                      </MenuItem>
                    );
                  })
                : // .filter((element) => {
                  //   const isDuplicate = uniqueIds.includes(
                  //     element.subject_id
                  //   );

                  //   if (!isDuplicate) {
                  //     uniqueIds.push(element.subject_id);
                  //     return true;
                  //   }

                  //   return false;
                  // })
                  null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Department"
              value={data.department_id ? data.department_id : ""}
              onChange={(event) =>
                handleChangeData("department_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Department--</MenuItem>
              {selectDepartment
                ? selectDepartment.map((value, key) => {
                    return (
                      <MenuItem value={value.dept_id} key={key}>
                        {value.dept_name}
                      </MenuItem>
                    );
                  })
                : // console.log(selectDepartment)
                  // .filter((element) => {
                  //   const isDuplicate = uniqueIds.includes(element.dept_id);

                  //   if (!isDuplicate) {
                  //     uniqueIds.push(element.dept_id);
                  //     return true;
                  //   }

                  //   return false;
                  // })
                  null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Program
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Program"
              value={data.program_id ? data.program_id : ""}
              onChange={(event) =>
                handleChangeData("program_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Program--</MenuItem>
              {selectProgram
                ? selectProgram.map((value, key) => {
                    return (
                      <MenuItem value={value.program_id} key={key}>
                        {value.program_name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">Sem</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Semester"
              value={data.sem_id ? data.sem_id : ""}
              onChange={(event) =>
                handleChangeData("sem_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Semester--</MenuItem>
              {selectSem
                ? selectSem.map((value, key) => {
                    return (
                      <MenuItem value={value.sem_id} key={key}>
                        {value.sem_name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Course
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Course"
              value={data.course_id ? data.course_id : ""}
              onChange={(event) =>
                handleChangeData("course_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Course--</MenuItem>
              {selectCourse
                ? selectCourse.map((value, key) => {
                    return (
                      <MenuItem value={value.course_id} key={key}>
                        {value.course_name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Subject Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Subject Type"
              value={data.subjectType_id ? data.subjectType_id : ""}
              onChange={(event) =>
                handleChangeData("subjectType_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Subject Type--</MenuItem>
              {selectSubjectType
                ? selectSubjectType.map((value, key) => {
                    return (
                      <MenuItem value={value.subject_type_id} key={key}>
                        {value.subject_type_name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <Button
            style={{ borderRadius: "20px" }}
            variant="contained"
            disabled={
              data.subject_id &&
              data.department_id &&
              data.program_id &&
              data.sem_id &&
              data.course_id &&
              data.subjectType_id
                ? false
                : true
            }
            onClick={() => searchStudent()}
          >
            Search
          </Button>
          <br></br>
          <br></br>
          {successful ? (
            <Alert severity="success">
              <AlertTitle>Success </AlertTitle>
              <strong> Fetching Results !!</strong>
            </Alert>
          ) : null}
        </div>
      )}
    </div>
  );
}
