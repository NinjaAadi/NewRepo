import React, { useState } from "react";
import classes from "./LandingPage.module.css";
import Button from "@mui/material/Button";

const Header = (props) => {
  let container = null;
  const goToLogin = () => {
    props.getData(true);
  };
  
  container = (
    <div>
      <div className={classes.HeaderContainer}>
        <ul className={classes.HeaderList}>
          <li>IIT Patna</li>
          <li>LinkedIn</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>Facebook</li>
          <li>YouTube</li>
          <li>
            <Button
              variant="outlined"
              style={{ backgroundColor: "#ffffff" }}
              onClick={() => goToLogin()}
            >
              {" "}
              Login{" "}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
  return <div>{container}</div>;
};

export default Header;
