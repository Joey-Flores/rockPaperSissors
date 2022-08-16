import { useState, useEffect } from "react";
import classes from "./App.module.css";
import GameSection from "./components/GameSection/GameSection";
import RulesSection from "./components/RulesSection/RulesSection";
import TitleSection from "./components/TitleSection/TitleSection";
import axios from "axios";

function App() {
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      setIsLoggedIn(false);
    } else if (Object.keys(userData).length > 0) {
      setIsLoggedIn(true);
    }
  });

  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "/account",
    }).then((res) => setUserData(res.data));
  }, []);

  async function helpScore() {
    if (gameStatus === "WIN") {
      setScore((prev) => prev + 1);
    } else if (gameStatus === "LOSE" && score > 0) {
      setScore(0);
    }
  }

  function sendResults() {
    axios({
      method: "POST",
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
        isLoggedInStatus={isLoggedIn}
        handleData={handleData}
      />
    </div>
  );
}

export default App;
