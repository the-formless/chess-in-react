import Game from "./Components/Game";
import MultiplayerGame from "./Components/MultiplayerGame";
import GameModeSelector from "./Components/gameModeSelector";
import {Chess} from "chess.js";
import {MultiplayerAuth} from "./Components/MultiplayerAuth";
import { useState, useEffect } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useDocumentData } from "react-firebase-hooks/firestore";
import {getAuth} from "firebase/auth";
import { firebaseInit } from "./Components/Dependencies/firebaseInit";
import { getFirestore, collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";


function App() {
  const app = firebaseInit();
  const db = getFirestore();

  const [chess, updateChess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [thisPlayer, setThisPlayer] = useState('w');
  const [players, setPlayers] = useState([]);
  const [onlineUser] = useAuthState(getAuth());
  const [docRef, setDocRef] = useState(null);
  const collRef = collection(db, 'chess-game');
  const [newFen] = useDocumentData(docRef);


  const setReady = async (player) => {
    //do databse stuff
    const currDoc = await (await getDoc(docRef)).data();
    console.log(currDoc);
    if(!currDoc.hasOwnProperty('player1')){
      const color = getRandomColor();
      const playColorArr = [player, color];
      updateDatabaseOnline(playColorArr, true);
      setThisPlayer(color);
    }
    else if(!currDoc.hasOwnProperty('player2')){
      const color = currDoc.color1 === 'w' ? 'b' : 'w';
      const playColorArr = [player, color];
      updateDatabaseOnline(playColorArr, false);
      setThisPlayer(color);
    }
  }
  const updateDatabaseOnline = (playerColorArr, player1) =>{
    let name = playerColorArr[0];
    let color = playerColorArr[1];
    if(player1)
      updateDoc(docRef, {
      'player1': name,
      'color1': color
      });
    else
      updateDoc(docRef, {
        'player2': name,
        'color2': color
      });
  }
  const UpdateOnlineUser = async (user, document) => {
    if(user){
      const currentUser = user.displayName;
      // handle online stuff
      // set this player
      // get game data if exist
      if(document && !docRef){
        setDocRef(doc(db, `chess-game/${document}`));
        }
      else if(!docRef){
        setDocRef(await addDoc(collRef, {
          'fen': "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        }));
      }
    }
  }
  const getRandomColor = () => {
    let r = Math.random();
    return r > 0.49 ? 'w' : 'b';
  }

  const UpdateGame = (chessObj) => {
    // update game data online every move
    let fen = chessObj.fen();
    updateDoc(docRef, {
      'fen': fen
    });
  }

  const handleClick = "";

  useEffect(() => {
    if(newFen) {
      updateChess(new Chess(newFen.fen));
    }
  }, [newFen]);

  return (
    <Router>
      <Routes>
          <Route path="/game/:doc" element={<MultiplayerAuth updateOnlineUser={UpdateOnlineUser} docRef={docRef} setReady={setReady}/>} />
          <Route exact path="/" element={<GameModeSelector handleClick={handleClick} />} />
          <Route path="/local" element={<Game chess={chess} thisPlayer={thisPlayer} updateGame={UpdateGame}/>} />
          <Route path="/multiplayer" element={<MultiplayerAuth updateOnlineUser={UpdateOnlineUser} docRef={docRef} setReady={setReady}/>}/> 
          <Route path="/multiplayer/game/:doc" element={<MultiplayerGame chess={chess} thisPlayer={thisPlayer} updateGame={UpdateGame} />} />
      </Routes>
    </Router>
  );
}

export default App;
