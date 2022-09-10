import React from 'react'
import { useState, useEffect } from 'react';

const TimerAutomatic = (props) => {
    const initialSeconds = props.seconds;
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div style={{
            backgroundImage: "linear-gradient(to right, rgba(255,215,100,0.2), gold, rgba(255,215,0,0.5), rgba(255,215,0,0))",
            display: "flex",
            padding: "2pt",
            paddingLeft: "5pt",
            marginBottom: "5pt",
            color: "black"
        }}>
            <div>{props.leftText}&nbsp;</div> 
                    <div>
                { seconds === 0
                    ? ""
                    : <div style={{fontWeight: "bolder"}}> {seconds < 10 ?  `${seconds}` : seconds}</div> 
                }
                </div>
            <div>&nbsp;{props.rightText}</div>
        </div>
    )
}

export default TimerAutomatic;