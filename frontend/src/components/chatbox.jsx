import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, Card } from '@mui/material';
import {
    sendMessage
} from "../actions"

function Chatbox() {

    const dispatch = useDispatch();
    const allMessages = useSelector(state => state.allMessagesReducer);
    const authInfo = useSelector(state => state.auth);
    const chatContainer = React.createRef();

    // const AlwaysScrollToBottom = () => {
    //     const elementRef = useRef();
    //     useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }));
    //     return <div ref={elementRef}/>;
    // } 

    useEffect(() => {scrollToMyRef()})

    const scrollToMyRef = () => {
        const scroll =
          chatContainer.current.scrollHeight -
          chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);
      };

    const handleSubmit = (event) => {
        event.preventDefault()
        const chatMessage = event.target[0].value
        dispatch(
            sendMessage(
                {
                    "msg_type": "chat",
                    "content": chatMessage,
                    "access_token": authInfo["access"],
                }
            )
        )
        event.target[0].value = "";
    }

    const renderAllMessages = () => {
        let key = 100;
        const colorMapping = {
            "warning": "red",
            "success": "green",
            "normal": "black"
        }
        if (allMessages.length === 0) {
            return <div style={{color: "gray", fontSize: "small", margin: "5px"}}>No messages...</div>
        } else {
            return (
                allMessages.map(
                    thisMessage => (
                        <div 
                            key={key++}
                            style={{
                                color: colorMapping[thisMessage["chat_type"]], 
                                fontSize: "small", 
                                margin: "5px"
                            }}
                        >
                            {"[" + thisMessage["sender"] + "] " + thisMessage["content"]}
                        </div>
                    )
                )
            )
        }
    }

    return (
        <Card style={{backgroundColor:"rgba(255,255,255,0.75)"}}>
            <div style={{display:"block"}}>
                {/* <div style={{fontSize: "small", textAlign: "center", padding: "5px"}}>CHAT MESSAGES</div> */}
                <div style={{
                    fontSize: "small",
                    textAlign: "center",
                    margin: "5px"
                }}>
                    CHAT MESSAGES
                </div>

                <div style={{
                    backgroundColor: "white",
                    height: "150px",
                    width: "100%",
                    overflowY: "scroll",
                    wordWrap: "break-word",
                }} 
                    ref={chatContainer}
                >
                    {
                        renderAllMessages()
                    }
                </div>

                <div style={{textAlign: "center", width: "100%"}}>
                    <form onSubmit={handleSubmit}>
                        <Input placeholder="Chat here..."/>
                        <Button type="submit" value="submit">Send</Button>
                    </form>
                </div>
            </div>
        </Card>
    )
}

export default Chatbox;