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

function RegisteredSubject(props) {
  const [selectedSubject, setSelectedSubject] = useState(props.selectedSubject);
  const [isEdit, setEdit] = React.useState(false);
  const [successful, setSuccessful] = useState(false);

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

    setEdit(true);
  };


  const updateSelectedSubject = () => {
    axios
      .get("preRegSubmit", {
        params: {
          person_id: cookies.get("userData").person_id,
          user_type: cookies.get("userData").user_type,
          selectedSubject: selectedSubject,
        },
      })
      .then((response) => {
        setSuccessful(true);
        setTimeout(() => {
          setSuccessful(false);
        }, 2000);
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
                  style={{ margin: "1%",width: "90%"}}
                  label="Subject"
                  disabled={false}
                  value={subject.sub_code + ` - ` + subject.sub_name}
                />
                <select name="type" disabled={true} className={classes.type1}>
                  <option value="Credit">Credit</option>
                  <option value="Audit">Audit</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisteredSubject;
