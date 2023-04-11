import React from 'react';
import Img1 from "../../assets/images/img1.png";
import Img2 from "../../assets/images/img2.png";

const CentralPanel = ()=>{
    return (
        <div style = {{display:'flex'}}>
            <div style = {{display:'flex', width:"67%", marginTop: "8%"}}>
                <img src = {Img1}  style = {{width:"50%", height: "70%"}}/>
                <img src = {Img2} style = {{width:"50%", height: "80%",}}/>
            </div>
            <div style = {{width:"30%"}}>
                <div style = {{height:250,border:'1px solid', borderRadius:'10%', margin: '20px 5px',backgroundImage:'linear-gradient(to right, rgb(0,176,240), rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255))'}}>
                    <div >
                        <h2>Eductaional Events</h2>
                    </div>
                </div>
                <div style = {{height:250,border:'1px solid', borderRadius:'10%',  margin: '20px 5px',backgroundImage:'linear-gradient(to right, rgb(237,124,49), rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255),rgb(255,255,255))'}}>
                    <div>
                        <h2>Sports & Cultural Events</h2>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default CentralPanel