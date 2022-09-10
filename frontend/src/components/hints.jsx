import React, {useRef, useEffect} from 'react'
import EachHint from './eachHint';
import { useSelector } from 'react-redux';

function Hints() {

    const hints = useSelector(state => state.hintsReducer);
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView({ behavior: 'smooth' }));
        return <div ref={elementRef}/>;
    } 


    return (
        <div>
            <div style={{textAlign: "center", paddingTop: "3px", fontSize:"small"}}>
                HINTS
            </div>
            <hr/>
            <div style={{
                    backgroundColor: "white",
                    height: "150px",
                    width: "100%",
                    overflowY: "scroll",
                    wordWrap: "break-word",
                }}>
                    {
                        hints.map(
                            eachHint => (
                                <EachHint
                                    allowClick={false}
                                    hintInfo={eachHint}
                                    key={eachHint["id"]}
                                />
                            )
                        )
                    }
            </div>
        </div>
    )

}

export default Hints;