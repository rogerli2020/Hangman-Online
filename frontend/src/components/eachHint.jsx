import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from "../actions"
import { Card } from '@mui/material';

function EachHint(props) {

    const dispatch = useDispatch();
    const hintType = props.hintInfo["hint_type"]
    const hintContent = props.hintInfo["content"]
    const hintId = props.hintInfo["id"]
    const authInfo = useSelector(state => state.auth)

    const handleClick = () => {
            const msg = {
                "msg_type": "action",
                "action_type": "choose_hint",
                "content": hintId,
                "access_token": authInfo["access"]
            }
            dispatch(sendMessage(msg));
    }

    const renderHintContent = () => {
        if (hintType === "image") {
            return (
                <div style={{margin: "10px"}}>
                    <img style={{height: "150px"}}src={`data:image/png;base64,${hintContent}`} alt="hintImage"/>
                </div>
            )
        } else {
            return (
                <div style={{margin: "25px"}}>
                    <div style={{fontSize: "large", fontWeight: "bolder"}}>{hintContent}</div>
                </div>
            )
        }

    }

    return (
        <Card style={{margin: "5px", backgroundColor:"khaki"}} onClick={props.allowClick ? handleClick : ""}>
            {
                renderHintContent()
            }
        </Card>
    )
}

export default EachHint;