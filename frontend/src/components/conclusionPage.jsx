import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import {
    sendMessage
} from "../actions"

function ConclusionPage() {

    const dispatch = useDispatch();
    const p1ScoreBoard = useSelector(state => state.p1ScoreBoardReducer);
    const p2ScoreBoard = useSelector(state => state.p2ScoreBoardReducer);
    const myId = useSelector(state => state.myPlayerIdReducer)["id"];
    const authInfo = useSelector(state => state.auth);
    const user = authInfo["user"]

    const determineWhosWinning = () => {
        const iAm = (myId === p1ScoreBoard["ID"]) ? "p1" : "p2";
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

    const handleOnClick = () => {
        dispatch(sendMessage(
            {
                "msg_type": "join",
                "is_guest": user === null ? true : false,
                "player_id": user !== null ? user["id"] : 0,      // 0 is guest.
                "player_name": user !== null ? user["first_name"] : null,
                "game_id": "__ANY__",
                "access_token": authInfo["access"]
            }
        ))
    }

    return (
        <div style={{
            // position: "absolute",
            // width: "100%",
            // height: "100%",
            // backgroundImage: "linear-gradient(to left top, rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
            // zIndex: "2",
            maxWidth: "1000px",
            maxHeight: "750px",
            backdropFilter: "blur(50px)"
        }}>
            <div style={{margin:"50px"}}>
                <div style={{color: "white", display: "block", width: "100%", height: "100%"}}>
                    <div style={{display: "flex", paddingTop: "25px", paddingBottom: "5px"}}>
                        <div style={{fontWeight: "bolder", fontSize: "x-large"}}>H A N G M _ N</div>
                        <div style={{fontWeight: "lighter", fontSize: "large"}}>ONLINE</div>
                    </div>
                    <div>
                        <hr></hr>
                        <div style={{fontSize: "x-large", fontWeight:"bold", marginTop: "10pt"}}>GAME CONCLUDED</div>
                        <div style={{fontSize: "medium", fontWeight: "light"}}>Here are the results.</div>
                    </div>

                    <div style={{marginTop: "10pt"}}>
                        <Grid container spacing={0.1}>
                            <Grid item xs={6}>
                                <div style={{backgroundColor: "rgba(0,0,0,0.5)", padding: "10px", textAlign: "center"}}>
                                    {p1ScoreBoard["NAME"]}'s FINAL SCORE
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{backgroundColor: "rgba(0,0,0,0.5)", padding: "10px", textAlign: "center"}}>
                                    {p2ScoreBoard["NAME"]}'s FINAL SCORE
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={(p1ScoreBoard["GAME_TOTAL"] >= p2ScoreBoard["GAME_TOTAL"]) ?
                                        {
                                            borderStyle:"solid", 
                                            borderColor: "red", 
                                            borderRadius:"5px", 
                                            borderWidth: "2pt",
                                            backgroundColor: "rgba(0,0,0,0.75)", padding: "10px", textAlign: "center", fontSize: "x-large", fontWeight: "bolder", height:"50px"
                                        } : {backgroundColor: "rgba(0,0,0,0.5)", padding: "10px", textAlign: "center", fontSize: "x-large", fontWeight: "bolder", height:"50px"}}>
                                    {
                                        p1ScoreBoard["GAME_TOTAL"]
                                    }                                    {
                                        p1ScoreBoard["DISCONNECTED"] ? <div style={{color: "red", fontSize: "small", textAlign: "center", fontWeight: "bolder"}}>DISCONNECTED</div> : ""
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                
                                <div style={(p2ScoreBoard["GAME_TOTAL"] >= p1ScoreBoard["GAME_TOTAL"]) ?
                                    {
                                        borderStyle:"solid", 
                                        borderColor: "red", 
                                        borderRadius:"5px", 
                                        borderWidth: "2pt",
                                        backgroundColor: "rgba(0,0,0,0.75)", padding: "10px", textAlign: "center", fontSize: "x-large", fontWeight: "bolder", height:"50px"
                                    } : {backgroundColor: "rgba(0,0,0,0.5)", padding: "10px", textAlign: "center", fontSize: "x-large", fontWeight: "bolder", height:"50px"}}>
                                    {
                                        p2ScoreBoard["GAME_TOTAL"]
                                    }
                                    {
                                        p2ScoreBoard["DISCONNECTED"] ? <div style={{color: "red", fontSize: "small", textAlign: "center", fontWeight: "bolder"}}>DISCONNECTED</div> : ""
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{
                                    borderStyle:"solid", 
                                    borderColor: "red", 
                                    borderRadius:"5px", 
                                    borderWidth: "2px",
                                    margin: "25px",
                                    backgroundColor: "rgba(0,0,0,0.75)", padding: "20px", textAlign: "center", fontSize: "xx-large", fontWeight: "bolder"}}>
                                    {
                                        determineWhosWinning() === "TIE" ? "Tie" : (determineWhosWinning() === "WINNING" ? "You won!" : "Opponent won!")
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <hr></hr>
                            </Grid>
                            {/* <Grid item xs={4}>
                                <Chatbox/>
                            </Grid> */}
                            <Grid item xs={12}>
                                <div style={{margin: "10px"}}>
                                    <Button variant="contained" onClick={handleOnClick}>Find another game</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConclusionPage;