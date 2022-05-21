//returns an array based on 'player' if player is 'w'(white) returns array that will render with white at bottom else black
function getChessBoardArray(player) {
  const files = [null, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const boardArray = [];
  for(let i = 1; i <= 8; i++){
    const rank =[];
    for(let j = 1; j < files.length; j++){
      rank.push(files[j] + i);
    }
    if(player === 'w')
      boardArray.unshift(rank);
    else
      boardArray.push(rank);
  }
  return boardArray;
}
//returns current state of the game using chess.js api
function getGameArray(chessBoard, player) {
  return (player === 'w')? chessBoard.board() : chessBoard.board().reverse();
}

export {getChessBoardArray, getGameArray};