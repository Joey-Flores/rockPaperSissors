import { useState } from "react";
import classes from "./App.module.css";
import GameSection from "./components/GameSection/GameSection";
import RulesSection from "./components/RulesSection/RulesSection";
import TitleSection from "./components/TitleSection/TitleSection";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState({});
  const [showStartButton, setShowStartButton] = useState(true);

  function helpScore() {
    if (gameStatus === "WIN") {
      setScore((prev) => prev + 1);
    } else if (gameStatus === "LOSE" && score > 0) {
      setScore(0);
    }
  }

  function handleLoggedInStatus() {
    setIsLoggedIn((current) => !current);
  }

  function handleData(data) {
    setUserData(data);
    console.log(data);
  }

  function hideStartButton() {
    setShowStartButton((current) => !current);
  }

  return (
    <div className={classes.App}>
      <TitleSection score={score} />
      {showStartButton && (
        <button onClick={hideStartButton} className={classes.startButton}>
          START PLAYING
        </button>
      )}
      {!showStartButton && isLoggedIn && (
        <GameSection
          handleStartButton={hideStartButton}
          helpScore={helpScore}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      )}
      {!showStartButton && !isLoggedIn && (
        <h1 className={classes.pleaseLoginText}>
          Please create an Account or Login to play
        </h1>
      )}
      <RulesSection
        userData={userData}
        logStatus={isLoggedIn}
        isLoggedIn={handleLoggedInStatus}
        handleData={handleData}
      />
    </div>
  );
}

export default App;
