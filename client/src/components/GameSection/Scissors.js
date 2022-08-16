import classes from "./Scissors.module.css";
import scissors from "../../images/icon-scissors.svg";

function Scissors(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`${classes.scissors} ${classes.circle}`}
      id="scissors"
    >
      <img id="scissors" src={scissors}></img>
    </div>
  );
}

export default Scissors;
