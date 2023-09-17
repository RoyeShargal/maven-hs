import { Router, Response, Request, NextFunction } from "express";

import * as UsersController from "./users.controller";

export const usersRouter = Router();

// get user scores
usersRouter.get(
  "/scores",
  async (req: Request, res: Response, next: NextFunction) => {
    await UsersController.getScores(req, res, next);
  }
);

// create user + enrich data
usersRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    await UsersController.createUser(req, res, next);
  }
);

// post/update user new score
usersRouter.post(
  "/new-score",
  async (req: Request, res: Response, next: NextFunction) => {
    await UsersController.userNewScore(req, res, next);
  }
);
