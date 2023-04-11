import React, { useState } from "react";
import classes from "./merged.module.css";
import TableContent from "./Table/TableContent";
import DashProfile from "./Cards/Dashprofile";
import NoticeBoard from "./NoticeBoard/NoticeBoard";
import ProfileButton from "./Buttons/ProfileButton";
import Main from "../Dashboard/Calendar/Main";
import DashboardButtons from "./CalenderButtons/DashboardButtons";
import SetCalender from "./SetYourCalender/SetCalender";
import StudentProfile from "../StudentProfile/DesktopViewProfile/StudentProfile";
import MViewProfileContainer from "../../Container/DashboardContainer/MViewProfileContainer";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Merged1 from "../PreReg/Merged";

export default function Merged() {
  const [page, setPage] = useState(0);
  let container = null;

  const updatePage = (pageno) => {
    // console.log(pageno);
    setPage(pageno);
  };

  if (!page) {
    container = (
      <div className={classes.alignment}>
        <div className={classes.styling}>
          <div className={classes.buttonCards}>
            <ProfileButton getData={(pageno) => updatePage(pageno)} />
            <DashProfile />
          </div>
          <div className={classes.textLine}>
            <div className={classes.style}>
              <TableContent />
            </div>
            <NoticeBoard />
          </div>
        </div>

        <div className={classes.calenderContainer}>
          <div className={classes.calender}>
            <SetCalender />
            <div style={{ marginTop: "5%", marginBottom: "5%" }}>
              <Paper elevation={4}>
                <Main />
              </Paper>
            </div>
          </div>
          <div className={classes.buttonContainer} style={{ marginTop: "5%" }}>
            <DashboardButtons getData={(pageno) => updatePage(pageno)} />
          </div>
        </div>
      </div>
    );
  } else if (page == 1) {
    
    container = (
      <>
        <div className={classes.Desktop}>
          <StudentProfile />
        </div>
        <div className={classes.Mobile}>
          <MViewProfileContainer />
        </div>
      </>
    );
  } else if (page == 5) {
    container = (
      <>
        <Merged1 />
      </>
    );
  }

  return <div>{container}</div>;
}
