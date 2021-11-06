import React, { useEffect, useState } from 'react';
import axios from "axios";
import * as s from "../../globalStyles";
import logo from '../images/gridy.svg'

const SpotifyGetTopSongs = props => {
    const [token, setToken] = useState("");
    const [standBy, setStandBy] = useState([]);
    const [showGrid, setShowGrid] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [gotPlaylist, setGotPlaylist] = useState(false);
    const [isDone, setIsDone] = useState(false);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"));
            setIsLogged(true);
        }
    }, []);

    const handleCurrentPlaylist = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .get(`https://api.spotify.com/v1/me/player?market=us`, {
                headers: {
                    Authorization: "Bearer " + token
                },
            })
            .then((response) => {
                return axios
                    .get(`https://api.spotify.com/v1/playlists/${response.data.context.uri.substring(17)}/tracks?market=us&fields=(items(track(album(images))))&limit=99&offset=0`, {
                        headers: {
                            Authorization: "Bearer " + token
                        },
                    })
                    .then((response) => {
                        console.log(response.data);
                        setStandBy(response.data);
                        setLoading(false);
                        setGotPlaylist(true);
                        setErrorState("");
                    })
                    .catch((error) => {
                        console.log(error);
                        setErrorState("The playlist you're listening to has offline songs");
                    });
            })
            .catch((error) => {
                console.log(error);
                setErrorState("You're not listening to a playlist right now :/");
            });
    }

    const build = (e) => {
        setLoading(true);
        e.preventDefault();
        let sh = shuffle(standBy.items);

        sh = sh.concat(sh);
        console.log("doubled", sh);

        setShowGrid(true);
        setLoading(false);
        setIsDone(true);
    }

    return (
        <>
            <s.InstructionsContainer show={showGrid}>
                <s.Box checked={isLogged}>1</s.Box>
                    <p>Log in with Spotify</p>
                    <s.SpacingSmall />
                <s.Box checked={gotPlaylist}>2</s.Box>
                    <p>Get the currently playing playlist</p>
                    <s.SpacingSmall />
                <s.Box checked={isDone}>3</s.Box>
                    <p>Build the grid!</p>
                    <s.SpacingMedium />

                <p className="ps">↙ You can always rebuild, the button is just hiding at the bottom</p>
                <s.SpacingSmall />
                <s.ErrorMessage>{errorState}</s.ErrorMessage>
            </s.InstructionsContainer>

            {token === "" ?
                <s.CustomButtonRoot variant="outlined" onClick={() => props.handleLogin()} spotify={true}>Log In</s.CustomButtonRoot>
                :
                <s.CustomButtonRoot variant="outlined" onClick={() => props.handleLogin()} spotify={true} showGrid={showGrid}>⟳</s.CustomButtonRoot>
            }

            {standBy.items || isLogged === false ?
                (<div className="containerAnimate">
                    {showGrid ? (standBy.items.map((song) => (
                        <>
                            <div className="container-for-grid">
                                <img className="for-grid" src={song.track.album.href === null ? null : song.track.album.images[1].url } alt={"artwork"} />
                            </div>
                        </>
                    ))) : (
                        <s.CustomButtonRoot variant="outlined" onClick={build} disabled={loading} other={true}>Build Grid</s.CustomButtonRoot>
                    )}
                </div>)
                :
                <s.CustomButtonRoot variant="outlined" onClick={handleCurrentPlaylist}>Get Current Playlist</s.CustomButtonRoot>
            }

            <s.ContainerLogo onClick={() => setToggle(!toggle)} toggle={toggle}>
                <img className="for-logo" src={logo} alt={"logo"} />
            </s.ContainerLogo>
        </>
    )
};

export default SpotifyGetTopSongs;