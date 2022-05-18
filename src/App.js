import Game from "./Components/Game";
import GameModeSelector from "./Components/gameModeSelector";
import {Chess} from "chess.js";
import {MultiplayerAuth} from "./Components/MultiplayerAuth";
import { useState, useEffect } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useDocumentData } from "react-firebase-hooks/firestore";
import {getAuth} from "firebase/auth";
import { firebaseInit } from "./Components/Dependencies/firebaseInit";
import { getFirestore, collection, addDoc, getDoc, updateDoc } from "firebase/firestore";
//import firestore from 'firebase/compat/firestore';


function App() {
  const app = firebaseInit();
  const db = getFirestore();

  const [chess, updateChess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [thisPlayer, setThisPlayer] = useState('w');
  const [local, setLocal] = useState(false);
  const [mp, setMp] = useState(false);
  //const [fenState, updateFenState] = useState(chess.fen());

  const [onlineUser] = useAuthState(getAuth());
  const [docRef, setDocRef] = useState(null);
  const collRef = collection(db, 'chess-game');
  const [newFen] = useDocumentData(docRef);

  const UpdateOnlineUser = async (user) => {
    if(!user){
      setLocal(false);
      setMp(false);
    }
    else {
      console.log(user.displayName);
      // handle online stuff
      // set this player
      // get game data if exist
      if(!docRef){
        setDocRef(await addDoc(collRef, {
          'fen': "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          'player1': user.displayName,
          'player2': ""
        }));
      }
    }
  }

  function handleClick(choice) {
    console.log(choice);
    if(choice === "Local")
      setLocal(true);
    if(choice === "Multiplayer")
      setMp(true);
  }

  const UpdateGame = (chessObj) => {
    // update game data online every move
    let fen = chessObj.fen();
    updateDoc(docRef, {
      'fen': fen
    });
  }

  useEffect(() => {
    if(newFen) {
      //chess.load(newFen.fen);
      //updateFenState(newFen.fen);
      //console.log("gameUpdate");
      updateChess(new Chess(newFen.fen));
    }
  }, [newFen]);

  return (
    <div className="App">
      {(local || onlineUser) && <Game chess={chess} thisPlayer={thisPlayer} updateGame={UpdateGame}/>}
      {(!local && !onlineUser && !mp) && <GameModeSelector handleClick={handleClick} />}
      {(onlineUser || mp) && 
        <MultiplayerAuth updateOnlineUser={UpdateOnlineUser} docRef={docRef}/>
      }
    </div>
  );
}

export default App;
