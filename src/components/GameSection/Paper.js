import classes from "./Paper.module.css";
import paper from "../../images/icon-paper.svg";

function Paper(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`${classes.paper} ${classes.circle}`}
      id="paper"
    >
      <img id="paper" src={paper}></img>
    </div>
  );
}

export default Paper;
