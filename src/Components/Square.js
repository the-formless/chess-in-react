import {getPieceImage} from "./Dependencies/pieceRetriever.js"

function Square({square, white, piece}) {
  let c = 'square';
  if(white)
    c+=' light';
  const squareClick = () =>{
    console.log(getPieceImage(piece));
  }
  return (
    <div className={c} onClick={squareClick}>
      <p>{square}</p>
      {piece && <img src={getPieceImage(piece)} className="piece" alt={`image of ${piece}`}/>}
    </div>
  )
}

export default Square
