import React from "react";
import "./AcadTable.module.css";
import TextField from "@mui/material/TextField";

function Table() {
  return (
    <div style={{ border: "gray solid 1px", margin: "1%" }}>
      <div class="initial">
        <input type="text" id="inp" value={"Announcement"}></input>

        <div class="cr" style={{ background: "#0070C0" }}></div>
        <input type="text" id="inpt" value={"Department"}></input>

        <div class="cr" style={{ background: "#FD8831" }}></div>
        <input type="text" id="inpt" value={"Academics"}></input>

        <div class="cr" style={{ background: "#DABCF8" }}></div>
        <input type="text" id="inpt" value={"R&D"}></input>

        <div class="cr" style={{ background: "#FD8831" }}></div>
        <input type="text" id="inpt" value={"Others"}></input>
      </div>

      <hr style={{ marginTop: "0%", width: "96%" }}></hr>
      <div className="textInput">
        <div class="first">
          <div class="colour" style={{ background: "#0070C0" }}></div>
          <input type="text" id="date" value={"Date & Views"}></input>
        </div>
        <input
          type="text"
          id="second"
          variant="standard"
          value="Announcement on event organized by Department"
        />
      </div>

      <div className="textInput">
        <div class="first">
          <div class="colour" style={{ background: "#FD8831" }}></div>
          <input type="text" id="date" value={"Date & Views"}></input>
        </div>
        <input
          type="text"
          id="second"
          variant="standard"
          value="Return to Campus post COVID19 – Guidelines"
        />
      </div>
      <div className="textInput">
        <div class="first">
          <div class="colour" style={{ background: "#FFC000" }}></div>
          <input type="text" id="date" value={"Date & Views"}></input>
        </div>
        <input
          type="text"
          id="second"
          variant="standard"
          value="End Semester Results"
        />
      </div>
      <div className="textInput">
        <div class="first">
          <div class="colour" style={{ background: "#FD8831" }}></div>
          <input type="text" id="date" value={"Date & Views"}></input>
        </div>
        <input
          type="text"
          id="second"
          value={"Hostel Affairs – Maintenance schedule"}
        />
      </div>
    </div>
  );
}
export default Table;
