import { useState } from "react";
import classes from "./LoginForm.module.css";
import axios from "axios";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: { username: username, password: password },
      withCredentials: true,
      url: "/login",
    }).then(function (res) {
      setMessage(res.data);
      if (res.data[0] === "Successfully Authenticated") {
        props.isLoggedIn();
        props.handleData(res.data[1]);
        props.handleClick();
        props.handleAccountClick();
      }
    });
  };

  return (
    <>
      <form className={classes.loginForm}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          id="username"
          placeholder="Username"
        ></input>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          id="password"
          placeholder="Password"
        ></input>
        <p>{message}</p>
        <div className={classes.formButtons}>
          <button onClick={login} className={classes.loginButton}>
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
