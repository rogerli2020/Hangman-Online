const defaultConfig = {
    "MAX_ROUNDS" : 3,
    "GAME_STATE_WAITING" : 0,
    "GAME_STATE_READY" : 1,
    "GAME_STATE_IN_PROGRESS": 2,
    "GAME_STATE_FINISHED" : 3,
    "ROUND_STATE_READY" : 0,
    "ROUND_STATE_CHOOSING_WORD" : 1,
    "ROUND_STATE_GUESSING_WORD" : 2,
    "ROUND_STATE_RECESS" : 3,
    "TIME_FOR_READY" : 1,
    "TIME_FOR_CHOOSING" : 10,
    "TIME_FOR_GUESSING" : 500,
    "TIME_FOR_RECESS" : 10,
    "TIME_FOR_CHOOSING_HINT" : 10,
    "OVERTIME_FOR_CHANGE" : 20,
    "MAX_BASE_POINTS": 1000,
    "MAX_BONUS_POINTS": 500,
    "MAX_PROGRESSION_POINTS": 500,
    "COMPENSATION_FOR_RANDOM": 100,
    "PENALTY_FOR_HINT": -25,
    "PENALTY_FOR_FALSE_GUESS": -200
}

const gamevarsReducer = (state=defaultConfig, action) => {
    switch(action.type) {
        case "SET_GAMEVARS":
            state = action.data;
            return action.data;
        default:
            return state;
    }
}

export default gamevarsReducer;