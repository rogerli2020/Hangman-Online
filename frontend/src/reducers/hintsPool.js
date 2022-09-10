const hintsPoolReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_HINTS_POOL":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default hintsPoolReducer;