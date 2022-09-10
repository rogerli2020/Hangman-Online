const timerReducer = (state=0, action) => {
    switch(action.type) {
        case "SET_TIMER":
            state = action.data;
            return action.data;
        default:
            return state;
    }
}

export default timerReducer;