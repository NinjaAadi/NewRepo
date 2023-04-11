import React, { useState, useEffect } from "react";
// import Header from './Header/DesktopHeader/header';
import Sidebar from "./Header/DesktopHeader/sidebar";
import MHeader from "./Header/MobileHeader/MHeader"
// import Content from './Storyboard/Content';
import StudentDashboardDesktopContent from "./StudentDashboardDesktopContent";
import StudentDashboardMobileContent from "./StudentDashboardMobileContent";

function StudentDashboard() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 600);
  const [menu, setMenu] = useState(1);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const changeSideBarMenu = (menu) => {
    setMenu(menu);
  };

  return (
    <div>
      {isDesktop ? (
        <>
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
        </>
      ) : (
        <>
          <div>
            <div
              style={{
                zIndex: "2",
                position: "absolute",
                top: "0",
                left: "0"
              }}
            >
              <MHeader
                active={menu}
                getData={(menu) => changeSideBarMenu(menu)}
              />
            </div>
            <div
              style={{ zIndex: "1", position: "absolute", top: "8%", left: "0" }}
            >
              <StudentDashboardMobileContent menu={menu} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default StudentDashboard;
