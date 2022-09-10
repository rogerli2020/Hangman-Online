import { React, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Card } from '@mui/material';
import {
    sendMessage
} from "../actions"

function WordInfoPanel() {

    const dispatch = useDispatch();
    const chosenWord = useSelector(state => state.chosenWordReducer);
    const authInfo = useSelector(state => state.auth);
    const wrongGuesses = useSelector(state => state.wrongGuessesReducer);
    const fguesses = useSelector(state => state.fguessesReducer);
    const gamevars = useSelector(state => state.gamevarsReducer);

    const [changeWord, setChangeWord] = useState(false)
    const [hideWord, setHideWord] = useState(false)

    const toggleChangeWord = () => {
        const prev = changeWord
        setChangeWord(!prev)
    }

    const toggleHideWord = () => {
        const prev = hideWord
        setHideWord(!prev)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newWord = event.target[0].value
        dispatch(
            sendMessage(
                {
                    "msg_type": "action",
                    "action_type": "change_word",
                    "content": newWord,
                    "access_token": authInfo["access"],
                }
            )
        )
        event.target[0].value = "";
        toggleChangeWord();
    }

    const wordInfoPanelScreen = (
            <div style={{color: 'white', padding: "25px"}}>
                <div style={{fontSize:"small", backgroundColor: "rgba(0,0,0,0.5)", padding:"3px", opacity:".75"}}>CORRECT WORD</div>
                <div style={{fontSize:"x-large", marginLeft: "10px"}}>{hideWord ? "[HIDDEN]" : (chosenWord == null ? "Waiting..." : chosenWord)}</div>
                <br/>
                <div style={{fontSize:"small", backgroundColor: "rgba(0,0,0,0.5)", padding:"3px", opacity:".75"}}>INCORRECT CHARACTER GUESSES</div>
                <div style={{fontSize: fguesses.length === 0 ? "small" : "large", marginLeft: "10px"}}>{fguesses.length === 0 ? "None so far..." : fguesses.join(" ")}</div>
                <br/>
                <div style={{fontSize:"small", backgroundColor: "rgba(0,0,0,0.5)", padding:"3px", opacity:".75"}}>INCORRECT WORD GUESSES</div>
                <div style={{fontSize: wrongGuesses.length === 0 ? "small" : "large", marginLeft: "10px"}}>{wrongGuesses.length === 0 ? "None so far..." : wrongGuesses.join(" ")}</div>
                <br></br>
                <Button onClick={toggleHideWord} variant="contained">{hideWord ? "UNHIDE WORD" : "HIDE WORD"}</Button>
                <Button onClick={toggleChangeWord} variant="contained" style={{marginLeft:"5px"}}>CHANGE WORD</Button>
            </div>
    )

    const changeWordScreen = (
        <Card style={{backgroundColor:"rgba(255,255,255,0.9)"}}>
            <div style={{fontSize: "small", marginTop:"10px", textAlign:"center"}}>CHANGE WORD</div>
            <hr/>
            <div style={{color:"black", padding:"25px"}}>
                <form onSubmit={handleSubmit}>
                    <Input color="primary" placeholder="Enter new word here..." />
                    <Button type="submit" value="submit">SUBMIT</Button>
                    <Button onClick={toggleChangeWord}>GO BACK</Button>
                    <p style={{fontSize:"small", opacity:"75%"}}>
                        Your new word must fit the game's current progress and cannot be a word that has already been guessed incorrectly by the Guesser.
                        <br/>
                        If your word change is successful, the Guesser will receive {gamevars["OVERTIME_FOR_CHANGE"]} more seconds for guessing.
                    </p>
                </form>
            </div>
        </Card>
    )
    

    return (
        <div>
            {
                changeWord ? changeWordScreen : wordInfoPanelScreen
            }
        </div>
    )
}

export default WordInfoPanel;