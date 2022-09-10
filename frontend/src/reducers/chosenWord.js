const chosenWordReducer = (state=null, action) => {
    switch(action.type) {
        case "SET_CHOSEN_WORD":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default chosenWordReducer;