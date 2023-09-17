import { NextFunction, Request, Response } from "express";

import * as UsersService from "./users.service";
import { logger } from "../../logger";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userName = req.body.username;
    if (!userName) {
      res
        .status(400)
        .json({ error: true, errMessage: "Username wasn't provided" });
    }

    // proceed to service & check if user exists
    const userResponse = await UsersService.CreateUser(req, res, next);
    res.send(userResponse);
  } catch (err) {
    res.status(500).json({ error: true, errMessage: "Server failed!" });
  }
};

// scores
export const getScores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const scoresResponse = await UsersService.GetScores(req, res, next);
    logger.info(`received scores response in fn: getScores, data: ${scoresResponse}`)
    res.send(scoresResponse);
  } catch (err) {
    logger.error(`Error in fn: getScores, err: ${err}`)
    res.status(500).json({ error: true, errMessage: "Server failed!" });
  }
};

// user-new-score
export const userNewScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newScoreResponse = await UsersService.newScore(req, res, next);
    logger.info(`updated used score, data: ${newScoreResponse}`)
    res.send(newScoreResponse);
  } catch (err) {
    logger.error(`Error in fn: userNewScore, err: ${err}`)
    res.status(500).json({ error: true, errMessage: "Server failed!" });
  }
};
