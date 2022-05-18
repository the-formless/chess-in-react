import Game from "./Game"
import { updateDoc } from "firebase/firestore";

function MultiplayerGame({chess, thisPlayer, docRef, playWith}) {
  const UpdateGame = (chessObj) => {
    // update game data online every move
    let fen = chessObj.fen();
    updateDoc(docRef, {
      'fen': fen
    });
  }
  return (
    <div>
      <Game chess={chess} thisPlayer={thisPlayer} updateGame={UpdateGame} mp={true}/>
      <p className="playerText">Playing with...: {(playWith)? playWith: "....loading"}</p>
    </div>
  )
}

export default MultiplayerGame