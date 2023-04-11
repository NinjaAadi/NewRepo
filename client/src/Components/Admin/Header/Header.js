import React from "react";
import classes from "./Header.module.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField } from "@mui/material";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from '@mui/material/Fade';
import Cookies from "universal-cookie";

const cookies = new Cookies();


const Header = (props) => {

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


  let container = null;

  container = (
    <div className={classes.upper}>
      <div className={classes.upperf}>
        <label className={classes.label}>User Role : Admin</label>
        <div className={classes.boxicon}>
          <div className={classes.box}>
            {/* <SearchIcon className={classes.search} /> */}
            <TextField
              id="standard-basic"
              label="Search Classes or People"
              variant="standard"
            />
          </div>
          <div className={classes.icons} style={{ display: "flex", padding: "10px" }}>
            <NotificationsIcon className={classes.seticon} />
            <MailIcon className={classes.seticon} />
            <Badge>
              <SettingsIcon className={classes.seticon} onClick={handleClick} />
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                  <MenuItem onClick={handleClose}>Settings</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Badge>

          </div>
        </div>
      </div>
    </div>
  );

  return <div>{container}</div>;
};

export default Header;
