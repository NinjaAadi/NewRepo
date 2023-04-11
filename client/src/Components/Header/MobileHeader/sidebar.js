import React, { useState, useEffect } from "react";
import classes from "./sidebar.module.css";
import logo from "../../../assets/images/logo.svg";
import Grid from "@mui/material/Grid";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Button, Paper, Link, Box, IconButton } from "@mui/material";

function Sidebar(props) {
  const [activeState, setActive] = useState(1);
  useEffect(() => {
    setActive(props.active);
  }, [props]);
  let container1 = null;
  const updateActive = (active) => {
    setActive(active);
    props.getData(active);
  };

  container1 = (
    <div>
      <Paper elevation={3} className={classes.sidebarContainer}>
        <Grid>
          <img className={classes.logoStyle} src={logo} alt="logo"></img>
        </Grid>
        <Grid
          className={activeState === 1 ? classes.active : classes.deActive}
          onClick={() => updateActive(1)}
        >
          <Box>Dashboard </Box>
        </Grid>
        <Grid
          className={activeState === 2 ? classes.active : classes.deActive}
          onClick={() => updateActive(2)}
        >
          <Box>Student </Box>
        </Grid>
        <Grid
          className={activeState === 3 ? classes.active : classes.deActive}
          onClick={() => updateActive(3)}
        >
          <Box>Courses</Box>
        </Grid>
        <Grid
          className={activeState === 4 ? classes.active : classes.deActive}
          onClick={() => updateActive(4)}
        >
          <Box>Grades</Box>
        </Grid>
        <Grid
          className={activeState === 5 ? classes.active : classes.deActive}
          onClick={() => updateActive(5)}
        >
          <Box>Notice Board</Box>
        </Grid>
        <Grid
          className={activeState === 6 ? classes.active : classes.deActive}
          onClick={() => updateActive(6)}
        >
          <Box>Blogs</Box>
        </Grid>
        <Grid
          className={activeState === 7 ? classes.active : classes.deActive}
          onClick={() => updateActive(7)}
        >
          <Box>Ask Expert</Box>
        </Grid>
        <Grid
          className={activeState === 8 ? classes.active : classes.deActive}
          onClick={() => updateActive(8)}
        >
          <Box>IITP in News</Box>
        </Grid>
        <Grid
          className={activeState === 9 ? classes.active : classes.deActive}
          onClick={() => updateActive(9)}
        >
          <Box>Campus News</Box>
        </Grid>
      </Paper>
    </div>
  );

  return <div>{container1}</div>;
}

export default Sidebar;
