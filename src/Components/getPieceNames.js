import bishopB from "../assets/chess pieces/bishop_black.svg"
import rookB from "../assets/chess pieces/rook_black.svg"
import nightB from "../assets/chess pieces/night_black.svg"
import queenB from "../assets/chess pieces/queen_black.svg"
import kingB from "../assets/chess pieces/king_black.svg"
import pawnB from "../assets/chess pieces/pawn_black.svg"

import bishopW from "../assets/chess pieces/bishop_white.svg"
import rookW from "../assets/chess pieces/rook_white.svg"
import nightW from "../assets/chess pieces/night_white.svg"
import queenW from "../assets/chess pieces/queen_white.svg"
import kingW from "../assets/chess pieces/king_white.svg"
import pawnW from "../assets/chess pieces/pawn_white.svg"

function getPawn(white){
  return (white)? pawnW: pawnB;
}
function getQueen(white){
  return (white)? queenW: queenB;
}
function getKing(white){
  return (white)? kingW: kingB;
}
function getBishop(white){
  return (white)? bishopW: bishopB;
}
function getNight(white){
  return (white)? nightW: nightB;
}
function getRook(white){
  return (white)? rookW: rookB;
}

export {getBishop, getKing, getNight, getPawn, getQueen, getRook};