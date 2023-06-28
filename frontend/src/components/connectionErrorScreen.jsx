import React from 'react';
import Timer from './timer';
import WarningIcon from '@mui/icons-material/Warning';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

function ConnectionErrorScreen() {

    // let serverSocket = useSelector(state => state.serverSocketReducer);
    // let gameState = useSelector(state => state.gameStateReducer);
    // let gamevars = useSelector(state => state.gamevarsReducer);

    return (
        // getMessage()
        <div style={{
            // position: "absolute",
            // width: "100%",
            // height: "100%",
            // backgroundImage: "linear-gradient(to left top, rgba(0,0,0,0.5), rgba(255,0,0,0.75))",
            // zIndex: "2",
            // maxWidth: "1000px",
            // maxHeight: "750px",
            backdropFilter: "blur(25px)",
        }}>
            <div style={{margin:"50px"}}>
                <div style={{color: "white", display: "block", width: "100%", height: "100%"}}>
                    <div>
                        <WarningIcon sx={{ fontSize: 100 }}/>
                        <div style={{fontSize: "xx-large", marginTop: "20px", fontWeight:"bolder"}}>Game server connection failure.</div>
                        <div style={{fontSize: "medium"}}>The server or your Internet might be down.</div>
                    </div>
                    <br/>
                    <br/>
                    <Button
                        style={{
                            color:"white"
                        }}
                        variant="outlined"
                        onClick={  function reloadPage() {window.location.reload(false)} }>RETRY CONNECTION</Button>
                </div>
            </div>
        </div>
    )
}

export default ConnectionErrorScreen;