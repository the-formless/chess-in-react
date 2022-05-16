import Board from "./Board";
import {getChessBoardArray, getGameArray} from "./Dependencies/getBoardsArray.js";
import {useEffect, useState} from 'react';

function Game({chess, thisPlayer}) {

  const boardArray = getChessBoardArray(thisPlayer);
  const [gameArray, updateGameArray] = useState(getGameArray(chess, thisPlayer));
  const [currentMoves, setCurrentMoves] = useState([]);

  let nextMoves = [];
  useEffect(()=>{
    nextMoves = currentMoves.map((v) => {
      //refactor this (doesnt include castling)
      return (v.length > 2)? v.match(/[a-h][1-8]|O-O-O|O-O/i)[0] : v;
    });
    console.log(nextMoves);
    console.log(currentMoves);
  }, [currentMoves]);

  const moves = (square) => {
    return chess.moves(square);
  }

  const move = (square) => {
    console.log("Move to "+ square);
    chess.move(square);
    updateGameArray(getGameArray(chess, thisPlayer));
    setCurrentMoves([]);
  }

  const onBoardClick = (square) => {
    if(nextMoves){
      let idx = nextMoves.indexOf(square.square);
      if(idx > -1)
        move(currentMoves[idx]);
      else
      setCurrentMoves(moves(square));
    }
    else{
      setCurrentMoves(moves(square));
    } 
  }
  

  return (
    <div className="Game">
      <Board arr={boardArray} game={gameArray} boardClick={onBoardClick} activeMoves={currentMoves}/>
    </div>
  );
}

export default Game