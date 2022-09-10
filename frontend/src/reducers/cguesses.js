const cguessesReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_CGUESSES":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default cguessesReducer;