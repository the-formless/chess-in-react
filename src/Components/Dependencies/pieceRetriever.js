import * as getPiece from "./getPieceNames.js"

function getPieceImage(piece){

  const keyFuncs = {
    'r': getPiece.getRook(false),
    'n': getPiece.getNight(false),
    'b': getPiece.getBishop(false),
    'p': getPiece.getPawn(false),
    'q': getPiece.getQueen(false),
    'k': getPiece.getKing(false),
    'P': getPiece.getPawn(true),
    'R': getPiece.getRook(true),
    'N': getPiece.getNight(true),
    'B': getPiece.getBishop(true),
    'Q': getPiece.getQueen(true),
    'K': getPiece.getKing(true)
  }
  
  //console.log(keyFuncs[piece] + " log from retriever");
  return keyFuncs[piece];
}

export {getPieceImage};