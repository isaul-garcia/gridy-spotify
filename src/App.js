import React, { useEffect } from 'react';
import GlobalStyle from './globalStyles';
import SpotifyGetTopSongs from './components/SpotifyGetTopSongs/SpotifyGetTopSongs';

// whats to fix:
//
// set timer to refresh token after an hour (or to override the error message and prompt user to refresh)
// first error of 'offline songs' not working at all / change to other error message
// change size according to playlist length / for less than 56 '12.5vw' for less than 72 '11.11vw'
// ? losts of refreshing sometimes to make it work

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
var redirect_uri = 'https://isaul-garcia.github.io/gridy-spotify/#';

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