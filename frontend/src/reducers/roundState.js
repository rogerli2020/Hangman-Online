const roundStateReducer = (state=0, action) => {
    switch(action.type) {
        case "SET_ROUND_STATE":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default roundStateReducer;