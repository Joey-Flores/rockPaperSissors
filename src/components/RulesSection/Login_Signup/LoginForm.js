import classes from "./LoginForm.module.css";

function LoginForm() {
  return (
    <>
      <form className={classes.loginForm}>
        <h2>Login In</h2>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="example@email.com"></input>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="must be atleast 3 charecters"
        ></input>
        <div className={classes.formButtons}>
          <button className={classes.loginButton}>Login</button>
          <button className={classes.signUpButton}>Sign Up</button>
        </div>
      </form>
      <div onClick={props.handleClick} className={classes.lightBox}></div>
    </>
  );
}

export default LoginForm;
