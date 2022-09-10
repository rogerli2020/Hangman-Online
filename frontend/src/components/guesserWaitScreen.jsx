import React from 'react';
import Timer from './timer';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Card, Input } from '@mui/material';
import Chatbox from './chatbox';

function GuesserWaitScreen() {

    const dispatch = useDispatch();
    const timeForChoosing = useSelector(state => state.gamevarsReducer)["TIME_FOR_CHOOSING"];
    const compensationForRandom = useSelector(state => state.gamevarsReducer)["COMPENSATION_FOR_RANDOM"];
    const myId = useSelector(state => state.myPlayerIdReducer)["id"];
    const exId = useSelector(state => state.exReducer);
    const gsrId = useSelector(state => state.gsrReducer);
    const currentRoundCount = useSelector(state => state.currentRoundCountReducer);

    return (
        <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: "2",
            maxWidth: "1000px",
            maxHeight: "750px",
            backdropFilter: "blur(50px)"
        }}>
            <div style={{margin:"50px"}}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <Timer
                                seconds={timeForChoosing}
                                rightText={"seconds left for the Executioner to choose..."}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{
                                fontSize: "xx-large",
                                fontWeight: "bolder",
                                color: "white"
                                }}>
                                    YOU'RE THE GUESSER
                            </div>
                            <div style={{color: "white"}}>Please wait for the Executioner to make their word choice.</div>
                    </Grid>
                    <Grid item xs={12}>
                        <hr></hr>
                    </Grid>
                    <Grid item xs={12}>
                        <Card style={{backgroundColor: "rgba(255,255,255,0.75)", padding: "50px"}}>
                        </Card>
                    </Grid>

                    <Grid item xs={5}>
                        <Chatbox/>
                    </Grid>
                    <Grid item xs={7}>
                        <Card style={{backgroundColor: "rgba(255,255,255,0.4)", height: "100%"}}>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}

export default GuesserWaitScreen;