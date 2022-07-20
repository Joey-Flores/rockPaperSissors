import { useState } from "react";
import FormModal from "./Login_Signup/FormModal";

import Rules from "./Rules";
import classes from "./RulesSection.module.css";

function RulesSection() {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [isSignUpShown, setIsSignUpShown] = useState(false);

  function handleRulesClick() {
    setIsRulesShown((current) => !current);
  }

  function handleSignUpFormClick() {
    setIsSignUpShown((current) => !current);
  }

  return (
    <div className={classes.rulesContainer}>
      <button onClick={handleRulesClick} className={classes.rulesButton}>
        RULES
      </button>
      {isRulesShown && <Rules handleClick={handleRulesClick} />}
      <div className={classes.account}>
        <button
          onClick={handleSignUpFormClick}
          className={classes.accountButton}
        >
          SIGN UP
        </button>
        {isSignUpShown && <FormModal handleClick={handleSignUpFormClick} />}
      </div>
    </div>
  );
}

export default RulesSection;
