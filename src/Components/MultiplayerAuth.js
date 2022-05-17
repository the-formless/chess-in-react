import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'


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

function MultiplayerAuth({updateOnlineUser}) {
  const app = firebaseInit();

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const signIn = async () => {
    await signInWithPopup(auth, provider)
    .then((result) => {
      updateOnlineUser(result.user);
    });
  };
  const signOut = async () => {
    await auth.signOut()
    .then((result) =>{
      updateOnlineUser(null);
    });
  };
  // When authenticated, show the Sign out button, else Sign in
  return (
    <div className='select-game-mode'>
      {(!user) &&
          <button className='btn' onClick={signIn}>
            Sign In
          </button>
        }
        {(user) && <button className='btn' onClick={signOut}>
          Sign Out
        </button>}
    </div>
  );
}

export {MultiplayerAuth};