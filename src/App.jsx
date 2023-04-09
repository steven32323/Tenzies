import "./App.css";
import Die from "./components/Die";

function App() {
  const diceArray = [];
  const allNewDice = () => {
    for (let diceNo = 0; diceNo < 10; diceNo++) {
      diceArray.push(Math.ceil(Math.random() * 6));
    }
    console.log(diceArray);
  };
  allNewDice();
  return (
    <main>
      <div className="container">
        <div className="dieContainer">
          {diceArray.map((die, index) => (
            <Die key={index} value={die} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
