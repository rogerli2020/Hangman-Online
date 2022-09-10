const defaultMsg = {
    "main_msg": "",
    "severity": "",
    "link_name": "",
    "link": "",
    "duration": 5,
}

const redirectInfoReducer = (state=[], action) => {
    switch(action.type) {
        case "UPDATE_REDIRECT_MESSAGE":
            return [...state, action.data]
        default:
            return state
    }
}

export default allMessagesReducer;