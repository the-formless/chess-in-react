//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';


function MultiplayerAuth({updateOnlineUser, docRef}) {
  //const app = firebaseInit();
  const [shareUrl, setShareUrl] = useState("");

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

  useEffect(() => {
    //console.log(docRef);
    if(docRef)
    {
      let document = docRef.path.slice(11);
      //console.log(window.location+"game/"+document);
      setShareUrl(window.location+"game/"+document);
    }
  }, [docRef])


  // When authenticated, show the Sign out button, else Sign in
  return (
    <div className='select-game-mode mp-module'>
      {(!user) &&
          <button className='btn' onClick={signIn}>
            Sign In
          </button>
        }
        {(user) && <button className='btn' onClick={signOut}>
          Sign Out
        </button>}
        {(shareUrl) && <div className="share">
          <p>Share Game URL: </p>
          <input value={shareUrl} readOnly='true'/>
        </div>}
    </div>
  );
}

export {MultiplayerAuth};