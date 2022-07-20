import { useState, useEffect } from "react";
import classes from "./App.module.css";
import GameSection from "./components/GameSection/GameSection";
import RulesSection from "./components/RulesSection/RulesSection";
import TitleSection from "./components/TitleSection/TitleSection";

function App() {
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function helpScore() {
    if (gameStatus === "WIN") {
      setScore((prev) => prev + 1);
    } else if (gameStatus === "LOSE" && score > 0) {
      setScore(0);
    }
  }

  return (
    <div className={classes.App}>
      <TitleSection score={score} />
      <h1>{data}</h1>
      <GameSection
        helpScore={helpScore}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
      />
      <RulesSection />
    </div>
  );
}

export default App;
