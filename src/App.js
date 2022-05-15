import Board from "./Components/Board";

function App() {
  const boardArray = [];
  for(let i = 0; i < 8; i++){
    const newRow =[];
    for(let j = 0; j < 8; j++){
      newRow.push({'x': i, 'y': j});
    }
    boardArray.push(newRow);
  }
  return (
    <div className="App">
      <Board arr={boardArray}/>
    </div>
  );
}

export default App;
