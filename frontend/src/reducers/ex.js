const exReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_EX":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default exReducer;