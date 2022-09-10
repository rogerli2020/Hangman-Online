const hintRequestedReducer = (state=false, action) => {
    switch(action.type) {
        case "SET_HINT_REQUESTED":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default hintRequestedReducer;