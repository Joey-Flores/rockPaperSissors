import styles from "./Selector.module.css";

function Selector() {
  return (
    <div className={styles.sliderControls}>
      <input
        type="radio"
        name="slider"
        className={styles.radioLogin}
        id="login"
        defaultChecked
      ></input>
      <input
        type="radio"
        name="slider"
        className={styles.radioSignup}
        id="signup"
      ></input>
      <label htmlFor="login" className={`${styles.slide} ${styles.login}`}>
        Login
      </label>
      <label htmlFor="signup" className={`${styles.slide} ${styles.signup}`}>
        SignUp
      </label>
      <div className={styles.slideTab}></div>
    </div>
  );
}

export default Selector;
