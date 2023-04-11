import React from 'react'
import classes from "./AcadTable.module.css";
import TextField from '@mui/material/TextField';


function Table() {
    return (
        <div style={{border:'gray solid 1px',margin:'1%'}}>
        <div className={ classes.initial}>
         
        <input type='text' className={ classes.inp} value={"Announcement"} style={{border:'none'}}></input>
      
        <div className={classes.cr} style={{background:'#0070C0'}}></div>            
        <input type='text' className={ classes.inpt} value={"Department"}  style={{border:'none'}} ></input>

        <div className={classes.cr} style={{background:'#FD8831'}}></div> 
        <input type='text' className={ classes.inpt} value={"Academics"}  style={{border:'none'}} ></input>

        <div className={classes.cr} style={{background:'#DABCF8'}}></div>            
        <input type='text' className={ classes.inpt}  value={"R&D"}  style={{border:'none'}} ></input>

        <div className={classes.cr} style={{background:'#FD8831'}}></div> 
        <input type='text'  className={ classes.inpt} value={"Others"}  style={{border:'none'}}  ></input>
        
        </div>

        <hr style={{marginTop:'0%' ,width:'96%'}}></hr>
         <div className = {classes.textInput} >
        <div className={classes.first}>
         <div className={classes.colour} style={{background:'#0070C0'}}></div>            
         <input type='text' className={classes.date} value={"Date & Views"}  style={{border:'none'}}></input>
         </div>
         <input type='text' className={classes.second}  variant="standard"   value="Announcement on event organized by Department"  style={{border:'none'}} />
        </div>  
           
        <div className = {classes.textInput}>
             <div className={classes.first}>
         <div className={classes.colour} style={{background:'#FD8831'}}></div>            
         <input type='text' className={classes.date} value={"Date & Views"}  style={{border:'none'}}></input>
         </div>
         <input type='text' className={classes.second}  variant="standard"   value="Return to Campus post COVID19 – Guidelines"  style={{border:'none'}}/>
        </div>  
        <div className = {classes.textInput}>
             <div className={classes.first}>
         <div className={classes.colour} style={{background:'#FFC000'}}></div>            
         <input type='text' className={classes.date} value={"Date & Views"}  style={{border:'none'}}></input>
         </div>
         <input type='text' className={classes.second}  variant="standard"   value="End Semester Results"  style={{border:'none'}}/>
        </div>  
        <div className = {classes.textInput}>
             <div className={classes.first}>
         <div className={classes.colour} style={{background:'#FD8831'}}></div>            
         <input type='text' className={classes.date} value={"Date & Views"}  style={{border:'none'}}></input>
         </div>
         <input type='text' className={classes.second}  value={"Hostel Affairs – Maintenance schedule"} style={{border:'none'}}/>
        </div>  
    </div>
)
}
export default Table
