const fguessesReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_FGUESSES":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default fguessesReducer;