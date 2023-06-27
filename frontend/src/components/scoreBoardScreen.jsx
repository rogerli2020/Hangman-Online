import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card } from '@mui/material';
import Chatbox from './chatbox';

function ScoreBoardScreen() {

    const p1ScoreBoard = useSelector(state => state.p1ScoreBoardReducer);
    const p2ScoreBoard = useSelector(state => state.p2ScoreBoardReducer);
    const myId = useSelector(state => state.myPlayerIdReducer)["id"];
    const rotated = useSelector(state => state.rotatedReducer);
    const timer = useSelector(state => state.timerReducer);
    const guessedCorrectly = useSelector(state => state.guessedCorrectlyReducer);
    const chosenWord = useSelector(state => state.chosenWordReducer);
    const cguesses = useSelector(state => state.cguessesReducer);

    const iAm = myId === p1ScoreBoard["ID"] ? "p1" : "p2";

    const setsAreEqual = (a, b) => {
        if (a.size !== b.size) {
          return false;
        }
      
        return Array.from(a).every(element => {
          return b.has(element);
        });
      }

    const getWinMethod = () => {
        if (chosenWord === null) {
            return (<div></div>)
        }
        const cguessesSet = new Set(cguesses);
        const cwordSet = new Set(chosenWord.toUpperCase().split(''));
        const guessedAllChars = setsAreEqual(cguessesSet, cwordSet);
        if (guessedCorrectly) {
            return "The Guesser entered a correct word guess.";
        } else if (guessedAllChars) {
            return "The Guesser guessed all correct letters.";
        } else {
            return "The Guesser failed to guess the word in time."
        }
    }

    const determineWhosWinning = () => {
        const myScore = iAm === "p1" ? p1ScoreBoard["GAME_TOTAL"] : p2ScoreBoard["GAME_TOTAL"];
        const opponentScore = iAm === "p1" ? p2ScoreBoard["GAME_TOTAL"] : p1ScoreBoard["GAME_TOTAL"];
        if (myScore === opponentScore) {
            return "TIE"
        } else if (myScore < opponentScore) {
            return "LOSING"
        } else {
            return "WINNING"
        }
    }

    const getWinLoseInfo = () => {
        if (rotated) {
            return (
                <div style={{margin: "50px"}}>
                    <div style={{textAlign:"center", color:"white", fontSize:"x-large", fontWeight:"normal"}}>
                        {
                            determineWhosWinning() === "TIE" ? "The game is at a tie." : (determineWhosWinning() === "WINNING" ? "You are winning." : "Your opponent is winning.")
                        }
                    </div>
                    <div style={{textAlign:"center", color:"white", fontSize:"large", fontWeight:"lighter"}}>
                        Game will continue in {timer}...
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{textAlign:"center", color:"white", fontSize:"large", fontWeight:"normal", margin: "50px"}}>
                    Game will continue in {timer}...
                </div>
            )
        }
    }

    const getScoreBoard = (dic) => {
        if (dic["DISCONNECTED"]) {
            return (
                <div style={{
                    color: "red",
                    height: "100%",
                    padding: "10px",
                    fontSize: "small",
                    textAlign: "center",
                    fontWeight: "bolder"
                }}>
                    PLAYER DISCONNECTED
                </div>
            )
        }
        if (dic["FINISHED_GUESSING"] === true) {
            return (
                <div style={{
                    color: "white",
                }}>
                        <Grid container spacing={0.1}>
                            <Grid item xs={8}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.10)", padding:"5px", textAlign: "right"}}>
                                    PROGRESSION SCORE
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.10)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                    {dic["PROGRESSION"]}
                                </div>
                            </Grid>

                            <Grid item xs={8}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.0)", padding:"5px", textAlign: "right"}}>
                                    BASE SCORE
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.0)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                    {dic["BASE"]}
                                </div>
                            </Grid>

                            <Grid item xs={8}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.10)", padding:"5px", textAlign: "right"}}>
                                    BONUS
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.10)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                    {dic["BONUS"]}
                                </div>
                            </Grid>

                            <Grid item xs={8}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.0)", padding:"5px", textAlign: "right"}}>
                                    PENALTY
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.0)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                    {dic["PENALTY"]}
                                </div>
                            </Grid>

                            <Grid item xs={8}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.10)", padding:"5px", textAlign: "right"}}>
                                    COMPENSATION
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.10)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                    {dic["COMPENSATION"]}
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                            </Grid>

                            <Grid item xs={8}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.0)", padding:"5px", textAlign: "right"}}>
                                    ROUND TOTAL
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{backgroundColor:"rgba(255,255,255,0.0)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                    {dic["ROUND_TOTAL"]}
                                </div>
                            </Grid>

                        </Grid>
                </div>
            )
        } else if (dic["FINISHED_GUESSING"] === false) {
            return (
                <div style={{
                    color: "rgba(255,255,255,0.5)",
                    height: "100%",
                    padding: "10px",
                    fontSize: "small",
                    fontStyle:"italic",
                    textAlign: "center",
                }}>
                    Hasn't played as the Guesser yet...
                </div>
            )
        }
    }

    return (
        // getMessage()
        <div style={{
            // position: "absolute",
            // width: "100%",
            // height: "100%",
            // backgroundColor: "rgba(0,0,0,0.4)",
            // zIndex: "2",
            maxWidth: "1000px",
            maxHeight: "750px",
            backdropFilter: "blur(50px)"
        }}>
            <div style={{margin:"50px"}}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <div style={{textAlign:"center", backgroundColor: "rgba(0,0,0,0.5)"}}>
                            <div style={{
                                color: "white",
                                fontSize: "small",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                padding: "5px",
                            }}>
                                CORRECT WORD
                            </div>
                            <div style={{
                                color: "white",
                                fontSize: "xx-large",
                                fontWeight: "bolder",
                                padding: "10px"
                            }}>
                                {chosenWord}
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div style={{textAlign:"center", backgroundColor: "rgba(0,0,0,0.5)"}}>
                                <div style={{
                                    color: "white",
                                    fontSize: "small",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    padding: "5px",
                                }}>
                                    {p1ScoreBoard["NAME"]}'s SCORE
                                </div>
                            </div>
                            <div style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                                {getScoreBoard(
                                    p1ScoreBoard
                                )}

                                <Grid container spacing={0.1} style={ (p1ScoreBoard["GAME_TOTAL"] > p2ScoreBoard["GAME_TOTAL"] && rotated) ?
                                    {color: "white", 
                                    borderStyle:"solid", 
                                    borderColor: "red", 
                                    borderRadius:"5px", 
                                    borderWidth: "3pt"
                                    } : {}}>
                                        <Grid item xs={8}>
                                        <div style={{backgroundColor:"rgba(255,255,255,0.50)", padding:"5px", textAlign: "right", fontWeight:"bolder"}}>
                                            GAME TOTAL
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{backgroundColor:"rgba(255,255,255,0.50)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                            {p1ScoreBoard["GAME_TOTAL"]}
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div style={{textAlign:"center", backgroundColor: "rgba(0,0,0,0.5)"}}>
                                <div style={{
                                    color: "white",
                                    fontSize: "small",
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                    padding: "5px",
                                }}>
                                    {p2ScoreBoard["NAME"]}'s SCORE
                                </div>
                            </div>
                            <div style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
                                {getScoreBoard(
                                    p2ScoreBoard
                                )}

                            <Grid container spacing={0.1} style={ (p2ScoreBoard["GAME_TOTAL"] > p1ScoreBoard["GAME_TOTAL"] && rotated) ?
                                    {color: "white", 
                                    borderStyle:"solid", 
                                    borderColor: "red", 
                                    borderRadius:"5px", 
                                    borderWidth: "3pt"
                                    } : {}}>                                        
                                    <Grid item xs={8}>
                                        <div style={{backgroundColor:"rgba(255,255,255,0.50)", padding:"5px", textAlign: "right", fontWeight:"bolder"}}>
                                            GAME TOTAL
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div style={{backgroundColor:"rgba(255,255,255,0.50)", padding:"5px", textAlign: "left", fontWeight: "bolder"}}>
                                            {p2ScoreBoard["GAME_TOTAL"]}
                                        </div>
                                    </Grid>
                                </Grid>

                            </div>
                    </Grid>

                    <Grid item xs={5}>
                        <Chatbox/>
                    </Grid>

                    <Grid item xs={7}>
                        <Card style={{backgroundColor:"rgba(0,0,0,0.75)", height:"100%"}}>
                            <div style={{color:"white", marginTop:"20px", textAlign: "center", fontSize:"large", fontWeight: "bolder"}}>
                                {getWinMethod()}
                                <hr/>
                            </div>
                            {getWinLoseInfo()}
                        </Card>
                    </Grid>



                </Grid>
                <div style={{display: "flex", paddingTop: "5px", color: "white", opacity: ".5"}}>
                        <div style={{fontWeight: "bolder", fontSize: "large"}}>H A N G M _ N</div>
                        <div style={{fontWeight: "lighter", fontSize: "medium"}}>ONLINE</div>
                    </div>

            </div>
        </div>
    )
}

export default ScoreBoardScreen;