import { useState } from "react";
import WordEntryScreen from "./wordEntryScreen";
import GuesserWaitScreen from "./guesserWaitScreen";
import ConnectionErrorScreen from "./connectionErrorScreen";
import { useSelector, useDispatch } from "react-redux";
import ScoreBoardScreen from "./scoreBoardScreen";
import GameGrid from "./gameGrid";
import GameWaitScreen from "./gameWaitScreen";
import ConclusionPage from "./conclusionPage";
import HintChoicePage from "./hintChoicePage";
import GameWelcomeScreen from "./gameWelcomeScreen";
import {
  sendMessage
} from "../actions"

function Game() {

  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const gameState = useSelector(state => state.gameStateReducer)
  const myPlayerId = useSelector(state => state.myPlayerIdReducer)["id"]
  const ex = useSelector(state => state.exReducer)["id"]
  const roundState = useSelector(state => state.roundStateReducer)
  const disconnected = useSelector(state => state.disconnectedReducer)
  const hintRequested = useSelector(state => state.hintRequestedReducer)
  const gamevars = useSelector(state => state.gamevarsReducer)
  const authInfo = useSelector(state => state.auth);
  const user = authInfo["user"]

  const handleChooseStage = () => {
    if (myPlayerId === ex) {
      return <WordEntryScreen/>;
    } else {
      return <GuesserWaitScreen/>;
    }
  }

  const handlePlayerReady = () => {
    setIsReady(true);
    const msg = {
      "msg_type": "join",
      "is_guest": user === null ? true : false,
      "player_id": user !== null ? user["id"] : 0,      // 0 is guest.
      "player_name": user !== null ? user["first_name"] : null,
      "game_id": "__ANY__",
      "access_token": authInfo["access"]
  }
  dispatch(sendMessage(msg));
  }

  const choosePage = () => {
    if (disconnected) return <ConnectionErrorScreen/>;
    if (gameState === gamevars["GAME_STATE_FINISHED"]) return <ConclusionPage/>;
    if (!isReady) return <GameWelcomeScreen onClickFunc={handlePlayerReady}/>;
    if (!disconnected && gameState === gamevars["GAME_STATE_WAITING"]) return <GameWaitScreen/>;
    if (roundState === gamevars["ROUND_STATE_RECESS"]) return <ScoreBoardScreen/>;
    if (roundState === gamevars["ROUND_STATE_CHOOSING_WORD"]) return handleChooseStage();
    if (ex === myPlayerId && hintRequested) return <HintChoicePage/>;
    if (gameState === gamevars["ROUND_STATE_GUESSING_WORD"]) return <div style={{padding: "50px"}}><GameGrid/></div>;
  }

  return (
    <div style={{display: "flex", height: "750px"}}>
      <div style={{
        backgroundImage: "linear-gradient(to right, rgb(80,20,90), rgb(80,0,200))",
        width: "100%",
        maxWidth: "1000px",
        height: "750px",
        }}>
          
        {choosePage()}

      </div>

      {/* overlay */}
      {/* {(ex === myPlayerId && hintRequested) ? <HintChoicePage/> : ""}
      {(!disconnected && gameState === gamevars["GAME_STATE_WAITING"]) ? <GameWaitScreen/> : ""}
      {(gameState === gamevars["GAME_STATE_FINISHED"]) ? <ConclusionPage/> : ""}
      {!isReady ?<GameWelcomeScreen onClickFunc={handlePlayerReady}/> : ""}
      {disconnected ? <ConnectionErrorScreen/> : ""} */}

    </div>
  );
}

export default Game;
