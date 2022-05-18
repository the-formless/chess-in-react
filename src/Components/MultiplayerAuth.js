//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function MultiplayerAuth({updateOnlineUser, docRef, setReady}) {
  //const app = firebaseInit();
  const [shareUrl, setShareUrl] = useState("");
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  
  const {doc} = useParams();
  console.log(doc);

  const signIn = async () => {
    await signInWithPopup(auth, provider)
    .then((result) => {
      if(doc){
        updateOnlineUser(result.user, doc);
      }
      else {
        updateOnlineUser(result.user);
      }
    });
  };
  const signOut = async () => {
    await auth.signOut()
    .then((result) =>{
      updateOnlineUser(null);
      setShareUrl("");
    });
  };

  useEffect(() => {
    //console.log(docRef);
    if(docRef)
    {
      updateShareUrl(docRef);
    }
  }, [docRef]);

  function updateShareUrl(doc) {
      let document = doc.path.slice(11);
      //console.log(document);
      let locationStr = window.location+"game/"+document;
      const regText = '/multiplayer';
      let regex = new RegExp(regText);
      if(regex.test(locationStr))
      {const invitePrefix = locationStr.slice(0, locationStr.match(regex).index);
      setShareUrl(invitePrefix+"/game/"+document);}
      else
      setShareUrl("Click Ready To Begin Game");
  }

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
        {
        (shareUrl) && 
          <div className="share">
            <p>Share Game URL: </p>
            <input value={shareUrl} readOnly={true}/>
            <Link to={"/multiplayer/game/onlinesession"}><button className="btn" onClick={()=>setReady(user.displayName)}>Ready</button></Link>
          </div>
        }
    </div>
  );
}

export {MultiplayerAuth};