import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage"
import Footer from "./Components/Footer/Footer"
import Calendar from "./Components/Dashboard/Calendar/Main"
import AcadStoryboard from "./Components/Dashboard/AcadStoryboard/Dash"
import Event from "./Components/Dashboard/EventCalender/Event"
import AcadTable from "./Components/Dashboard/AcadTable/AcadTable"
import DashProfile from "./Components/StudentDashboardprofile/Cards/Dashprofile"
import DesktopSProfile from "./Components/StudentProfile/DesktopViewProfile/StudentProfile.js"
import MobileSProfile from "./Components/StudentProfile/MobileViewProfile/Tabs.js"
import UserReg from "./Components/Admin/UserRegistration/UserRegistration"
import HandleExcel from "./Components/Admin/HandleExcel/UploadExcel"
import UserData from "./Components/Admin/AddUser/UserData.js"
import Admin from "./Components/Admin/Admin";
import Bucket from "./Components/PreReg/Buckets/Bucket.js"
import SelectedSubject from "./Components/PreReg/SelectedSubject/SelectedSubject";
import Merged from "./Components/PreReg/Merged";
import RegisteredSubject from "./Components/PreReg/SelectedSubject/RegisteredSubject";
import LeftPanel from "./Components/LandingPage/LeftPanel";
import DataInput from "./Components/Admin/DataInput";

function App() {
  return (
    <div className="App">
      <LandingPage />
      {/* <DataInput/> */}
      {/* <DashProfile /> */}
      {/* <Footer /> */}
      {/* <AcadStoryboard/>  */}
      {/* <Calendar/> */}
      {/* <Event/> */}
      {/* <AcadTable/> */}
      {/* <DesktopSProfile/> */}
      {/* <MobileSProfile/> */}
      {/* <RegisteredSubject/> */}
      {/* <UserReg/> */}
      {/* <HandleExcel /> */}
      {/* <Admin/> */}
      {/* <Bucket/> */}
      {/* <SelectedSubject/> */}
      {/* <Merged/> */}
      {/* <LeftPanel/> */}
    </div>
  );
}

export default App;
