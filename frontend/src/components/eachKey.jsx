import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from "../actions"

function EachKey(props) {

    const authInfo = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const handleClick = () => {
        if (!props.used) {
            const msg = {
                "msg_type": "action",
                "action_type": "guess_letter",
                "content": props.thisChar,
                "access_token": authInfo["access"]
            }
            dispatch(sendMessage(msg))
        }
    }

    return (
        <div
            onClick={ handleClick }
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                opacity: props.used ? "25%" : "100%",
                color: "white",
                minWidth: "10px",
                height: "50px",
                maxWidth: "50px",
                borderRadius: "5px",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1px",
                width: "100%",
            }}
        >
            {props.thisChar}
        </div>
    )
}

export default EachKey;