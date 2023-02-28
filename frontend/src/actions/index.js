export const addNewMessage = (newMessage) => {
    return {
        type: "ADD_NEW_MESSAGE",
        data: newMessage
    }
}

export const setServerWebsocket = (ws) => {
    return {
        type: "SET_SERVER_SOCKET",
        data: ws
    }
}

export const sendMessage = (msg) => {
    return {
        type: "SEND_MESSAGE",
        data: msg
    }
}

export const setGamevars = (gamevars) => {
    return {
        type: "SET_GAMEVARS",
        data: gamevars
    }
}

export const setGameState = (num) => {
    return {
        type: "SET_GAME_STATE",
        data: num
    }
}

export const setCurrentRoundCount = (num) => {
    return {
        type: "SET_CURRENT_ROUND_COUNT",
        data: num
    }
}

export const setChosenWord = (chosenWord) => {
    return {
        type: "SET_CHOSEN_WORD",
        data: chosenWord
    }
}

export const setHintsPool = (pool) => {
    return {
        type: "SET_HINTS_POOL",
        data: pool
    }
}

export const setEx = (exInfo) => {
    return {
        type: "SET_EX",
        data: exInfo
    }
}

export const setGsr = (gsrInfo) => {
    return {
        type: "SET_GSR",
        data: gsrInfo
    }
}

export const setBoard = (board) => {
    return {
        type: "SET_BOARD",
        data: board
    }
}

export const setCguesses = (data) => {
    return {
        type: "SET_CGUESSES",
        data: data
    }
}

export const setFguesses = (data) => {
    return {
        type: "SET_FGUESSES",
        data: data
    }
}

export const setHints = (data) => {
    return {
        type: "SET_HINTS",
        data: data
    }
}

export const setHintRequested = (data) => {
    return {
        type: "SET_HINT_REQUESTED",
        data: data
    }
}

export const setP1ScoreBoard = (data) => {
    return {
        type: "SET_P1_SCORE_BOARD",
        data: data
    }
}

export const setP2ScoreBoard = (data) => {
    return {
        type: "SET_P2_SCORE_BOARD",
        data: data
    }
}

export const setRotated = (data) => {
    return {
        type: "SET_ROTATED",
        data: data
    }
}

export const setRoundState = (data) => {
    return {
        type: "SET_ROUND_STATE",
        data: data
    }
}

export const setWordWasRandom = (data) => {
    return {
        type: "SET_WORD_WAS_RANDOM",
        data: data
    }
}

export const setGuessedCorrectly = (data) => {
    return {
        type: "SET_GUESSED_CORRECTLY",
        data: data
    }
}

export const setWrongGuesses = (data) => {
    return {
        type: "SET_WRONG_GUESSES",
        data: data
    }
}

export const setMyPlayerId = (data) => {
    return {
        type: "SET_MY_PLAYER_ID",
        data: data
    }
}

export const setDisconnected = (data) => {
    return {
        type: "SET_DISCONNECTED",
        data: data
    }
}

export const setTimer = (data) => {
    return {
        type: "SET_TIMER",
        data: data
    }
}

export const setPlayerCount = (data) => {
    return {
        type: "SET_PLAYER_COUNT",
        data: data
    }
}
