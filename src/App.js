import { useState, useEffect } from "react";
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

  return (
    <div className={classes.App}>
      <TitleSection score={score} />
      <Link to="/start">
        <button className={classes.startButton}>START PLAYING</button>
      </Link>
      <Routes>
        <Route
          path="start"
          element={
            <GameSection
              helpScore={helpScore}
              gameStatus={gameStatus}
              setGameStatus={setGameStatus}
            />
          }
        />
      </Routes>
      <RulesSection logStatus={isLoggedIn} isLoggedIn={handleLoggedInStatus} />
    </div>
  );
}

export default App;
