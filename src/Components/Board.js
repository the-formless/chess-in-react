import Square from "./Square"
import {populateWithPositions as populateBoard} from "./Dependencies/boardPopulator.js"


function Board({arr, game}) {
  let b = populateBoard(arr, game.flat());
  console.log(b);
  return (
    <div className='chessBoard'>
      {b.map((v, i) => <Square key={i} square={v.square} white={v.white} piece={v.piece}/>)}
    </div>
  )
}

export default Board