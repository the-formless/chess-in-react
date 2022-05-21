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
  Route,
} from "react-router-dom";


function App() {
  const app = firebaseInit();
  const db = getFirestore();

  const [chess, updateChess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [thisPlayer, setThisPlayer] = useState('w');
  const [playWith, setPlayWith] = useState("");
  const [docRef, setDocRef] = useState(null);
  const collRef = collection(db, 'chess-game');
  const [newFen] = useDocumentData(docRef);


  const setReady = async (player) => {
    //sets player name and player color in the backend
    const currDoc = await (await getDoc(docRef)).data();
    //console.log(currDoc);
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
  //update on player ready
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

  useEffect(() => {
    if(newFen) {
      updateChess(new Chess(newFen.fen));
      //change opposite player
      if(!playWith){
        if(newFen.hasOwnProperty('color1') && thisPlayer === newFen.color1){
          if(newFen.hasOwnProperty('player2'))
          setPlayWith(newFen.player2); 
        }
        if(newFen.hasOwnProperty('color2') && thisPlayer === newFen.color2)
          setPlayWith(newFen.player1); 
      }
    }
  }, [newFen]);


  return (
    <Router basename={`${process.env.PUBLIC_URL}`}>
      <Routes>
          <Route exact path="/" element={<GameModeSelector />} />
          <Route path="/game/:doc" element={<MultiplayerAuth updateOnlineUser={UpdateOnlineUser} docRef={docRef} setReady={setReady}/>} />
          <Route path="/local" element={<Game chess={chess} thisPlayer={thisPlayer} />} />
          <Route path="/multiplayer" element={<MultiplayerAuth updateOnlineUser={UpdateOnlineUser} docRef={docRef} setReady={setReady}/>}/> 
          <Route path="/multiplayer/game/:doc" element={<MultiplayerGame chess={chess} thisPlayer={thisPlayer} docRef={docRef} playWith={playWith}/>} />
      </Routes>
    </Router>
  );
}

export default App;
