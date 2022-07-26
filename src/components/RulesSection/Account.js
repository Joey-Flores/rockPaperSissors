import { useState } from "react";
import styles from "./Account.module.css";
import FormModal from "./Login_Signup/FormModal";
import Logout from "./Login_Signup/Logout";

function Account(props) {
  const [showModal, setShowModal] = useState(false);

  function handleModalClick() {
    setShowModal((current) => !current);
  }

  return (
    <div className={styles.accountBg}>
      <div className={styles.accountContainer}>
        {showModal && (
          <FormModal
            handleData={props.handleData}
            isLoggedIn={props.isLoggedIn}
            handleClick={handleModalClick}
            handleAccountClick={props.handleClick}
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
        {props.logStatus && (
          <div>
            <h2>
              Games Played: <span>{props.userData.stats.totalGames}</span>
            </h2>
            <h2>
              Total Wins: <span>{props.userData.stats.totalWins}</span>
            </h2>
            <h2>
              Total Losses: <span>{props.userData.stats.totalLosses}</span>
            </h2>
            <h2>
              Total Tied: <span>{props.userData.stats.totalTies}</span>
            </h2>
          </div>
        )}
        {props.logStatus && <Logout isLoggedIn={props.isLoggedIn} />}
      </div>
    </div>
  );
}

export default Account;
