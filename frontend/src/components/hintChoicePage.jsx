import React from 'react'
import { useSelector } from "react-redux"
import Timer from './timer';
import TimerAutomatic from './timerAutomatic';
import EachHint from './eachHint';

function HintChoicePage() {

    const hintsPool = useSelector(state => state.hintsPoolReducer);
    const gamevars = useSelector(state => state.gamevarsReducer)

    return ( 
        <div 
            style={{
            // position: "absolute",
            // width: "100%",
            // height: "100%",
            // backgroundImage: "linear-gradient(to left top, rgba(0,0,0,0.5), rgba(0,0,0,0.5))",
            // zIndex: "2",
            maxWidth: "1000px",
            maxHeight: "750px",
            backdropFilter: "blur(50px)"
            }}
        >
            <div style={{margin: "50px"}}>

                <Timer rightText="seconds remaining..." seconds={gamevars["TIME_FOR_GUESSING"]} noMargin={true}/>
                <TimerAutomatic seconds={gamevars["TIME_FOR_CHOOSING_HINT"]} rightText="seconds ..." leftText="A random hint will be chosen in"/>
                <div style={{
                        fontSize: "xx-large",
                        fontWeight: "bolder",
                        color: "white"
                        }}>
                            CHOOSE A HINT
                    </div>
                <div style={{color: "white"}}>The Guesser just asked for a hint. Choose one for them.</div><br/>

                <div style={{display:"flex"}}>
                    {   (hintsPool !== null && hintsPool.length !== 0) ?
                        hintsPool.map(
                            eachHint => (
                                eachHint["hint_type"] !== "image" ?
                                <EachHint
                                    allowClick={true}
                                    hintInfo={eachHint}
                                    key={eachHint["id"]}
                                /> : ""
                            )
                        ) : ""
                    }
                </div>
                <div style={{display:"flex"}}>
                    {
                        (hintsPool !== null && hintsPool.length !== 0) ?
                        hintsPool.map(
                            eachHint => (
                                eachHint["hint_type"] === "image" ?
                                <EachHint
                                    allowClick={true}
                                    hintInfo={eachHint}
                                    key={eachHint["id"]}
                                /> : ""
                            )
                        ) : ""
                    }
                </div>
            </div>
        </div>
        );
}
 
export default HintChoicePage;