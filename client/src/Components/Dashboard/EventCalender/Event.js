import React from 'react'
import Calender from "../Calendar/Main.js"
import classes from "./Event.module.css"

export default function Event() {
    return (
      <div>
        <div className={classes.ma}>
          <div className={classes.calender}>
            <h3 style={{ padding: "2%" }}>Event Calender</h3>
          </div>
          {/* <div className={classes.part}> */}
          {/* <div className={classes.partf}>
              <button className={classes.event}>Add an Event</button>
              <button className={classes.check}>Check Invites</button>
            </div> */}
          <div className={classes.bottomevent}>
            <div className={classes.parts} style={{ fontSize: "50%" }}>
              <div>
                <Calender />
              </div>
            </div>

            <div className={classes.evtbutton}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginBottom: "1%",
                  marginTop: "1%",
                }}
              >
                <button className={classes.hx1}>Popular Courses</button>
                <button className={classes.hx2}>Top Skill</button>
              </div>
              <div
                style={{ display: "flex", width: "100%", marginBottom: "1%" }}
              >
                <button className={classes.hx3}>
                  Cultural & Sports Societies
                </button>
                <button className={classes.hx4}>Gymkhana</button>
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <button className={classes.hx5}>Hostel</button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
}
