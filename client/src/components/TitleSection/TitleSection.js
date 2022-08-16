import classes from "./TitleSection.module.css";

function TitleSection(props) {
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleText}>
        <h2>ROCK</h2>
        <h2>PAPER</h2>
        <h2>SCISSORS</h2>
      </div>
      <div className={classes.score}>
        <p>WIN STREAK</p>
        <span>{props.score}</span>
      </div>
    </div>
  );
}

export default TitleSection;
