import React from 'react';
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

function HowToPlay() {

    return (
    <div style={{backgroundImage: "linear-gradient(to top, rgb(222,222,222), rgb(53,58,63))", minHeight: "100vh"}}>
    <div style={{display: "flex", justifyContent:"center", paddingTop:"50px"}}>
        <Card sx={{ p: 5, mt: 1 }} style={{backgroundColor: "rgba(230, 230, 230, 0.8)", width: "85%"}}>
            <br/>
            <h1 class='display-4' style={{fontWeight: 750}}>How To Play</h1> 
            <p class='lead'>
                A guide to mastering this game.
            </p>

            <hr/>

            <p>poop</p>
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

export default HowToPlay;
