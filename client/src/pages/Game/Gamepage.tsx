import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { generateRandomNumber } from "../../utils/utils";
import { MainGameContainer, ScoreTypography, UserMessage } from "./styles";
import { GameStates, KeyReactionMessages } from "./types";
import {
  getFirstRoundObjPosition,
  getUserMessageColor,
  getUserReactionMessage,
} from "./utils";
import { postNewScore } from "../../api/api";
import CircleObject from "../../components/CircleObject/CircleObject";
import { ObjectPosition } from "../../components/CircleObject/types";

const Gamepage: React.FC = () => {
  const [gameState, setGameState] = useState<GameStates>(GameStates.WAITING);
  const [waitingTime, setWaitingTime] = useState(generateRandomNumber(2, 5));
  const [objectPosition, setObjectPosition] = useState<ObjectPosition>(
    getFirstRoundObjPosition()
  );
  const [timeLeftForObject, setTimeLeftForObject] = useState(1);
  const [userReactionMessage, setUserReactionMessage] = useState("");
  const [currentScore, setCurrentScore] = useState(0);
  const currentUsername = useRef(localStorage.getItem("username"));
  
  useEffect(() => {
    if (gameState === GameStates.OBJECT_APPEARS) {
      const activateTimeout = timeLeftForObject > 0;
      activateTimeout
        ? setTimeout(() => setTimeLeftForObject(timeLeftForObject - 0.1), 100)
        : setGameState(GameStates.OBJECT_DISAPPEARED);
    }
  }, [timeLeftForObject, gameState]);

  useEffect(() => {
    if (gameState === GameStates.WAITING) {
      waitingTime > 0
        ? setTimeout(() => setWaitingTime(waitingTime - 0.1), 100)
        : restartObject();
    }
  }, [waitingTime]);

  const restartObject = () => {
    setTimeLeftForObject(1);
    setGameState(GameStates.OBJECT_APPEARS);
  };

  const showLoader = useMemo(() => !!(waitingTime > 0), [waitingTime]);

  const onGameWin = async () => {
    const newScore = currentScore + 1;
    // send score to api :)
    await postNewScore({
      score: newScore,
      username: currentUsername.current,
    });
    setCurrentScore(newScore);
  };

  const restartGame = useCallback(() => {
    const objectSideRandomNumber = generateRandomNumber(0, 1);
    const objSide = objectSideRandomNumber > 0.5 ? "right" : "left";
    setObjectPosition(objSide);
    const randomWaitingTime = generateRandomNumber(2, 5);
    setTimeLeftForObject(1);
    setGameState(GameStates.WAITING);
    setWaitingTime(randomWaitingTime);
    setTimeout(() => {
      setUserReactionMessage("");
    }, randomWaitingTime * 1000); // reset message when new round begins :)
  }, []);

  const onUserKeyPressed = (
    eventPressed: React.KeyboardEvent<HTMLImageElement>
  ) => {
    const keyPressed = eventPressed.key;
    const userReactionMessage = getUserReactionMessage(
      objectPosition,
      gameState,
      keyPressed,
      timeLeftForObject
    );
    if (userReactionMessage === KeyReactionMessages.SUCCESS) onGameWin();
    else {
      setCurrentScore(0);
    }
    setUserReactionMessage(userReactionMessage);
    restartGame();
  };

  return (
    <MainGameContainer autoFocus tabIndex={0} onKeyDown={onUserKeyPressed}>
      {gameState === GameStates.OBJECT_APPEARS && (
        <CircleObject objectPosition={objectPosition} />
      )}
      {showLoader && <CircularProgress size={160} />}
      <UserMessage userMessageColor={getUserMessageColor(userReactionMessage)}>
        {userReactionMessage}
      </UserMessage>
      <ScoreTypography>Your current score is: {currentScore}</ScoreTypography>
    </MainGameContainer>
  );
};

export default Gamepage;
