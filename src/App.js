import Game from "./Components/Game";
import GameModeSelector from "./Components/gameModeSelector";
import {Chess} from "chess.js"
import {MultiplayerAuth} from "./Components/MultiplayerAuth";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { FirebaseAppProvider } from 'reactfire';


function App() {
  const chess =new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

  const [thisPlayer, setThisPlayer] = useState('w');
  const [local, setLocal] = useState(false);
  const [mp, setMp] = useState(false);

  const [onlineUser, setOnlineUser] = useState(null);

  function UpdateOnlineUser(user) {
    setOnlineUser(user);
    if(!user){
      setLocal(false);
      setMp(false);
    }
    console.log(user);
  }

  function handleClick(choice) {
    console.log(choice);
    if(choice === "Local")
      setLocal(true);
    if(choice === "Multiplayer")
      setMp(true);
  }

  return (
    <div className="App">
      {(local || onlineUser) && <Game chess={chess} thisPlayer={thisPlayer}/>}
      {(!local && !mp) && <GameModeSelector handleClick={handleClick}/>}
      {(mp) && 
        <MultiplayerAuth updateOnlineUser={UpdateOnlineUser}/>
      }
    </div>
  );
}

export default App;
