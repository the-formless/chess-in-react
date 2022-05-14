import Board from "./Components/Board";

function App() {

  const boardArray = Array(64);
  for(let i = 0; i < boardArray.length; i++){
    boardArray[i] = i;
  }

  return (
    <div className="App">
      <Board arr={boardArray}/>
    </div>
  );
}

export default App;
