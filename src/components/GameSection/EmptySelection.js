import classes from "./EmptySelection.module.css";

function EmptySelection() {
  return (
    <div className={`${classes.paper} ${classes.circle}`} id="">
      <div className={classes.loader}></div>
    </div>
  );
}

export default EmptySelection;
