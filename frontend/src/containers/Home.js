import { useState, useEffect } from 'react';
import React from 'react';
import Game from '../components/game';
import { useSelector, shallowEqual } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoRounded from '@mui/icons-material/Info';
import People from '@mui/icons-material/People';
import { Card } from '@mui/material';


const getServerResponse = (url, pid, setFunc) => {
    if (pid !== null) {
        url = url + pid.toString() + "/"
    }
    fetch(url)
    .then(response => response.json())
    .then(jsonObject => setFunc(jsonObject))
    .catch(error => console.error(error));

}

function Home() {


    const data = useSelector(state => state.auth, shallowEqual);
    const playerCount = useSelector(state => state.playerCountReducer);
    const userId = data["user"] !== null ? data["user"]["id"] : null
    const username = data["user"] !== null ? data["user"]["first_name"] : "Guest";
    const signed_in = data["user"] !== null ? true : false;
    const activated = data.activationSuccess;

    const top_players_api_url = "http://hangman.rogerli.net/gamedata/get_top_players/";
    const top_words_api_url = "http://hangman.rogerli.net/gamedata/get_top_words/";
    const my_stats_url = "http://hangman.rogerli.net/gamedata/get_my_game_stats/";

    const [top_players_rows, setTopPlayerRows] = useState([]);
    const [top_words_rows, setTopWordRows] = useState([]);
    const [my_stat_row, setMyStatsRow] = useState([]);

    useEffect(() => {
        getServerResponse(top_players_api_url, null, setTopPlayerRows);
        getServerResponse(top_words_api_url, null, setTopWordRows);
        getServerResponse(my_stats_url, userId, setMyStatsRow);
    }, [userId])

    return (
    <div style={{backgroundImage: "linear-gradient(to top, rgb(244,244,244), rgb(53,58,63))", minHeight: "100vh"}}>
    <div style={{display: "flex", justifyContent:"center", paddingTop:"50px"}}>
        <Card sx={{ p: 5, mt: 1 }} style={{backgroundColor: "rgba(230, 230, 230, 0.8)", width: "60%"}}>
            <br/>
                {
                    activated === true ?
                    <div class="alert alert-success" role="alert">
                        Account activated. Please login to use your account to continue.
                    </div>
                    :
                    ""
                }
            <h1 class='display-4' style={{fontWeight: 750}}>Hello, {username}!</h1>        <hr/>

            <p class='lead'>
                {
                    !signed_in ? 
                    "You're not signed in. Your game data will not be saved unless you sign in." :
                    "You're signed in. Your game data will be saved."
                }
                <br/>To test the game application, open the same website in another browser tab.
            </p>

                {/* <Card style={{backgroundImage: "linear-gradient(to right, rgba(233,233,233, 1), rgba(122,122,122, 0))", borderRadius:"5px", padding:"5px", marginBottom:"2px"}}> */}
                <Card style={{padding:"5px", marginBottom:"5px", backgroundColor: "rgba(52,73,94, 0.2)"}}>
                    <People/>There are currently <b>{playerCount[0]}</b> players connected.
                    <b> {playerCount[1]} </b> of them are in a game.
                    {/* <b> {playerCount[2]}  game(s)</b> are currently being hosted. */}
                </Card>

            <Game/>
        </Card>


        <Card sx={{ p: 5, mt: 1 }} style={{backgroundColor: "rgba(230, 230, 230, 1)", width:"25%"}}>

            <Card sx={{ p: 1.5 }} style={{backgroundColor: "LemonChiffon"}}>
                <GitHubIcon/>    Visit the GitHub page <a href="https://github.com/rogerli2020/Hangman-Online">here</a>.
            </Card>

            <hr/>
            {/* <h3>Credits</h3> */}
            <Card sx={{ p: 1.5}}>
                                                 <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 514.168 155.721">
                    <path d="M20.591 73.837H0V48.486h21.173V42.05C21.173 10.866 35.353 0 63.324 0c7.577 0 13.404 1.207 17.871 2.013L79.06 26.96c-2.912-1.007-5.827-1.61-11.07-1.61-8.935 0-12.432 6.438-12.432 16.7v6.437h24.862v25.351H55.557v79.467H20.59V73.837zM98.676 2.415h34.964v150.888H98.676zM163.553 4.83h34.964v26.556h-34.964zM163.553 48.486h34.964v104.817h-34.964zM303.604 78.462c-6.41-4.022-12.82-5.833-21.173-5.833-15.152 0-26.808 10.864-26.808 28.971 0 16.7 13.6 27.562 28.749 27.562 7.965 0 15.93-1.81 21.756-5.03l.777 26.96c-8.742 3.02-19.23 4.628-28.554 4.628-33.412 0-58.857-20.118-58.857-54.723 0-34.806 25.445-54.924 58.857-54.924 10.49 0 19.811 1.81 27.777 5.834l-2.524 26.555zM321.477 2.415h34.963v90.132h.388l29.137-44.061h38.266L389.073 96.57l38.073 56.734h-42.347l-27.97-51.905h-.389v51.905h-34.963z" fill="#0063db"/>
                    <path d="M512.418 77.456c-3.886-1.205-7.772-1.205-11.85-1.205-16.314 0-25.445 12.272-25.445 32.793v44.26h-34.964V48.485h31.856V67.8h.389c6.02-13.278 14.762-21.727 29.914-21.727 4.076 0 8.35.602 11.85 1.205l-1.75 30.178z" fill="#ff0084"/>
                </svg><br/>
                <InfoRounded fontSize="medium"/> Image search API powered by  <a href="https://www.flickr.com/services/feeds/docs/photos_public/">Flickr</a>.
            </Card>

            <Card sx={{ p: 1.5, mt: 1}}>
                <InfoRounded fontSize="medium"/> SQLite Dictionary developed by <a href="https://github.com/AyeshJayasekara/English-Dictionary-SQLite">Ayesh Jayasekara</a>.
            </Card>

            <hr class='my-4' />

                <div style={{marginBottom: "10px"}}>
                    <h2>Game Statistics</h2>
                    <p>Your game data will be recorded if you're signed in.</p>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><strong>Your Statistics</strong></TableCell>
                            <TableCell align="right"><strong>Win Ratio</strong></TableCell>
                            <TableCell align="right"><strong>Games Played</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            my_stat_row.length === 0 ? <TableRow><TableCell>No data available.</TableCell></TableRow> : ""
                        }
                        {my_stat_row.map((row) => (
                            <TableRow
                            key={row.pid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.win_ratio.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.games_played}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/>


                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><strong>Top Players</strong></TableCell>
                            <TableCell align="right"><strong>Win Ratio</strong></TableCell>
                            <TableCell align="right"><strong>Games Played</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                top_players_rows.length === 0 ? <TableRow><TableCell>No data available.</TableCell></TableRow> : ""
                            }
                        {top_players_rows.map((row) => (
                            <TableRow
                            key={row.pid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.win_ratio.toFixed(2)}</TableCell>
                            <TableCell align="right">{row.games_played}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/>

                <TableContainer component={Paper}>
                    {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell><strong>Top Words</strong></TableCell>
                            <TableCell align="right"><strong>Frequency</strong></TableCell>
                            <TableCell align="right"><strong>Avg. Score</strong></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                        top_words_rows.length === 0 ? <TableRow><TableCell>No data available.</TableCell></TableRow> : ""
                        }
                        {
                        top_words_rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.word}
                            </TableCell>
                            <TableCell align="right">{row.frequency}</TableCell>
                            <TableCell align="right">{row.avg_score}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/>

            <hr/>
            <h2>Visitor Statistics</h2>
            {/* <iframe 
                className="adc" 
                scrolling="no" 
                frameBorder="0" 
                allowtransparency="true" 
                src="//rf.revolvermaps.com/w/6/a/a2.php?i=58syu0oioz7&amp;m=7&amp;c=e63100&amp;cr1=ffffff&amp;f=arial&amp;l=0&amp;bv=90&amp;lx=-400&amp;ly=400&amp;hi=20&amp;he=7&amp;hc=a8ddff&amp;rs=80"
            ></iframe> */}
            <a href="https://www.revolvermaps.com/livestats/57axayg53wl/"><img src="//rf.revolvermaps.com/h/m/a/0/ff0000/128/0/57axayg53wl.png"/></a>

        </Card>
    </div>

    <div style={{display: "flex", justifyContent:"center", paddingTop: "50px", paddingBottom: "50px"}}>
        <div sx={{ p: 5, mt: 1 }} style={{width: "60%"}}>

        <div style={{justifyContent:"center"}}>
                <div style={{display: "flex"}}>
                            <div style={{fontWeight: "bolder", fontSize: "xxx-large"}}>H A N G M _ N</div>
                            <div style={{fontWeight: "lighter", fontSize: "xxx-large"}}>ONLINE</div>
                </div>
                <p class='lead'>An online, modern adaptation of the classic Hangman game.</p>
                
                <br/>
                By <a href="https://github.com/rogerli2020">Roger Li</a><br></br>
                Last Updated: June 2023

            </div>
        </div>

        <div sx={{ p: 5, mt: 1 }} style={{width:"25%", textAlign:"right"}}>
        </div>

    </div>

    </div>

    
    )
};

export default Home;
