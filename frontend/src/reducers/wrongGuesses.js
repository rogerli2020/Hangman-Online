const wrongGuessesReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_WRONG_GUESSES":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default wrongGuessesReducer;