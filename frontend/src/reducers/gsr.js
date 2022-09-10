const gsrReducer = (state=[], action) => {
    switch(action.type) {
        case "SET_GSR":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default gsrReducer;