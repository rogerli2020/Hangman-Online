import React from 'react';
import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';

function GameWaitScreen() {

    const myId = useSelector(state => state.myPlayerIdReducer);
    const gameState = useSelector(state => state.gameStateReducer);
    const gamevars = useSelector(state => state.gamevarsReducer);

    return (
        <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: "linear-gradient(to left top, rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
            zIndex: "2",
            maxWidth: "1000px",
            maxHeight: "750px",
            backdropFilter: "blur(50px)"
        }}>
            <div style={{margin:"50px"}}>
                <div style={{color: "white", display: "block", width: "100%", height: "100%"}}>
                    <div style={{display: "flex", paddingTop: "25px", paddingBottom: "25px"}}>
                        <div style={{fontWeight: "bolder", fontSize: "xxx-large"}}>H A N G M _ N</div>
                        <div style={{fontWeight: "lighter", fontSize: "xxx-large"}}>ONLINE</div>
                    </div>
                    <div>
                        <LinearProgress color="success" />
                        <div style={{fontSize: "x-large", fontWeight:"bold", marginTop: "10pt"}}>Hello {myId["name"]}!</div>
                        <div style={{fontSize: "medium", fontWeight: "light"}}>
                            {
                                (gameState === gamevars["GAME_STATE_WAITING"]) ? "Waiting for an opponent to connect..." : "Opponent found! Game will start shortly..."
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameWaitScreen;