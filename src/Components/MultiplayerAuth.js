import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Handles Multiplayer functionality

function MultiplayerAuth({updateOnlineUser, docRef, setReady}) {
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
    if(docRef)
    {
      updateShareUrl(docRef);
    }
  }, [docRef]);

  //generates an invite url for the game
  function updateShareUrl(doc) {
      let document = doc.path.slice(11);
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
        (shareUrl || user) && 
          <div className="share">
            <p>Share Game URL: </p>
            <input value={(shareUrl)? shareUrl : "Please re-login"} readOnly={true}/>
            <Link to={"/multiplayer/game/onlinesession"}><button className="btn" onClick={()=>setReady(user.displayName)}>Ready</button></Link>
          </div>
        }
    </div>
  );
}

export {MultiplayerAuth};