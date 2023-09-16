import { ObjectPosition } from "../../components/CircleObject/types";
import { generateRandomNumber } from "../../utils/utils";
import { GameStates, KeyReactionMessages } from "./types";

export const getUserMessageColor = (userReactionMessage: string) => {
  return userReactionMessage === KeyReactionMessages.SUCCESS ? "green" : "red";
};

const determineIfSuccess = (
  objectPosition: ObjectPosition,
  keyPressed: string,
  timeLeftForObject: number
) => {
  // If 'a' was pressed and object was on the left
  const validLeft = keyPressed === "a" && objectPosition === "left";
  // If 'l' was pressed and right and object was on the right
  const validRight = keyPressed === "l" && objectPosition === "right";
  const isSuccess = timeLeftForObject > 0 && (validLeft || validRight);
  return isSuccess ? true : false;
};

export const getUserReactionMessage = (
  objectPosition: ObjectPosition,
  gameState: GameStates,
  keyPressed: string,
  timeLeftForObject: number
): KeyReactionMessages => {
  if (gameState === GameStates.WAITING)
    return KeyReactionMessages.WAITING_STATE;
  if (determineIfSuccess(objectPosition, keyPressed, timeLeftForObject))
    return KeyReactionMessages.SUCCESS;
  if (timeLeftForObject < 0 && gameState === GameStates.OBJECT_DISAPPEARED)
    return KeyReactionMessages.TOO_LATE;
  return KeyReactionMessages.WRONG_KEY;
};

export const getFirstRoundObjPosition = (): ObjectPosition => {
  const objectSideRandomNumber = generateRandomNumber(0, 1);
  return objectSideRandomNumber > 0.5 ? "right" : "left";
};
