import Square from "./Square"
import {populateWithPositions as populateBoard} from "./Dependencies/boardPopulator.js"
import { useState, useEffect } from "react";

function Board({arr, game, boardClick, activeMoves}) {
  const [boardState, setBoardState] = useState(populateBoard(arr, game.flat(), activeMoves));

  //update board render on every move and new active possible moves
  useEffect(()=>{
    setBoardState(populateBoard(arr, game.flat(), activeMoves));
  }, [activeMoves, game]);

  return (
    <div className='chessBoard'>
      {boardState.map((v, i) => <Square key={i} square={v.square} white={v.white} piece={v.piece} active={v.active} onSquareClick={boardClick}/>)}
    </div>
  )
}

export default Board