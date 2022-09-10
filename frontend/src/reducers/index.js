import { combineReducers } from "redux";

import allMessagesReducer from "./allMessages";
import serverSocketReducer from "./serverSocket";
import gamevarsReducer from "./gamevars";
import gameStateReducer from "./gameState";
import currentRoundCountReducer from "./currentRoundCount";
import hintsPoolReducer from "./hintsPool";
import exReducer from "./ex";
import gsrReducer from "./gsr";
import boardReducer from "./board";
import chosenWordReducer from "./chosenWord";
import cguessesReducer from "./cguesses";
import fguessesReducer from "./fguesses";
import hintsReducer from "./hints";
import hintRequestedReducer from "./hintRequested";
import p1ScoreBoardReducer from "./p1ScoreBoard";
import p2ScoreBoardReducer from "./p2ScoreBoard";
import rotatedReducer from "./rotated";
import roundStateReducer from "./roundState";
import wordWasRandomReducer from "./wordWasRandom";
import guessedCorrectlyReducer from "./guessedCorrectly";
import wrongGuessesReducer from "./wrongGuesses";
import myPlayerIdReducer from "./myPlayerId";
import disconnectedReducer from "./disconnected";
import timerReducer from "./timer";
import auth from './auth';

const allReducers = combineReducers(
    {
        auth,
        allMessagesReducer,
        serverSocketReducer,
        gamevarsReducer,
        gameStateReducer,
        currentRoundCountReducer,
        hintsPoolReducer,
        exReducer,
        gsrReducer,
        boardReducer,
        cguessesReducer,
        fguessesReducer,
        hintsReducer,
        hintRequestedReducer,
        p1ScoreBoardReducer,
        p2ScoreBoardReducer,
        rotatedReducer,
        roundStateReducer,
        wordWasRandomReducer,
        guessedCorrectlyReducer,
        wrongGuessesReducer,
        myPlayerIdReducer,
        chosenWordReducer,
        disconnectedReducer,
        timerReducer,
    }
)

export default allReducers;