const p2ScoreBoardReducer = (state={"FINISHED_GUESSING": false, "GAME_TOTAL" : 0, "DISCONNECTED" : false}, action) => {
    switch(action.type) {
        case "SET_P2_SCORE_BOARD":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default p2ScoreBoardReducer;