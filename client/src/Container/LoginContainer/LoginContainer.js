import React from "react";
import Login from "../../Components/Login/Login";

const LoginContainer = (props)=>{

    const responseToLandingPage = (resp)=>{
        props.getData(resp);
    }

    return (
        <div>
            <Login getData = {(resp)=>responseToLandingPage(resp)}/>
        </div>
    )
}

export default LoginContainer