import { NextFunction, Request, Response } from "express";

import * as UsersService from "./users.service";

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
    res.send(scoresResponse);
  } catch (err) {
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
    const putNewScoreResponse = await UsersService.putNewScore(req, res, next);
    res.send(putNewScoreResponse);
  } catch (err) {
    res.status(500).json({ error: true, errMessage: "Server failed!" });
  }
};
