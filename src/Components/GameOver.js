import { Link } from "react-router-dom"

function GameOver({winner, gameOverText, restartGame}) {
  return (
    <div className="game-over">
      <p>Game Over</p>
      <p>
        {(winner === 'w')? "White" : "Black"}
        <br />
        {gameOverText}
      </p>
      <button className="btn" onClick={()=>restartGame()}>Play Again ?</button>
    </div>
  )
}

export default GameOver