const disconnectedReducer = (state=false, action) => {
    switch(action.type) {
        case "SET_DISCONNECTED":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default disconnectedReducer;