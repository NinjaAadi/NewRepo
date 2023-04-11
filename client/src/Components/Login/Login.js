import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import classes from "./LoginStyles.module.css";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "../../axios.automate";
//import Spinner from 'react-spinner-material';
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import logo from "../../assets/images/logo.svg";
import ForgotPassword from "./forgotpassword";
import Spinner from "@mui/material/CircularProgress";
import Cookies from "universal-cookie";

// Type 1 for useName, type2 for password
const Login = (props) => {
  const [userName, setUserName] = useState({
    value: null,
    isValid: false,
  });
  const [password, setPassword] = useState({
    value: null,
    isValid: false,
  });


  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [goToForgetPassword, setGoToForgetPassword] = useState(false);
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    console.log("hi");
  }, []);

  const submitHandler = async () => {
    let valid = true;
    valid = valid && userName.isValid && password.isValid;
    //console.log('You clicked submit.');
    //props.getData(true);
    if (valid) {
      axios
        .post("http://localhost:5002/login/student", {
            email: userName.value,
            password: password.value,
        },{
          'content-type': 'application/json'
        })
        .then((response) => {
          console.log(response.data.user.person_id);
          setloading(false);
          props.getData(response.data.user);
          setUserCookie(response.data.user.person_id);
        })
        .catch((e) => {
          setError("Invalid Credentials");
          setTimeout(() => {
            setError(null);
          }, 2000);
          console.log(e);
        });
      
    }
  };
  const setUserCookie = async (user) => {
    const res = await axios.get(
      "http://localhost:5002/student_master/getByRollNo/" + user
    );
    const cookies = new Cookies();
    localStorage.setItem("userProfile", JSON.stringify(res.data.data[0]));
    console.log(localStorage.getItem("userProfile"));
  };
  const textFieldHandler = (data, type) => {
    /*console.log(data,type);*/
    if (type === 1) {
      if (data) {
        setUserName({
          value: data,
          isValid: true,
        });
      } else {
        setUserName({
          value: data,
          isValid: false,
        });
      }
    }
    if (type === 2) {
      if (data) {
        setPassword({
          value: data,
          isValid: true,
        });
      } else {
        setPassword({
          value: data,
          isValid: false,
        });
      }
    }
  };

  const goToForgotPassword = () => {
    setGoToForgetPassword(true);
  };

  let container = null;
  if (loading) {
    container = <Spinner />;
  } else if (goToForgetPassword) {
    container = <ForgotPassword />;
  } else {
    container = (
      <div className={classes.loginContainer}>
        <Grid>
          <Grid>
            <div>
              <h2 className={classes.textStyle1}>
                Welcome to IIT Patna Academic Portal
              </h2>
            </div>
            <div>
              <Paper
                style={{ height: "auto", marginRight: "3%", marginTop: "7%" }}
                className={classes.paperStyle}
              >
                <Grid align="center">
                  <img
                    className={classes.logoStyle}
                    src={logo}
                    alt="logo"
                  ></img>

                  <h3>Sign in</h3>
                </Grid>
                <TextField
                  className={classes.TypographytextStyle}
                  label="Username"
                  placeholder="Enter Username"
                  fullWidth
                  variant="outlined"
                  onChange={(event) => textFieldHandler(event.target.value, 1)}
                  style={{ margin: 5 }}
                />
                <TextField
                  className={classes.TypographytextStyle}
                  label="Passsword"
                  placeholder="Enter Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  onChange={(event) => textFieldHandler(event.target.value, 2)}
                  style={{ margin: 5 }}
                />
                <FormControlLabel
                  control={<Checkbox name="CheckedB" color="primary" />}
                  label="Remember me"
                />
                <Button
                  className={classes.btStyle}
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={() => submitHandler()}
                >
                  Sign In
                </Button>
                <br></br>
                {error != null ? (
                  <Alert
                    severity="success"
                    style={{ color: "red", fontSize: "smaller" }}
                  >
                    <AlertTitle>Invalid Credentials</AlertTitle>
                    {/* <strong>Invalid Credentials </strong> */}
                  </Alert>
                ) : null}
                {/* <p style={{ color: "red", fontSize: "smaller" }}>{error}</p> */}
                <Typography>
                  <Link
                    style={{ fontSize: "80%", padding: "5px 0px" }}
                    onClick={() => goToForgotPassword()}
                  >
                    Forgot password ?
                  </Link>
                </Typography>
                <Typography style={{ fontSize: "80%" }}>
                  {" "}
                  Do you have an account ?
                  <Link href="#" style={{ margin: "initial" }}>
                    Sign up
                  </Link>
                </Typography>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  return <div>{container}</div>;
};

export default Login;
