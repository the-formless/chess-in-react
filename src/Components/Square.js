import React from 'react'

function Square({white}) {
  let c = 'square';
  if(white)
    c+=' light';
  console.log(c);
  return (
    <div className={c}></div>
  )
}

export default Square
