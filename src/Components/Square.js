import {getPieceImage} from "./Dependencies/pieceRetriever.js"

function Square({square, white, piece, active, onSquareClick}) {
  let c = 'square';

  if(white)
    c+=' light';
  if(active)
    c+=' active';
  const squareClick = () =>{
    onSquareClick({'square': square});
  }
  return (
    <div className={c} onClick={squareClick}>
      <p>{square}</p>
      {piece && <img src={getPieceImage(piece)} className="piece" alt={`image of ${piece}`}/>}
    </div>
  )
}

export default Square
