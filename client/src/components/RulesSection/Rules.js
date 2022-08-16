import classes from "./Rules.module.css";

import rules from "../../images/image-rules.svg";
import closeIcon from "../../images/icon-close.svg";

function Rules(props) {
  return (
    <>
      <div onClick={props.handleClick} className={classes.rulesContainer}>
        <h2>RULES</h2>
        <img src={rules}></img>
        <img src={closeIcon}></img>
      </div>
      <div onClick={props.handleClick} className={classes.lightBox}></div>
    </>
  );
}

export default Rules;
