import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Timer from './timer';
import WordBoard from './wordBoard';
import Keyboard from './keyboard';
import WordInfoPanel from './wordInfoPanel';
import Chatbox from './chatbox';
import Hints from './hints';
import { useSelector } from 'react-redux';

function GuesserGrid() {

    let myId = useSelector(state => state.myPlayerIdReducer)["id"];
    console.log(myId)
    let exId = useSelector(state => state.exReducer)["id"];
    let gsrId = useSelector(state => state.gsrReducer)["id"];
    let currentRoundCount = useSelector(state=> state.currentRoundCountReducer);
    let gamevars = useSelector(state=> state.gamevarsReducer);

    return (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Timer rightText="seconds remaining..." seconds={gamevars["TIME_FOR_GUESSING"]}></Timer>
          </Grid>
          
          <Grid item xs={5}>
            <div style={{display: "flex", color: "white", fontSize: "xx-large"}}>
                <div style={{fontWeight: "bolder"}}>ROUND {currentRoundCount}&nbsp;</div><div style={{fontWeight:"lighter"}}>of 3</div>
            </div>
            <div style={{fontSize: "medium", fontWeight: "normal", color: "white"}}>You're currently playing as the {myId === exId ? "Executioner" : "Guesser"}...</div>
          </Grid>

          <Grid item xs={3}>
            {/* <Card style={{height: "90%", width: "100%"}}>Player 1 Info.</Card> */}
          </Grid>

          <Grid item xs={1}>
            {/* <Card style={{height: "90%", width: "100%"}}>VS.</Card> */}
          </Grid>

          <Grid item xs={3}>
            {/* <Card style={{height: "90%", width: "100%"}}>Player 2 Info.</Card> */}
          </Grid>

          <Grid item xs={12}>
            <hr></hr>
          </Grid>

          <Grid item xs={4}>
            <Card style={{height: "100%", width: "100%"}}>
              <Hints/>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card style={{height: "100%", width: "100%"}}>
                <WordBoard/>
            </Card>
          </Grid>

          <Grid item xs={5}>
            <Chatbox/>
          </Grid>
          <Grid item xs={7}>
            <Card style={{backgroundColor: "rgba(0,0,0,0.4)", height: "100%"}}>
              {
                myId === gsrId ? <Keyboard/> : <WordInfoPanel/>
              }
            </Card>
          </Grid>

        </Grid>
    )
}

export default GuesserGrid;