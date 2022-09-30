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
    const userId = data["user"] !== null ? data["user"]["id"] : null
    const username = data["user"] !== null ? data["user"]["first_name"] : "Guest";
    const signed_in = data["user"] !== null ? true : false;
    const activated = data.activationSuccess;

    const top_players_api_url = "http://rogerli2024.com/gamedata/get_top_players/";
    const top_words_api_url = "http://rogerli2024.com/gamedata/get_top_words/";
    const my_stats_url = "http://rogerli2024.com/gamedata/get_my_game_stats/";

    const [top_players_rows, setTopPlayerRows] = useState([]);
    const [top_words_rows, setTopWordRows] = useState([]);
    const [my_stat_row, setMyStatsRow] = useState([]);

    useEffect(() => {
        getServerResponse(top_players_api_url, null, setTopPlayerRows);
        getServerResponse(top_words_api_url, null, setTopWordRows);
        getServerResponse(my_stats_url, userId, setMyStatsRow);
    }, [userId])

    return (
    <div className='container'>
        <div class='jumbotron mt-5'>
                {
                    activated === true ?
                    <div class="alert alert-success" role="alert">
                        Account activated. Please login to use your account to continue.
                    </div>
                    :
                    ""
                }
            <h1 class='display-4'>Hello, {username}!</h1>
            <p class='lead'>
                {
                    !signed_in ? 
                    "You're not signed in. Your game data will not be saved unless you sign in." :
                    "You're signed in. Your game data will be saved."
                }
            </p>
            <Game/>
            <hr class='my-4' />

                <div style={{marginBottom: "10px"}}>
                    <h2>Game Statistics</h2>
                    <p>Your game data will be recorded if you're a signed in player.</p>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            <TableCell align="right">{row.win_ratio}</TableCell>
                            <TableCell align="right">{row.games_played}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                            <TableCell align="right">{row.win_ratio}</TableCell>
                            <TableCell align="right">{row.games_played}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer><br/>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

        </div>
    </div>
    )
};

export default Home;
