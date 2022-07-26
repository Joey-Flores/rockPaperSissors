import { useState } from "react";
import classes from "./App.module.css";
import GameSection from "./components/GameSection/GameSection";
import RulesSection from "./components/RulesSection/RulesSection";
import TitleSection from "./components/TitleSection/TitleSection";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

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

  function sendResults() {
    console.log(userData._id);
    axios({
      method: "post",
      data: { score: gameStatus, id: userData._id },
      withCredentials: true,
      url: "/score",
    }).then((res) => console.log(res));
    setGameStatus("");
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
          sendResults={sendResults}
          handleStartButton={hideStartButton}
          helpScore={helpScore}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
          userData={userData}
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
