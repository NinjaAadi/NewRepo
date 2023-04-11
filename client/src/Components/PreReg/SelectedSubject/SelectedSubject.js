import React, { useState, useEffect } from "react";
import classes from "./SelectedSubject.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Chip from "@material-ui/core/Chip";
import { Grid, IconButton, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function SelectedSubject(props) {
  const [selectedSubject, setSelectedSubject] = useState(props.selectedSubject);
  const [isEdit, setEdit] = React.useState(false);
  const [register, setRegister] = React.useState(0);
  const [register1, setRegister1] = React.useState(1);
  const [successful, setSuccessful] = useState(false);

  console.log(props.selectedSubject);

  let finalSelected = props.selectedSubject;
  console.log(finalSelected);

  let total_buckets = 0;
  for (let i = 0; i < finalSelected.length; i++) {
    if (finalSelected[i].totalBuckets !== null) {
      total_buckets = finalSelected[i].totalBuckets;
      break;
    }
  }
  console.log(total_buckets);

  let sub_count = 0;
  for (let i = 0; i < finalSelected.length; i++) {
    if (finalSelected[i].subtype_code == 4) {
      sub_count++;
    }
  }
  console.log(sub_count);

  useEffect(() => {
    if (total_buckets !== 0 && sub_count !== 0 && total_buckets == sub_count) {
      console.log("MATCHED");
      setRegister(1);
    }
  });

  useEffect(() => {
    setSelectedSubject(props.selectedSubject);
  }, [props.selectedSubject]);

  const handleDelete = (index) => {
    console.log("clicked");

    let subjectTemp = [...selectedSubject];
    console.log(index);

    subjectTemp[index].isSelected = false;
    // setSelectedSubject(subjectTemp);
    props.getData(subjectTemp);

    setRegister(0);
    setEdit(true);
  };

  const updateSelectedSubject = async () => {
    console.log(selectedSubject);
    console.log(cookies.get("userData").person_id);
    const sem = await axios.get(
      "http://localhost:5002/m_student_sem_details/next_sem/" +
        cookies.get("userData").person_id
    );
    console.log(sem.data.data);
    console.log(selectedSubject);
    const sem_sub_details = {
      sem: [],
    };
    const semSubData = [];
    for (let i = 0; i < selectedSubject.length; i++) {
      semSubData.push({
        sub_id: selectedSubject[i].sub_id,
        subtype_id: selectedSubject[i].subtype_id,
      });
    }
    sem_sub_details.sem.push({
      sem_id: sem.data.data,
      subject: semSubData,
    });
    console.log(sem_sub_details);
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const student_id = profile.student_id;
    axios
      .post("http://localhost:5002/m_student_pre_reg/add", {
        student_id: student_id,
        person_id: cookies.get("userData").person_id,
        sem_sub_details: sem_sub_details,
      })
      .then((response) => {
        console.log(response);
        setSuccessful(true);
        setRegister1(0);
        setTimeout(() => {
          setSuccessful(false);
        }, 10000);
      })
      .catch((e) => console.log(e));
  };
  console.log(selectedSubject);

  return (
    <div>
      <div className={classes.selection}>
        <div className={classes.inerselect}>
          <label
            className={classes.label}
            style={{ color: "white", textAlign: "left" }}
          >
            Selected Subjects for Pre - Registration
          </label>
          <div className={classes.divider}>
            <p></p>
          </div>
          <div className={classes.subject}>
            {selectedSubject.map((subject, index) => (
              <div style={{ display: "flex" }} key={index}>
                <TextField
                  className={classes.sub}
                  style={{ margin: "2%", width: "85%" }}
                  label="Subject"
                  value={subject.sub_code + ` - ` + subject.sub_name}
                />
                <select name="type" disabled={true} className={classes.type1}>
                  <option value="Credit">Credit</option>
                  <option value="Audit">Audit</option>
                </select>
                <Grid pt={3} pl={1} pr={1}>
                  <Chip
                    variant="outlined"
                    disabled={
                      subject.subtype_code === 4 && register1 == 1
                        ? false
                        : true
                    }
                    onDelete={() => {
                      handleDelete(index);
                    }}
                    deleteIcon={
                      <IconButton pl={0}>
                        <DeleteIcon sx={{ color: "#009688" }} />
                      </IconButton>
                    }
                  />
                </Grid>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <SubmitData/> */}
      <Button
        style={{ borderRadius: "20px" }}
        variant="contained"
        // disabled={register && register1 == 1 ? false : true }
        onClick={() => updateSelectedSubject()}
      >
        REGISTER
      </Button>
      <br></br>
      <br></br>
      {successful ? (
        <Alert severity="success">
          <AlertTitle>Success </AlertTitle>
          <strong> REGISTERATION SUCCESSFUL !!</strong>
        </Alert>
      ) : null}
    </div>
  );
}

export default SelectedSubject;
