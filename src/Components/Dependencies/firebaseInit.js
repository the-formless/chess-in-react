import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBrWcN79PZ3vLB885dqF8g_VY0s0KPztnY",
  authDomain: "chess-in-react.firebaseapp.com",
  projectId: "chess-in-react",
  storageBucket: "chess-in-react.appspot.com",
  messagingSenderId: "1070213244434",
  appId: "1:1070213244434:web:8e52f71c0d3e1471cf1acb",
  measurementId: "G-XHBPC2Z2T0"
};
function firebaseInit() {
  return firebase.initializeApp(firebaseConfig);
}

export {firebaseInit};