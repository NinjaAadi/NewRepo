import React, { useState } from "react";
import Calendar from "react-calendar";
import {Paper} from "@mui/material"
import "./Main.css";

function Main() {
  const [value, onChange] = React.useState(new Date());

  return (
    
      <Calendar onChange={onChange} value={value} />
      
  );
}

export default Main;
