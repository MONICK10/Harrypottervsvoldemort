import React, { useState } from "react";
import "./App.css";
import harryImg from "./harrypotter.png";
import voldemortImg from "./voldemort.png";

const questions = [
  { question: "5 + 3", answer: 8 },
  { question: "7 - 2", answer: 5 },
  { question: "6 * 2", answer: 12 },
  { question: "9 / 3", answer: 3 },
];

const Game = () => {
  const [player, setPlayer] = useState(null);
  const [power, setPower] = useState({ harry: 50, voldemort: 50 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [winner, setWinner] = useState(null);

  const handleAnswer = () => {
    const correctAnswer = questions[currentQuestion].answer;
    let newPower = { ...power };

    if (parseInt(userAnswer) === correctAnswer) {
      newPower[player] += 10;
    } else {
      newPower[player === "harry" ? "voldemort" : "harry"] += 10;
    }
    
    if (newPower.harry >= 100) {
      setWinner("Harry Wins! Voldemort is defeated.");
    } else if (newPower.voldemort >= 100) {
      setWinner("Voldemort Wins! Harry is defeated.");
    }
    
    setPower(newPower);
    setUserAnswer("");
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  if (!player) {
    return (
      <div className="character-selection">
        <h2>Choose Your Character</h2>
        <button onClick={() => setPlayer("harry")} className="harry-btn">Harry</button>
        <button onClick={() => setPlayer("voldemort")} className="voldemort-btn">Voldemort</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="battlefield">
        <img src={harryImg} alt="Harry Potter" className="character harry" style={{ opacity: power.harry / 100 }} />
        <img src={voldemortImg} alt="Voldemort" className="character voldemort" style={{ opacity: power.voldemort / 100 }} />
      </div>
      <div className="power-bars">
        <div className="power harry" style={{ width: `${power.harry}%` }}>Harry: {power.harry}%</div>
        <div className="power voldemort" style={{ width: `${power.voldemort}%` }}>Voldemort: {power.voldemort}%</div>
      </div>
      <div className="question-area">
        {winner ? (
          <h2>{winner}</h2>
        ) : (
          <>
            <h3>{questions[currentQuestion].question} = ?</h3>
            <input type="number" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
            <button onClick={handleAnswer}>Submit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
