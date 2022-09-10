const gameStateReducer = (state=0, action) => {
    switch(action.type) {
        case "SET_GAME_STATE":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default gameStateReducer;