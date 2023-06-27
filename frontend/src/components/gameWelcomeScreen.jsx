import React from 'react';
import Timer from './timer';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import { LinearProgress, Button } from '@mui/material';
import { useSelector } from 'react-redux';

function GameWelcomeScreen(props) {

    return (
        <div style={{
            // position: "absolute",
            // zIndex: "2",
            // width: "100%",
            // height: "100%",
            // backgroundImage: "linear-gradient(to left top, rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
            maxWidth: "1000px",
            maxHeight: "750px",
            backdropFilter: "blur(50px)"
        }}>
            <div style={{margin:"50px"}}>
                <div style={{color: "white", display: "block", width: "100%", height: "100%"}}><br/><br/>
                    <div style={{display: "flex", paddingTop: "25px"}}>
                        <div style={{fontWeight: "bolder", fontSize: "xxx-large"}}>H A N G M _ N</div>
                        <div style={{fontWeight: "lighter", fontSize: "xxx-large"}}>ONLINE</div>
                    </div>
                    <div>An online, modern adaptation of the classic Hangman game.</div><br/>
                    <hr/>
                    <div>
                        <br/>
                        <Button variant="contained" onClick={()=>props.onClickFunc()}>PLAY NOW</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameWelcomeScreen;