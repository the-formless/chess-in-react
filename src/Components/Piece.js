import React from 'react'

function Piece({x, y, name}) {
  const fileLocation = `../assets/chess pieces/${name}.svg`;
  return (
    <div className='piece'>
      <img src={fileLocation} alt={`Image of ${name}`} />
    </div>
  )
}

export default Piece