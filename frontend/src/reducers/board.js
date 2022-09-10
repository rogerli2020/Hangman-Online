const boardReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_BOARD":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default boardReducer;