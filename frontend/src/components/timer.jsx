import React from 'react'
import { useSelector } from 'react-redux';

const Timer = (props) => {

    const seconds = useSelector(state => state.timerReducer);

    return (
        <div style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,0,0))",
            display: "flex",
            padding: "2pt",
            paddingLeft: "5pt",
            marginBottom: props.noMargin ? "0pt" : "5pt",
        }}>
            <div>{props.leftText}&nbsp;</div> 
                    <div>
                    <div style={
                        seconds <= 3 ?
                        {fontWeight: "bolder", color: "red"} :
                        {fontWeight: "bolder"}
                    }> {seconds}</div> 
                </div>
            <div>&nbsp;{props.rightText}</div>
        </div>
    )
}

export default Timer;