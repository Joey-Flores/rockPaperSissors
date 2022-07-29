import { useState } from "react";
import Account from "./Account";

import Rules from "./Rules";
import classes from "./RulesSection.module.css";
import axios from "axios";

function RulesSection(props) {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [isAccountShown, setAccountShown] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(props.userData);

  function handleRulesClick() {
    setIsRulesShown((current) => !current);
  }

  async function handleAccountClick() {
    if (props.logStatus === true) {
      await axios({
        method: "get",
        withCredentials: true,
        url: "/account",
      }).then((res) => setUpdatedUserData(res.data));
    }
    setAccountShown((current) => !current);
  }

  return (
    <div className={classes.rulesContainer}>
      <button onClick={handleRulesClick} className={classes.rulesButton}>
        RULES
      </button>
      {isRulesShown && <Rules handleClick={handleRulesClick} />}
      <div className={classes.account}>
        <button onClick={handleAccountClick} className={classes.accountButton}>
          ACCOUNT
        </button>
        {isAccountShown && (
          <Account
            userData={updatedUserData}
            handleData={props.handleData}
            logStatus={props.logStatus}
            isLoggedIn={props.isLoggedIn}
            handleClick={handleAccountClick}
          />
        )}
      </div>
    </div>
  );
}

export default RulesSection;
