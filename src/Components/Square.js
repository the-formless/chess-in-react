import {getPieceImage} from "./Dependencies/pieceRetriever.js"

function Square({square, white, piece, active, onSquareClick}) {
  let c = 'square';

  if(white)
    c+=' light';    //marks white squares
  if(active)
    c+=' active';   //gives green border for active moves
  const squareClick = () =>{
    onSquareClick({'square': square});
  }
  return (
    <div className={c} onClick={squareClick}>
      <p>{/*square*/}</p>
      {piece && <img src={getPieceImage(piece)} className="piece" alt={`Thie piece of ${piece}`}/>}
    </div>
  )
}

export default Square
