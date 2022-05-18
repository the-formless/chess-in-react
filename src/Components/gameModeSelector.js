import Button from "./Button"
import { Routes, Route, Link } from "react-router-dom"

function GameModeSelector({handleClick}) {
  return (
    <div className="select-game-mode">
      <p>Select Game Mode:</p>
      <Button text={"Local"} link={"/local"} />
      <Button text={"Multiplayer"} link={"/multiplayer"} />
    </div>
  )
}

export default GameModeSelector