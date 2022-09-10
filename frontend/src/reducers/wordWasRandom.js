const wordWasRandomReducer = (state=false, action) => {
    switch(action.type) {
        case "SET_WORD_WAS_RANDOM":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default wordWasRandomReducer;