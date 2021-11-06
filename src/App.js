import React, { useEffect } from 'react';
import GlobalStyle from './globalStyles';
import SpotifyGetTopSongs from './components/SpotifyGetTopSongs/SpotifyGetTopSongs';

////////////////////////////////////////////////////////////////////
//bugs + features:
// *animate
// *it breaks if theres an offline or unavailable track
// *what if there are less tracks than 72
// *it breaks if youre not listening to a playlist
////////////////////////////////////////////////////////////////////

// const API_KEY = "BQBupRg_tBiIRSfww9Sctk2LlIwHK_l6ZdGZXmFV9jcZVSZ2uTryzM0jIaVFT2SdYz2Ke5Dz9I51KHtLFVxCyRjqb3wiAYE6oqJAxmNlA0hkrAG6KZu_5NMIFcjuiU-5MqH5gtGMfX85X7Oa882TIUd_Dae9s6FV44M";
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

var client_id = '815a413830104996ac5818ea2ab67772';
//var client_secret = '9411ef5d23c648f99186411fbf30ad2c';
var redirect_uri = 'http://localhost:3000/';

var state = generateRandomString(16);

var scope = 'user-read-playback-state playlist-read-private';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};


function App() {
  useEffect(() => {
    if (window.location.hash) {
      const {
        access_token, 
        expires_in, 
        token_type
      } = getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
    window.location = `${url}`;
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
          <SpotifyGetTopSongs handleLogin={handleLogin}/>
      </div>
    </>
  );
}

export default App;