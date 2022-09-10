const hintsReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_HINTS":
            state = action.data;
            state.reverse();
            return state;
        default:
            return state;
    }
}

export default hintsReducer;