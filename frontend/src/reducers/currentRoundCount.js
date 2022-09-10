const currentRoundCountReducer = (state=0, action) => {
    switch(action.type) {
        case "SET_CURRENT_ROUND_COUNT":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default currentRoundCountReducer;