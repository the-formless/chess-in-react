import Board from "./Board";
import {getChessBoardArray, getGameArray} from "./Dependencies/getBoardsArray.js";
import {useEffect, useState} from 'react';
import GameOver from "./GameOver";

function Game({chess, thisPlayer, updateGame, mp}) {

  const boardArray = getChessBoardArray(thisPlayer);          // gets corrct facing chess board based on player (black or white)
  const [gameArray, updateGameArray] = useState(getGameArray(chess, thisPlayer));       //store current game array
  const [currentMoves, setCurrentMoves] = useState([]);           //stores current possible moves after player clicks on a piece

  const [winner, setWinner] = useState('');
  const [gameOverText, setGameOverText] = useState('')

  let nextMoves = [];
  //update active box on every new click on the board
  useEffect(()=>{
    nextMoves = currentMoves.map((v) => {
      //manages castling on all sides(black and white)
      if(v.length > 2){
        let sq = v.match(/[a-h][1-8]|O-O-O|O-O/i)[0];
        if(sq === 'O-O-O'){
          return (chess.turn() === 'b')? 'c8' : 'c1';
        }
        if(sq === 'O-O'){
          return (chess.turn() === 'b')? 'g8' : 'g1';
        }
      }
      return (v.length > 2)? v.match(/[a-h][1-8]|O-O-O|O-O/i)[0] : v;
    });
  }, [currentMoves]);

  //updates the game board when chess object changes. (changing chess object is important for multiplayer)
  useEffect(() =>{
    updateGameArray(getGameArray(chess, thisPlayer));
  }, [chess]);

  //gets possible moves from chess.js api
  const moves = (square) => {
    return chess.moves(square);
  }

  //functionality for updating the game after every move
  const move = (square) => {
    console.log("Move to "+ square);
    chess.move(square);
    setCurrentMoves([]);
    updateGameArray(getGameArray(chess, thisPlayer));
    (mp) && updateGame(chess);
    checkGameOver(chess);
  }

  const restartGame = () =>{
    chess.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    setWinner("");
    setGameOverText("");
    updateGameArray(getGameArray(chess, thisPlayer));
  }

  const checkGameOver = (chess) => {
    if(chess.game_over()){
      setWinner((chess.turn() === 'w')? 'b' : 'w');
      if(chess.in_checkmate()){
        setGameOverText("Wins By Checkmate")
      }
      if(chess.in_draw()){
        setWinner(chess.turn());
        if(chess.insufficient_material()){
          setGameOverText("Draw due to insufficient material");
        }
        else {
          setGameOverText("Draw due to 50 move rule");
        }
      }
      if(chess.in_stalemate()){
        setGameOverText("Draw due to Stalemate");
      }
    }
  }

  const onBoardClick = (square) => {
    if(mp && chess.turn() === thisPlayer)
    {
      handleClick(square);
    }
    else if(!mp) {
      handleClick(square);
    }
  }

  function handleClick(square) {
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
      <Board arr={boardArray} game={gameArray} boardClick={onBoardClick} activeMoves={currentMoves} currentPlayer={chess.turn()}/>
      {
        (winner) && <GameOver winner={winner} gameOverText={gameOverText} restartGame={restartGame}/>
      }
    </div>
  );
}

export default Game