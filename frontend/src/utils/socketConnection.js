import { useDispatch } from "react-redux";
import {
    setServerWebsocket,
    setGamevars,
    setGameState,
    setBoard,
    setCguesses,
    setChosenWord,
    setCurrentRoundCount,
    setEx,
    setFguesses,
    setGsr,
    setGuessedCorrectly,
    setHintRequested,
    setHints,
    setHintsPool, 
    setP1ScoreBoard,  
    setP2ScoreBoard,
    setRotated, 
    setRoundState,
    setWordWasRandom,
    setWrongGuesses,
    setMyPlayerId,
    setDisconnected,
    addNewMessage,
    setTimer
  } from "../actions";

export default function SocketConnection() {
  
  const dispatch = useDispatch();
  const addr = "ws://localhost:8765";
  // const addr = "ws://10.0.0.110:8765/";
  var socket = new WebSocket(addr);

  socket.onopen = function(e) {
      console.log("[CONNECTION ESTABLISHED] Connected to server.");
    }
    socket.onmessage = function(e) {
      processMessage(JSON.parse(e.data))
    }
    socket.onclose = function(e) {
      dispatch(setDisconnected(true));
      if (e.wasClean) {
        console.log("[CONNECTION CLOSED] Connection closed cleanly\n");
      } else {
        console.log("[CONNECTION CLOSED] Connection died unexpectedly.\n")
      }
    };


  // this function processes server messages.
  const processMessage = function(msg) {
      const msg_type = msg["msg_type"]
      if (msg_type === "update") {
        const update_type = msg["update_type"]
        const content = msg["content"]
        switch(update_type) {
          case "game_state":
            dispatch(setGameState(content)); return;
          case "current_round_count":
            dispatch(setCurrentRoundCount(content)); return;
          case "__chosen_word":
            dispatch(setChosenWord(content)); return;
          case "__hints":
            dispatch(setHintsPool(content)); return;
          case "ex":
            dispatch(setEx(content)); return;
          case "gsr":
            dispatch(setGsr(content)); return;
          case "board":
            dispatch(setBoard(content)); return;
          case "cguesses":
            dispatch(setCguesses(content)); return;
          case "fguesses":
            dispatch(setFguesses(content)); return;
          case "hints":
            dispatch(setHints(content)); return;
          case "hint_requested":
            dispatch(setHintRequested(content)); return;
          case "p1scoreboard":
            dispatch(setP1ScoreBoard(content)); return;
          case "p2scoreboard":
            dispatch(setP2ScoreBoard(content)); return;
          case "rotated":
            dispatch(setRotated(content)); return;
          case "round_state":
            dispatch(setRoundState(content)); return;
          case "word_was_random":
            dispatch(setWordWasRandom(content)); return;
          case "guessed_correctly":
            dispatch(setGuessedCorrectly(content)); return;
          case "wrong_guesses":
            dispatch(setWrongGuesses(content)); return;
          case "timer":
            dispatch(setTimer(content)); return;
          default:
            return;
        }
      } else if (msg_type === "information") {
        const information_type = msg["information_type"];
        const content = msg["content"]
        if (information_type === "GAMEVARS") {
          dispatch(setGamevars(content));
        } else if (information_type === "your_info") {
          dispatch(setMyPlayerId(content));
        } 
      } else if (msg_type === "notification") {
        const notification_type = msg["notification_type"];
        const content = msg["content"]
        if (notification_type === "warning" || notification_type === "success" && msg["show"]) {
            const newJson = {
              "chat_type" : notification_type,
              "sender" : "SERVER",
              "content" : content
            }
            dispatch(addNewMessage(newJson));
          }
      } else if (msg_type === "chat") {
        const chat_type = msg["chat_type"];
        const sender = msg["sender"];
        const content = msg["content"];
        const newJson = {
          "chat_type" : chat_type,
          "sender" : sender,
          "content" : content
        }
          dispatch(addNewMessage(newJson));
      }
    }

  // SETTING REDUX SOCKET STATE so the socket is more accessible.
  dispatch(setServerWebsocket(socket));

  return (
    <div></div>
  )
}