import { useState, useEffect } from "react";

import classes from "./GameSection.module.css";
import Rock from "./Rock";
import Paper from "./Paper";
import Scissors from "./Scissors";
import EmptySelection from "./EmptySelection";

function GameSection(props) {
  const [selected, setSelected] = useState("");
  const [randomSign, setRandomSign] = useState("");
  const [showSelected, setShowSelected] = useState(false);

  useEffect(() => {
    handleGameStatus();
  }, [randomSign]);

  async function handleClick(e) {
    setSelected(e.target.id);
    setShowSelected((current) => !current);
    props.setGameStatus("");
    setRandomSign("");
    // props.helpScore();
    await getRandomSign();
  }

  function handleSelect() {
    setShowSelected((current) => !current);
    props.setGameStatus("");
    setRandomSign("");
    props.helpScore();
    props.handleStartButton();
  }

  async function getRandomSign() {
    setTimeout(() => {
      const signs = ["rock", "paper", "scissors"];
      const randomIndex = Math.floor(Math.random() * signs.length);
      const randomSelection = signs[randomIndex];
      setRandomSign(randomSelection);
    }, 2000);
  }

  function handleGameStatus() {
    if (selected === randomSign) {
      props.setGameStatus("TIED");
    } else if (
      (selected === "scissors" && randomSign === "rock") ||
      (selected === "rock" && randomSign === "paper") ||
      (selected === "paper" && randomSign === "scissors")
    ) {
      props.setGameStatus("LOSE");
    } else if (
      (selected === "scissors" && randomSign === "paper") ||
      (selected === "rock" && randomSign === "scissors") ||
      (selected === "paper" && randomSign === "rock")
    ) {
      props.setGameStatus("WIN");
    }
  }

  function handleSubmitButton() {
    handleSelect();
    props.sendResults();
  }

  return (
    <div className={classes.gameSectionContainer}>
      {!showSelected && (
        <>
          <div className={classes.topRow}>
            <Paper handleClick={handleClick} />
            <Scissors handleClick={handleClick} />
            <div className={classes.transparentLine}></div>
          </div>
          <div className={classes.bottomRow}>
            <Rock handleClick={handleClick} />
            <div className={classes.transparentLine}></div>
            <div className={classes.transparentLine}></div>
          </div>
        </>
      )}
      {showSelected && (
        <>
          <div className={classes.topRow}>
            {selected === "paper" && <Paper />}
            {selected === "scissors" && <Scissors />}
            {selected === "rock" && <Rock />}

            {!randomSign && <EmptySelection />}
            {randomSign === "paper" && <Paper />}
            {randomSign === "scissors" && <Scissors />}
            {randomSign === "rock" && <Rock />}
          </div>
          <div className={classes.bottomRowText}>
            <p>{props.userData.username.toUpperCase()} PICKED</p>
            <p>THE HOUSE PICKED</p>
          </div>
          {randomSign && (
            <div className={classes.bottomRowDecision}>
              <h1>YOU {props.gameStatus}</h1>
              <button onClick={handleSubmitButton}>PLAY AGAIN</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GameSection;
