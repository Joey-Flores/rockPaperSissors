import { useState } from "react";
import styles from "./Account.module.css";
import FormModal from "./Login_Signup/FormModal";
import Logout from "./Login_Signup/Logout";

function Account(props) {
  const [showModal, setShowModal] = useState(false);

  function handleModalClick(props) {
    setShowModal((current) => !current);
  }

  return (
    <div className={styles.accountBg}>
      <div className={styles.accountContainer}>
        {showModal && (
          <FormModal
            isLoggedIn={props.isLoggedIn}
            handleClick={handleModalClick}
          />
        )}
        <button onClick={props.handleClick}>Back</button>
        {!props.logStatus && (
          <>
            <h2>Sign in to see Account Stats</h2>
            <button
              onClick={handleModalClick}
              className={styles.signup_login_Button}
              type="button"
            >
              SignUp/Login
            </button>
          </>
        )}
        {props.logStatus && <Logout isLoggedIn={props.isLoggedIn} />}
      </div>
    </div>
  );
}

export default Account;
