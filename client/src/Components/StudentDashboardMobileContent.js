import React,{useEffect} from "react";
import MHeader from "./Header/MobileHeader/MHeader";
// import Content from "./Storyboard/Content";
import Mview from "./StudentProfile/MobileViewProfile/Mview";
import Tabs from "./StudentProfile/MobileViewProfile/Tabs";
import MViewProfileContainer from "../Container/DashboardContainer/MViewProfileContainer";
import AcadTable from "./Dashboard/AcadTable/AcadTable";
import Merged from "./StudentDashboardprofile/Merged";
import Event from "./Dashboard/EventCalender/Event";
import Dash from "./Dashboard/AcadStoryboard/Dash";

const StudentDashboardMobileContent = (props) => {

  let container = null;
  
  if (props.menu === 1) {
    container = (
      <div>
        <div style={{ width: "100%" }}>
          <Dash />
        </div>
        <hr style={{ margin: "2%" }} />
        <div style={{ width: "100%", marginTop: "2%" }}>
          <Event />
        </div>
        <hr style={{ margin: "2%" }} />
        <AcadTable />
      </div>
    );
  } else if (props.menu === 2) {
    container = (
      <>
        <Merged />
        {/* <MViewProfileContainer /> */}
      </>
    );
  } else if (props.menu === 3) {
    container = (
      <>
        {/* <Merged /> */}
      </>
    );
  }
    return (
      <div>
        {/* <MHeader/> */}
        {container}
      </div>
    );
};
export default StudentDashboardMobileContent;
