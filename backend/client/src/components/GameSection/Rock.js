import classes from "./Rock.module.css";
import rock from "../../images/icon-rock.svg";

function Rock(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`${classes.rock} ${classes.circle}`}
      id="rock"
    >
      <img id="rock" src={rock}></img>
    </div>
  );
}

export default Rock;
