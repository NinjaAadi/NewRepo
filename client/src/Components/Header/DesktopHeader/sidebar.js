import React,{useState,useEffect} from "react";
import classes from './sidebar.module.css';
import logo from '../../../assets/images/logo.svg'; 
import Grid from '@mui/material/Grid';
import { Button, Paper, Link, Box } from "@mui/material";

function Sidebar(props) {
  const [activeState,setActive] = useState(1);
  useEffect(()=>{
    setActive(props.active);
  },[props])
  let container = null;
  const updateActive = (active)=>{
    setActive(active);
    props.getData(active);
  }
  container = (
    <div>
      <Paper elevation={16} className={classes.sidebarContainer}>
        <Grid>
          <img className={classes.logoStyle} src={logo} alt='logo'></img>
        </Grid>
        <Grid  onClick = {()=>updateActive(1)}>
          <Box className = {(activeState === 1)? (classes.active):(classes.deActive)}>
            Dashboard
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(2)}>
          <Box className = {(activeState === 2)? (classes.active):(classes.deActive)}>
            Student
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(3)}>
          <Box className = {(activeState === 3)? (classes.active):(classes.deActive)}>
            Courses
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(4)}>
          <Box className = {(activeState === 4)? (classes.active):(classes.deActive)}>
            Grades
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(5)}>
          <Box className = {(activeState === 5)? (classes.active):(classes.deActive)}>
            Notice Board
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(6)}>
          <Box className = {(activeState === 6)? (classes.active):(classes.deActive)}>
            Blogs
          </Box>
        </Grid> 
        <Grid  onClick = {()=>updateActive(7)}>
          <Box className = {(activeState === 7)? (classes.active):(classes.deActive)}>
            Ask Expert
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(8)}>
          <Box className = {(activeState === 8)? (classes.active):(classes.deActive)}>
            IITP in News
          </Box>
        </Grid>
        <Grid  onClick = {()=>updateActive(9)}>
          <Box className = {(activeState === 9)? (classes.active):(classes.deActive)}>
            Campus News
          </Box>
        </Grid>
        
      </Paper>
    </div>
  )
  return (
    <div>
      {container}
    </div>
  );
}

export default Sidebar;