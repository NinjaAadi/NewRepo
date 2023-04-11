import React,{useEffect} from "react";
// import StudentDashboard from "../../Components/Dashboard/StudentDashboard/StudentDashboard";
import Mview from "../../Components/StudentProfile/MobileViewProfile/Mview";
import Tabs from "../../Components/StudentProfile/MobileViewProfile/Tabs";

import axios from "../../axios.automate";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const MViewProfileContainer = () => {

    const [studentProfile, setStudentProfile] = React.useState(null);

    useEffect(() => {
      axios
        .get("/findStudent", {
          params: {
            rollno: cookies.get("userData").person_id,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setStudentProfile(response.data.data);
          // console.log(studentProfile)
        })
        .catch((e) => console.log(e));
    }, []);

    let container=null;
    if(studentProfile) {
        container = (
          <div>
            <Mview studentProfile={studentProfile}/> <Tabs studentProfile={studentProfile}/>
          </div>
        );
    }
  return (
    <div>
        {container}
    </div>
  );
};

export default MViewProfileContainer;
