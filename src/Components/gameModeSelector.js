import Button from "./Button"
import { Link } from "react-router-dom"

//initial screen component lets the player choose local/multiplayer

function GameModeSelector() {
  return (
    <div className="select-game-mode">
      <p>Select Game Mode:</p>
      <Link to={"/local"}><Button text={"Local"} /></Link>
      <Link to={"/multiplayer"}><Button text={"Multiplayer"} /></Link>
    </div>
  )
}

export default GameModeSelector