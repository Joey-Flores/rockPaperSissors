import { useState } from "react";
import Account from "./Account";
import FormModal from "./Login_Signup/FormModal";

import Rules from "./Rules";
import classes from "./RulesSection.module.css";

function RulesSection(props) {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [isAccountShown, setAccountShown] = useState(false);

  function handleRulesClick() {
    setIsRulesShown((current) => !current);
  }

  function handleAccountClick() {
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
