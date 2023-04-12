import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

function App() {
  const [diceArray, setDiceArray] = useState([]);
  const [tenzies, setTenzies] = useState(false);
  const [scoreCounter, setScoreCounter] = useState(0);
  const [highScore, setHighScore] = useState(
    JSON.parse(localStorage.getItem("highScore" || 0))
  );

  //helper function for generating new dice
  const generateNewDie = () => {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  };

  const allNewDice = () => {
    const newDiceArray = [];
    for (let diceNo = 0; diceNo < 10; diceNo++) {
      newDiceArray.push(generateNewDie());
    }
    setDiceArray(newDiceArray);
    return newDiceArray;
  };

  // changes state of dice, from held to unheld, and vice versa
  const holdDice = (id) => {
    const updatedArray = diceArray.map((die) =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    );
    setDiceArray(updatedArray);
  };
  useEffect(() => {
    allNewDice();
  }, []);

  // handles starting a new game and storing "high" scores
  const newGameHandler = () => {
    if (tenzies) {
      if (!highScore || highScore > scoreCounter) {
        setHighScore(scoreCounter);
        localStorage.setItem("highScore", JSON.stringify(scoreCounter));
      }
      setDiceArray(allNewDice());
      setTenzies(false);
      setScoreCounter(0);
    }
  };

  function rollDice() {
    const rerolledDice = diceArray.map((die) =>
      die.isHeld ? die : generateNewDie()
    );
    setDiceArray(rerolledDice);
    setScoreCounter((prevCount) => prevCount + 1);
  }

  // win condition checker
  useEffect(() => {
    const dieValue = diceArray[1];
    let counter = 0;
    diceArray.map((die) =>
      die.isHeld && die.value === dieValue.value ? counter++ : ""
    );
    counter === 10 ? setTenzies(true) : "";
  }, [diceArray, tenzies]);

  const diceElements = diceArray.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      <div className="container">
        <span>High Score:{highScore}</span>
        <span>Current Score: {scoreCounter}</span>
        {tenzies && <Confetti />}
        <div>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dieContainer">{diceElements}</div>
        <button type="button" onClick={tenzies ? newGameHandler : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
