const playerCountReducer = (state=[0,0,0], action) => {
    switch(action.type) {
        case "SET_PLAYER_COUNT":
            state = action.data;
            return action.data;
        default:
            return state;
    }
}

export default playerCountReducer;