import React from 'react';
import Timer from './timer';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Card, Input } from '@mui/material';
import Chatbox from './chatbox';
import {
    sendMessage
} from "../actions"

function WordEntryScreen() {

    const dispatch = useDispatch();
    const timeForChoosing = useSelector(state => state.gamevarsReducer)["TIME_FOR_CHOOSING"];
    const authInfo = useSelector(state => state.auth)
    const compensationForRandom = useSelector(state => state.gamevarsReducer)["COMPENSATION_FOR_RANDOM"];

    const handleSubmit = (event) => {
        event.preventDefault()
        const wordChosen = event.target[0].value
        dispatch(
            sendMessage(
                {
                    "msg_type": "action",
                    "action_type": "choose_word",
                    "content": wordChosen,
                    "access_token": authInfo["access"]
                }
            )
        )
        event.target[0].value = "";
    }
    const handleRandom = () => {
        dispatch(
            sendMessage(
                {
                    "msg_type": "action",
                    "action_type": "choose_word",
                    "content": "__RANDOM__",
                    "access_token": authInfo["access"]
                }
            )
        )
    }

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
                                leftText={"A random word will be chosen in"}
                                rightText={"seconds..."}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{
                                fontSize: "xx-large",
                                fontWeight: "bolder",
                                color: "white"
                                }}>
                                    YOU'RE THE EXECUTIONER
                            </div>
                            <div style={{color: "white"}}>Enter a word for the Guesser to guess...</div>
                    </Grid>
                    <Grid item xs={12}>
                        <hr></hr>
                    </Grid>
                    <Grid item xs={12}>
                        <Card style={{backgroundColor: "rgba(255,255,255,0.75)", padding: "25px"}}>
                            <form onSubmit={handleSubmit}>
                                    <Input placeholder="Enter your word here..." />
                                    <Button type="submit" value="submit">SUBMIT</Button>
                                    <Button onClick={handleRandom}>GO RANDOM*</Button>
                                    <p style={{fontSize:"small", opacity:"75%"}}>* Your opponent will be compensated for {compensationForRandom} points if you choose random.</p>
                            </form>
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

export default WordEntryScreen;