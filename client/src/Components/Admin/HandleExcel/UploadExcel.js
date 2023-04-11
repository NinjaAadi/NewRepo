import { useState } from "react";
// import { Data } from "./Components/Data";
import * as XLSX from "xlsx";
import classes from "./UploadExcel.module.css";
// import classes1 from "./bootstrap1.module.css"
import ProcessJson from "./ProcessJson.js";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { fontFamily, fontSize } from "@mui/system";

const cookies = new Cookies();

function UploadExcel() {
  const [successful, setSuccessful] = useState(false);

  const updateDatabase = (excelData) => {
    console.log(excelData);
    axios
      .post("/handleExcel", {
         
          person_id: cookies.get("userData").person_id,
          user_type: cookies.get("userData").user_type,
          excelData: excelData,
      })
      .then((response) => {
        console.log(response);
        setSuccessful(true);
        setTimeout(() => {
          setSuccessful(false);
        }, 5000);
      })
      .catch((e) => console.log(e));
  };

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select file");
    }
  };


  // submit function
  const handleSubmit = async (e) => {

    e.preventDefault();

      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      console.log(worksheet);
      const data = await XLSX.utils.sheet_to_json(worksheet);
      console.log(data)
      setExcelData(data);
      updateDatabase(data);

  };


  return (
    <div className="container">
      <div className={classes.form}>
        <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
          <label>
            <h3>Upload Excel file</h3>
          </label>
          <br></br>
          <div
            style={{
              fontSize: "large",
              margin: "2%",
              border: "lightgray solid 1px",
              textAlign: "left",
              padding: "1%",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <input
              type="file"
              className="form-control"
              onChange={handleFile}
              required
            ></input>
            {excelFileError && (
              <div className="text-danger" style={{ marginTop: 5 + "px" }}>
                {excelFileError}
              </div>
            )}
          </div>
          <br></br>
          <button
            style={{ fontSize: "medium", marginRight: "1%" }}
            type="submit"
            className="btn btn-success"
          >
            Submit
          </button>
        </form>
      </div>
      <br></br>
      {successful ? (
        <Alert severity="success">
          <AlertTitle>Success!!</AlertTitle>
          <strong>Student Data Uploaded Successfully</strong>
          <br />
        </Alert>
      ) : null}
    </div>
  );
}

export default UploadExcel;
