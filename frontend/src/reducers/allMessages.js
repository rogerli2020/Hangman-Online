const allMessagesReducer = (state=[], action) => {
    switch(action.type) {
        case "ADD_NEW_MESSAGE":
            return [...state, action.data]
        default:
            return state
    }
}

export default allMessagesReducer;