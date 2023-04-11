import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from '@mui/material/Fade';
import { Grid, TextField } from "@mui/material";
import axios from "../../../axios.automate";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Header = () => {
  const [userData, setUserData] = useState({
    name: "",
    roll: "",
  }); // we are initializing the use state. here userData is a state variable and  setUserData is a function which update the value of userData.

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout() {
    handleClose()
    cookies.remove("userData")
    window.location.reload(false);
  }


  useEffect(() => {
    axios
      .get("/header", {
        params: {
          person_id: cookies.get("userData").person_id,
          user_type: cookies.get("userData").user_type,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.data);

        setUserData({
          name: response.data.data.student_desc.personal_info.name.value,
          roll: response.data.data.student_desc.personal_info.roll.value,
        });
      })
      .catch((e) => console.log(e));
  }, []);



  let container = null;
  if (userData) {
    container = (
      <Grid style={{ display: "flex", alignItems: "center" }}>
        <Toolbar className={classes.col} style={{ margin: "10px" }}>
          <div className={classes.profile}>
            <AccountCircleIcon style={{ fontSize: "300%" }} />
          </div>
          <div className={classes.profile}>
            <h3 style={{ marginBottom: "0px" }}>{userData.name}</h3>
            <h4
              style={{
                marginTop: "1px",
              }}
            >
              {userData.roll}
            </h4>
          </div>
        </Toolbar>
        <Toolbar
          style={{
            width: "100%",
            backgroundImage: "linear-gradient(to right, green, blue, purple)",
            height: "fit-content",
            borderRadius: 35,
          }}
        >
          <div
            style={{
              width: "30%",
              display: "flex",
              alignItems: "flex-end",
              backgroundColor: "white",
              borderRadius: 35,
            }}
          >
            <SearchIcon style={{ padding: "10px 10px 5px 10px" }} />
            <TextField
              id="standard-basic"
              label="Search"
              variant="standard"
              style={{ width: "60%" }}
            />
          </div>
          <div style={{ width: "70%", textAlign: "end" }}>
            <Badge>
              <NotificationsIcon
                style={{
                  padding: "5px",
                  backgroundColor: "whitesmoke",
                  borderRadius: "50px",
                  marginLeft: "7px",
                }}
              />
            </Badge>
            <Badge>
              <MailOutlineIcon
                style={{
                  padding: "5px",
                  backgroundColor: "whitesmoke",
                  borderRadius: "50px",
                  marginLeft: "7px",
                }}
              />
            </Badge>
            <Badge>
              <SettingsIcon
                style={{
                  padding: "5px",
                  backgroundColor: "whitesmoke",
                  borderRadius: "50px",
                  marginLeft: "7px",
                }}
                onClick={handleClick}
              />
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </Badge>
          </div>
        </Toolbar>
      </Grid>
    );
  }
  return <div>{container}</div>;
};

export default Header;
