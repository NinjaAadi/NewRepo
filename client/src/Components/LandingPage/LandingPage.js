import React, { useState, useEffect } from "react"
import Header from "./Header"
import LeftPanel from './LeftPanel'
import CentralPanel from './CentralPanel'
import classes from "./LandingPage.module.css"
import LoginContainer from "../../Container/LoginContainer/LoginContainer"
import DashboardContainer from "../../Container/DashboardContainer/DashboardContainer"
import Admin from "../Admin/Admin.js"
import Cookies from 'universal-cookie'
import Faculty from "../Faculty/Faculty.js"

const cookies = new Cookies();

 const LandingPage = ()=>{
   
    const [goLogin,setGoLogin] = useState(false);
    const [showDash,setShowDash] = useState(false);
    const changePage = async (resp)=>{
        console.log(resp);
         cookies.set('userData',{
            person_id:resp.person_id,
            user_type:resp.user_type
        }, { path: '/' });
        if(resp.user_type===1) setShowDash(true);
        setGoLogin(0);
    }
    
    let container = null;

    if(goLogin){
        container = (<LoginContainer getData = {(resp)=>changePage(resp)}/>)
    }
    
    // else if (goToDashBoard || cookies.get("userData")) {
    //   container = <DashboardContainer />;
    // } else if (goToAdmin || cookies.get("userData")) {
    //   container = <Admin />;
    // } 
    else if(showDash){
        container = <DashboardContainer />
    }
    else if(cookies.get("userData")) {
        if(cookies.get("userData").user_type==1) container = <DashboardContainer />;
        else if(cookies.get("userData").user_type==2) container = <Faculty/>
        else if(cookies.get("userData").user_type==3) container = <Admin />;
    }else {
      container = (
        <div>
          <div className={classes.FullHeaderContainer}>
            <div className={classes.LeftBarContainer}>
              <LeftPanel />
            </div>
            <div className={classes.RightBarContainer}>
              <div>
                <Header getData={(resp) => {
                  console.log(resp);
                  setGoLogin(resp);
                }} />
              </div>
              <div>
                <CentralPanel />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
     return (
         <div>
             {container}
         </div>
        
     )
 }

 export default LandingPage