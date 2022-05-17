import Button from "./Button"

function GameModeSelector({handleClick}) {
  return (
    <div className="select-game-mode">
      <p>Select Game Mode:</p>
      <Button text={"Local"} onClick={handleClick} />
      <Button text={"Multiplayer"} onClick={handleClick} />
    </div>
  )
}

export default GameModeSelector