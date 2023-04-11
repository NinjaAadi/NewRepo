import React, { useEffect, useState } from "react";
import classes from "./Bucket.module.css";
import { Grid, TextField } from "@mui/material";
import { positions, textAlign } from "@mui/system";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Bucket(props) {
  console.log(props.electiveSubject);

  const [electiveSubject, setElectiveSubject] = useState(props.electiveSubject);
  const [successful, setSuccessful] = useState(false);
  const [isEdit, setEdit] = React.useState(false);

  useEffect(() => {
    setElectiveSubject(props.electiveSubject);
    // setEdit(false)
  }, [props.electiveSubject]);

  const clickedSubjectHandler = (bucketNo, clickedIndex) => {
    console.log(bucketNo);
    console.log(clickedIndex);

    let electTemp = [...electiveSubject];
    // console.log(electTemp);

    electTemp[bucketNo].map((item) => {
      item.checked = false;
    });

    electTemp[bucketNo][clickedIndex].checked = true;

    let subChecked = 0;

    electTemp.map((bucket) => {
      bucket.map((subject) => {
        if (subject.checked) subChecked++;
      });
    });

    setEdit(true);
    console.log(electTemp);

    setElectiveSubject(electTemp);
  };

  const updateElectiveSubject = () => {
    console.log(electiveSubject);
    props.getData(electiveSubject);
    setSuccessful(true);
    setEdit(false);
    setTimeout(() => {
      setSuccessful(false);
    }, 2000);
  };

  return (
    <div>
      <div className={classes.selection}>
        {electiveSubject.map((bucket, index1) => (
          <div className={classes.innerbuck} key={index1}>
            <label className={classes.label}> Bucket {index1 + 1} </label>
            <div className={classes.divider}>
              <p></p>
            </div>
            {electiveSubject[index1].map((subject, index2) => (
              <div className={classes.subject} key={index2}>
                <div style={{ display: "flex" }}>
                  <TextField
                    className={classes.sub}
                    style={{ margin: "2%", width: "90%" }}
                    label="Subject"
                    value={subject.sub_code + ` - ` + subject.sub_name}
                  />
                  {console.log(bucket.length)}
                  <Checkbox
                    onChange={() => clickedSubjectHandler(index1, index2)}
                    checked={subject.checked}
                    disabled={
                      subject.bucket_length === bucket.length ? false : true
                    }
                    // onClick={handleChecked}
                    // disabled={true}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button
        style={{ borderRadius: "20px" }}
        variant="contained"
        // style={{ marginTop: "4%" }}
        disabled={!isEdit}
        onClick={() => updateElectiveSubject()}
      >
        SAVE
      </Button>
      <br></br>
      <br></br>
      {successful ? (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          <strong>Subject Selected Successfully</strong>
        </Alert>
      ) : null}
    </div>
  );
}

export default Bucket;
