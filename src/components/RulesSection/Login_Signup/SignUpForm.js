import { useState } from "react";

import classes from "./SignUpForm.module.css";
import axios from "axios";

function SignUpForm(props) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    axios
      .post("/register", { username: usernameReg, password: passwordReg })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <form className={classes.signUpForm}>
        {/* <label htmlFor="username">Username:</label> */}
        <input
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
          type="text"
          id="username"
          placeholder="Username"
        ></input>
        {/* <label htmlFor="password">Password:</label> */}
        <input
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="Password"
        ></input>
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
