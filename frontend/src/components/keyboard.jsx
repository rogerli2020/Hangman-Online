import { React, useState } from 'react'
import EachKey from './eachKey';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Card } from '@mui/material';
import {
    sendMessage
} from "../actions"

function Keyboard() {

    const dispatch = useDispatch();
    const cguesses = useSelector(state => state.cguessesReducer);
    const fguesses = useSelector(state => state.fguessesReducer);
    const gamevars = useSelector(state => state.gamevarsReducer);
    const authInfo = useSelector(state => state.auth);
    const usedList = cguesses + fguesses;
    const firstRow = ["Q","W","E","R","T","Y","U","I","O","P"];
    const secondRow = ["A","S","D","F","G","H","J","K","L"];
    const thirdRow = ["Z","X","C","V","B","N","M"]
    let key = 0;

    const [enterGuess, setEnterGuess] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const wordGuessed = event.target[0].value
        dispatch(
            sendMessage(
                {
                    "msg_type": "action",
                    "action_type": "guess_word",
                    "content": wordGuessed,
                    "access_token": authInfo["access"]
                }
            )
        )
        event.target[0].value = "";
        handleToggle();
    }

    const handleToggle = () => {
        const currState = enterGuess;
        setEnterGuess(!currState);
    }

    const guessEntranceScreen = () => {
        return (
            <Card style={{backgroundColor:"rgba(255,255,255,0.9)"}}>
                <div style={{fontSize: "small", marginTop:"10px", textAlign:"center"}}>WORD GUESS ENTRY</div>
                <hr/>
                <div style={{color:"black", padding:"25px"}}>
                    <form onSubmit={handleSubmit}>
                        <Input color="primary" placeholder="Enter your guess here..." />
                        <Button type="submit" value="submit">SUBMIT</Button>
                        <Button onClick={handleToggle}>GO BACK</Button>
                        <p style={{fontSize:"small", opacity:"75%"}}>* You will be penalized for {-gamevars["PENALTY_FOR_FALSE_GUESS"]} points if your guess is wrong.<br/>Please double check to ensure that your spelling is correct.</p>
                    </form>
                </div>
            </Card>
        )
    }

    const handleHintRequest = () => {
        dispatch(
            sendMessage(
                {
                    "msg_type": "action",
                    "action_type": "request_hint",
                    "content": "None",
                    "access_token": authInfo["access"]
                }
            )
        )
    }

    const keyboardScreen = () => {
        return (
            <div style={{padding: "10px"}}>
            <div style={{display: "flex"}}>
                {
                    firstRow.map(
                        eachChar => (
                            <EachKey 
                                key={key++}
                                used={usedList.includes(eachChar) ? true : false}
                                thisChar={eachChar}
                            />
                        )
                    )
                }
            </div>
            <div style={{display: "flex", marginLeft: "10px"}}>
                {
                    secondRow.map(
                        eachChar => (
                            <EachKey 
                                key={key++}
                                used={usedList.includes(eachChar) ? true : false}
                                thisChar={eachChar}
                            />
                        )
                    )
                }
            </div>
            <div style={{display: "flex", marginLeft: "30px"}}>
                {
                    thirdRow.map(
                        eachChar => (
                            <EachKey 
                                key={key++}
                                used={usedList.includes(eachChar) ? true : false}
                                thisChar={eachChar}
                            />
                        )
                    )
                }
            </div>
            <div style={{margin: "25px", display:"flex", justifyContent: "space-between"}}>
                <Button variant="contained" size="medium" color="primary" onClick={handleToggle}>
                    Enter word guess
                </Button>
                <Button variant="contained" size="medium" color="warning" onClick={handleHintRequest}>
                    Request Hint (-25 PTS.)
                </Button>
            </div>
        </div>
        )
    }

    return (
        <div>
            {
                enterGuess ? guessEntranceScreen() : keyboardScreen()
            }
        </div>
    )
}

export default Keyboard;