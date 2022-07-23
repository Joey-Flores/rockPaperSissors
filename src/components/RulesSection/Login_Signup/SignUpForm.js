import { useState } from "react";

import classes from "./SignUpForm.module.css";
import axios from "axios";

function SignUpForm(props) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPasswordReg, setConfirmPasswordReg] = useState("");
  const [message, setMessage] = useState("");

  const register = (e) => {
    e.preventDefault();
    if (passwordReg === confirmPasswordReg) {
      axios({
        method: "post",
        data: { username: usernameReg, password: passwordReg },
        withCredentials: true,
        url: "/register",
      }).then(function (res) {
        setMessage(res.data);
        if (res.data[0] === "User Created") {
          props.isLoggedIn();
          props.handleData(res.data[1]);
          props.handleClick();
        }
      });
    } else {
      setMessage("Passwords not matching");
    }
  };

  return (
    <div>
      <form className={classes.signUpForm}>
        <input
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
          type="text"
          id="username"
          placeholder="Enter Username"
        ></input>
        <input
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="Enter Password"
        ></input>
        <input
          onChange={(e) => {
            setConfirmPasswordReg(e.target.value);
          }}
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
        ></input>
        <p>{message}</p>
        <div className={classes.formButtons}>
          <button onClick={register} className={classes.signUpButton}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
