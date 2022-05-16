import React from 'react'

function Square({square, white, piece}) {
  let c = 'square';
  if(white)
    c+=' light';
  const squareClick = () =>{
    console.log(piece);
  }
  return (
    <div className={c} onClick={squareClick}>
      <p>{square}</p>
      {piece && <img src={piece} className="piece" alt={`image of ${piece}`}/>}
    </div>
  )
}

export default Square
