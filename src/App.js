import Board from "./Components/Board";
import {chess} from "chess.js"
import { Chess } from "chess.js";

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
  const chess = new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const boardArray = getChessBoardArray();
  const gameArray = chess.board();
  return (
    <div className="App">
      <Board arr={boardArray} game={gameArray}/>
    </div>
  );
}

export default App;
