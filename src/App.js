import Game from "./Components/Game";
import {Chess} from "chess.js"
import { initializeApp } from "firebase/app";
import { useState } from "react";

function firebaseInit() {
  const firebaseConfig = {
    apiKey: "AIzaSyBrWcN79PZ3vLB885dqF8g_VY0s0KPztnY",
    authDomain: "chess-in-react.firebaseapp.com",
    projectId: "chess-in-react",
    storageBucket: "chess-in-react.appspot.com",
    messagingSenderId: "1070213244434",
    appId: "1:1070213244434:web:8e52f71c0d3e1471cf1acb",
    measurementId: "G-XHBPC2Z2T0"
  };
  return initializeApp(firebaseConfig);
}


function App() {
  const app = firebaseInit();
  const thisPlayer = 'b'
  const [chess, updateChess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const chess2 = new Chess("r1k4r/p2nb1p1/2b4p/1p1n1p2/2PP4/3Q1NB1/1P3PPP/R5K1 b - c3 0 19");

  return (
    <div className="App">
      <Game chess={chess} thisPlayer={thisPlayer}/>
    </div>
  );
}

export default App;
