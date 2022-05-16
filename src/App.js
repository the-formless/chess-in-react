import Board from "./Components/Board";

function getChessBoardArray() {
  const files = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const boardArray = [];
  for(let i = 1; i <= 8; i++){
    const rank =[];
    for(let j = 1; j < files.length; j++){
      rank.push(files[j] + i);
    }
    boardArray.unshift(rank);
  }
  return boardArray;
}

function App() {
  const boardArray = getChessBoardArray();
  return (
    <div className="App">
      <Board arr={boardArray}/>
    </div>
  );
}

export default App;
