import React, { useState, useEffect } from "react";
// import Header from './Header/DesktopHeader/header';
import Sidebar from "./Header/DesktopHeader/sidebar";
import MHeader from "./Header/MobileHeader/MHeader";
// import Content from './Storyboard/Content';
import StudentDashboardDesktopContent from "./StudentDashboardDesktopContent";
import StudentDashboardMobileContent from "./StudentDashboardMobileContent";
import Classes from "./StudentDashboard.module.css";
import Footer from "../Components/Footer/Footer";

function StudentDashboard() {
  const [menu, setMenu] = useState(1);

  const changeSideBarMenu = (menu) => {
    setMenu(menu);
  };

  const [page, setPage] = useState(0);
  let container = null;

  const updatePage = (pageno) => {
    console.log(pageno);
    setPage(pageno);
  };

  return (
    <div>
      <div className={Classes.Desktop}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "20%" }}>
            <Sidebar
              active={menu}
              getData={(menu) => changeSideBarMenu(menu)}
            />
          </div>
          <div style={{ width: "80%" }}>
            <StudentDashboardDesktopContent menu={menu} />
          </div>
        </div>
        <Footer />
      </div>
      <div className={Classes.Mobile}>
        <div
          style={{
            zIndex: "2",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
          }}
        >
          <MHeader active={menu} getData={(menu) => changeSideBarMenu(menu)} />
        </div>
        <div
          style={{
            zIndex: "1",
            position: "absolute",
            top: "7%",
            left: "0",
            width: "100%",
          }}
        >
          <StudentDashboardMobileContent menu={menu} />
        </div>
      </div>
    </div>
  );
}
export default StudentDashboard;
