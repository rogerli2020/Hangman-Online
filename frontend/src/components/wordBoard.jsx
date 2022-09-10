import React from 'react'
import { useSelector } from 'react-redux';

function WordBoard() {

    let wordBoard = useSelector(state => state.boardReducer);

    return (
        <div style={{
            color: "black", 
            backgroundColor: "white",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "xx-large",
            minHeight: "150px",
            maxHeight: "250px",
            height: "100%",
            }}>
            {wordBoard.join(" ")}
        </div>
    )
}

export default WordBoard;