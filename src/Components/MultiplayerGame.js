import Game from "./Game"

function MultiplayerGame({chess, thisPlayer, updateGame}) {
  return (
    <div>
      <Game chess={chess} thisPlayer={thisPlayer} updateGame={updateGame} mp={true}/>
    </div>
  )
}

export default MultiplayerGame