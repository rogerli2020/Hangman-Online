const defaultVals = {
    "id": 0,
    "name": "PLACEHOLDER"
}

const myPlayerIdReducer = (state=defaultVals, action) => {
    switch(action.type) {
        case "SET_MY_PLAYER_ID":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default myPlayerIdReducer;