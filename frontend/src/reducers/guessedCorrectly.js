const guessedCorrectlyReducer = (state=false, action) => {
    switch(action.type) {
        case "SET_GUESSED_CORRECTLY":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default guessedCorrectlyReducer;