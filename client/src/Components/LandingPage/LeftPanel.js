import React from 'react';
import logoImg from "../../assets/images/logo.svg" 
import classes from "./LandingPage.module.css"

const LeftPanel = ()=>{
    let container = null;
    container = (
        <div style= {{padding:10}}>
            <div>
                <img src = {logoImg} style = {{width:150}}/>
            </div>
            <div className = {classes.LeftOption}>
                <ul>
                    <li>
                        Quick Links
                    </li>
                    <li>
                        History of patna
                    </li>
                    <li>
                        e-Library
                    </li>
                    <li>
                        Examinations
                    </li>
                    <li>
                        Results
                    </li>
                    <li>
                        Webmail
                    </li>
                    <li>
                        Research
                    </li>
                </ul>
            </div>
        </div>
    )
    return (
        <div>
            {container}
        </div>
    )
}

export default LeftPanel