import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "../../axios.automate";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function DataInput() {
  const [loading, setLoading] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);

  const [data, setData] = React.useState({
    subject_id: null,
    department_id: null,
    program_id: null,
    sem_id: null,
    course_id: null,
    subjectType_id: null,
    faculty_id: null
  });

  const [allData, setAllData] = React.useState({
    allSubject: null,
    allDepartment: null,
    allProgram: null,
    allSem: null,
    allCourse: null,
    allSubjectType: null,
    allFaculty: null
  });


  React.useEffect(() => {
    setLoading(true);
    axios
      .get("menuDetails", { params: {} })
      .then((res) => {
        setLoading(false)
        console.log(res);
        if (res.data.success) {
          const tempData = { ...allData };

          tempData.allSubject = res.data.subject;
          tempData.allDepartment = res.data.department;
          tempData.allProgram = res.data.program;
          tempData.allSem = res.data.sem;
          tempData.allCourse = res.data.course;
          tempData.allSubjectType = res.data.subjectType;
          tempData.allFaculty = res.data.faculty

          setAllData(tempData)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const handleChangeData = (key, value) => {
    console.log(data);
    setData({ ...data, [key]: value });
  };

  const updateDetails = () => {
    axios.post("/submitMenuDetails", {
        data: {...data}
    })
    .then((res)=> {
        console.log(res)
        if(res.data.success) {
          setSuccessful(true);
          setTimeout(() => {
            setSuccessful(false);
          }, 2000);
        }
    })
    .catch((err) => {
        console.log(err)
    })
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
              {allData.allSubject
                ? allData.allSubject.map((value, key) => {
                    return (
                      <MenuItem value={value.sub_id} key={key}>
                        {value.sub_desc.dispName}
                      </MenuItem>
                    );
                  })
                : null}
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
              {allData.allDepartment
                ? allData.allDepartment.map((value, key) => {
                    return (
                      <MenuItem value={value.dept_id} key={key}>
                        {value.dept_details.dispName}
                      </MenuItem>
                    );
                  })
                : null}
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
              {allData.allProgram
                ? allData.allProgram.map((value, key) => {
                    return (
                      <MenuItem value={value.prog_id} key={key}>
                        {value.prog_details.dispName}
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
              {allData.allSem
                ? allData.allSem.map((value, key) => {
                    return (
                      <MenuItem value={value.sem_id} key={key}>
                        {value.sem_desc.dispName}
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
              {allData.allCourse
                ? allData.allCourse.map((value, key) => {
                    return (
                      <MenuItem value={value.course_id} key={key}>
                        {value.course_details.dispName}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">Subject Type</InputLabel>
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
              {allData.allSubjectType
                ? allData.allSubjectType.map((value, key) => {
                    return (
                      <MenuItem value={value.subtype_id} key={key}>
                        {value.sub_type}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Faculty
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              autoWidth
              label="Faculty"
              value={data.faculty_id ? data.faculty_id : ""}
              onChange={(event) =>
                handleChangeData("faculty_id", event.target.value)
              }
              style={{ textAlign: "left" }}
            >
              <MenuItem>--Choose Faculty--</MenuItem>
              {allData.allFaculty
                ? allData.allFaculty.map((value, key) => {
                    return (
                      <MenuItem value={value.faculty_id} key={key}>
                        {value.roll_no}
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
              data.subjectType_id &&
              data.faculty_id
                ? false
                : true
            }
            onClick={() => updateDetails()}
          >
            Save
          </Button>
          <br></br>
          <br></br>
          {successful ? (
            <Alert severity="success">
              <AlertTitle>Success </AlertTitle>
              <strong> Details Updated !!</strong>
            </Alert>
          ) : null}
        </div>
      )}
    </div>
  );
}
