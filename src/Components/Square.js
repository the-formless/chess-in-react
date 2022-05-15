import React from 'react'

function Square({x, y, white}) {
  let c = 'square';
  if(white)
    c+=' light';

  const squareClick = () =>{
    console.log(`Clicked ${x} ${y}`);
  }
  return (
    <div className={c} onClick={squareClick}>{x+""+y}</div>
  )
}

export default Square
