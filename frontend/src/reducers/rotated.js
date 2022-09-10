const rotatedReducer = (state=false, action) => {
    switch(action.type) {
        case "SET_ROTATED":
            state = action.data;
            return state;
        default:
            return state;
    }
}

export default rotatedReducer;