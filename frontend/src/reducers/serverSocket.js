const serverSocketReducer = (state=null, action) => {
    switch(action.type) {
        case "SET_SERVER_SOCKET":
            if (state == null) {
                state = action.data;
            }
            return action.data;
        case "SEND_MESSAGE":
            state.send(JSON.stringify(action.data));
            return state;
        default:
            return state;
    }
}

export default serverSocketReducer;