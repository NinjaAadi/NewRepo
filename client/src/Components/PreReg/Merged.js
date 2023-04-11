import React, { useState, useEffect } from "react";
import axios from "../../axios.automate";
import Cookies from "universal-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Bucket from "./Buckets/Bucket";
import SelectedSubject from "./SelectedSubject/SelectedSubject";
import RegisteredSubject from "./SelectedSubject/RegisteredSubject";
import { fabClasses } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import classes from "./merged.module.css";

const cookies = new Cookies();

export default function Merged() {
  const [loading, setLoading] = React.useState(false);
  const [preReg, setPreReg] = React.useState(null);
  const [selectedSubject, setSelectedSubject] = React.useState([]);
  const [electiveSubject, setElectiveSubject] = React.useState([[]]);
  const [bucketLength, setBucketLength] = React.useState([]);
  const [alreadyRegistered, setAlreadyRegistered] = React.useState(null);
  let bucket_length_array = [];

  const updateState = (electiveSubject) => {
    // console.log(electiveSubject);

    let subRemove = [];
    let electTemp = [...electiveSubject];

    electTemp.map((bucket) => {
      bucket.map((subject, index) => {
        if (subject.checked === true) {
          subRemove.push(subject);
          bucket.splice(index, 1);
        }
      });
    });

    subRemove.map((subject) => {
      selectedSubject.push({
        sub_id: subject.sub_id,
        sub_name: subject.sub_name,
        sub_code: subject.sub_code,
        subtype_id: subject.subtype_id,
        subtype_code: subject.subtype_code,
        bucket_name: subject.bucket_name,
        totalBuckets: subject.totalBuckets,
        isSelected: true,
      });
    });

    // console.log(selectedSubject)

    setElectiveSubject(electTemp);
    console.log(electiveSubject);
  };

  const updateState1 = (selectedSubject) => {
    let electAdd = [];
    let selectTemp = [...selectedSubject];

    selectTemp.map((subject, index) => {
      if (subject.isSelected === false) {
        // if delete button is clicked => means not selected (false)
        electAdd.push(subject);
        selectTemp.splice(index, 1);
      }
    });

    console.log(selectTemp);

    electAdd.map((elective) => {
      electiveSubject[elective.bucket_name - 1].push({
        sub_id: elective.sub_id,
        sub_name: elective.sub_name,
        sub_code: elective.sub_code,
        bucket_name: elective.bucket_name,
        subtype_id: elective.subtype_id,
        subtype_code: 4,
        checked: false,
        bucket_length: bucketLength[elective.bucket_name - 1],
      });
    });

    setSelectedSubject(selectTemp);
  };

  function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) arr[i] = [];

    return arr;
  }

  useEffect(() => {
    setLoading(true);
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const student_id = profile.student_id;
    console.log("hi");
    axios
      .get("http://localhost:5002/m_student_pre_reg/getSubject/" + student_id)
      .then((resp) => {
        console.clear();
        const response = resp.data;
        console.log("Response is ", response);
        setLoading(false);
        console.log(response.data);
        if (response.data.pre_registered == "yes") {
          setAlreadyRegistered(response.data);
          let rows = [];

          for (let i = 0; i < response.data.selected_subject.length; i++) {
            if (response.data.selected_subject[i]) {
              rows.push({
                sub_name: response.data.selected_subject[i].sub_name,
                sub_code: response.data.selected_subject[i].sub_code,
                bucket_name: null,
                isSelected: true,
              });
            }
          }

          console.log(rows);
          // console.log(rows);

          setSelectedSubject(rows);
        } else {
          setPreReg(response.data);
          console.log(response.data);
          let rows = [];

          //rows consist of compulsary subjects (not elective)
          for (let i = 0; i < response.data.total_sub_offered.length; i++) {
            if (response.data.total_sub_offered[i].subtype_code !== 4) {
              // console.log(response.data.total_sub_offered[i]);
              // console.log(rows);
              rows.push({
                sub_id: response.data.total_sub_offered[i].sub_id,
                sub_name: response.data.total_sub_offered[i].sub_name,
                sub_code: response.data.total_sub_offered[i].sub_code,
                subtype_id: response.data.total_sub_offered[i].subtype_id,
                subtype_code: response.data.total_sub_offered[i].subtype_code,
                bucket_name: null,
                totalBuckets: null,
                isSelected: true,
              });
              // setSelectedSubject(rows)
            }
          }

          console.log(rows);
          // console.log(rows);

          setSelectedSubject(rows);

          // console.log(response.data);

          /***** Count the number of buckets ******/
          let totalBucketsSet = new Set();

          for (let i = 0; i < response.data.elective_subjects.length; i++)
            totalBucketsSet.add(response.data.elective_subjects[i].bucket_name);

          let totalBuckets = totalBucketsSet.size;
          /***************************************/

          console.log(totalBucketsSet);

          let rows1 = Create2DArray(totalBuckets);
          // console.log(rows1)

          // console.log(response.data.elective_subjects.length);

          for (let i = 0; i < response.data.elective_subjects.length; i++)
            bucket_length_array[
              response.data.elective_subjects[i].bucket_name - 1
            ] = 0;

          for (let i = 0; i < response.data.elective_subjects.length; i++)
            bucket_length_array[
              response.data.elective_subjects[i].bucket_name - 1
            ]++;

          console.log(bucket_length_array);

          setBucketLength(bucket_length_array);

          for (let i = 0; i < response.data.elective_subjects.length; i++) {
            rows1[response.data.elective_subjects[i].bucket_name - 1].push({
              sub_id: response.data.elective_subjects[i].sub_id,
              sub_name: response.data.elective_subjects[i].sub_name,
              sub_code: response.data.elective_subjects[i].sub_code,
              subtype_id: response.data.elective_subjects[i].subtype_id,
              subtype_code: response.data.elective_subjects[i].subtype_code,
              bucket_name: response.data.elective_subjects[i].bucket_name,
              totalBuckets: totalBuckets,
              checked: false,
              bucket_length:
                bucket_length_array[
                  response.data.elective_subjects[i].bucket_name - 1
                ],
            });
            // rows1.push(...outerRows)
          }

          console.log(rows1);

          setElectiveSubject(rows1);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  let container = null;

  if (loading) {
    container = (
      <div style={{ margin: "10%" }}>
        {/* <CircularProgress /> */}
        <Alert severity="success">
          <AlertTitle>LOCKED !! </AlertTitle>
          <strong>You Cannot Register</strong>
        </Alert>
      </div>
    );
  } else if (preReg !== null) {
    console.log(preReg.total_sub_offered.length);
    console.log(electiveSubject);

    container = (
      <>
        <div className={classes.stylePage}>
          <div
            id="growth"
            style={{ overflow: "scroll", height: "40%" }}
            className={classes.stylingPage}
          >
            <Bucket
              electiveSubject={electiveSubject}
              getData={(electiveSubject) => updateState(electiveSubject)}
            />
          </div>
          <div className={classes.stylingPage}>
            <SelectedSubject
              selectedSubject={selectedSubject}
              getData={(selectedSubject) => updateState1(selectedSubject)}
            />
          </div>
        </div>
      </>
    );
  } else if (alreadyRegistered != null) {
    container = (
      <div>
        <RegisteredSubject selectedSubject={selectedSubject} />
      </div>
    );
  }

  return <div>{container}</div>;
}
