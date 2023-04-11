import React from "react";
import Header from "./Header/DesktopHeader/header";
// import Content from "../StudentDashboard/Storyboard/Content";
import StudentProfile from "./StudentProfile/DesktopViewProfile/StudentProfile";
import AcadTable from "./Dashboard/AcadTable/AcadTable";
import Merged from "./StudentDashboardprofile/Merged";
import Event from "./Dashboard/EventCalender/Event";
import Dash from "./Dashboard/AcadStoryboard/Dash";


const StudentDashboardDesktopContent = (props) => {
  let container = null;
  if (props.menu === 1) {
    container = (
      <div>
        <div style={{ display: "flex"}}>
          <div style={{ width: "70%" }}>
            <div
              style={{
                marginRight: "2%",
                marginLeft: "2%"
              }}
            >
              <Dash />
            </div>
          </div>
          <div style={{ width: "30%" }}>
            <div
              style={{
                marginRight: "2%",
                marginTop: "4%"
              }}
            >
              <Event />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "4%",
            marginLeft: "1%"
          }}
        >
          <AcadTable />
        </div>
      </div>
    );
  } else if (props.menu === 2) {
    container = <Merged />;
    // container = <StudentProfile />;
  }
  else if(props.menu === 3) {
    // container = <Merged />;
  }
  return (
    <div>
      <Header />
      {container}
    </div>
  );
};

export default StudentDashboardDesktopContent;
