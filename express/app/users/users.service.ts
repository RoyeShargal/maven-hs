import { NextFunction, Request, Response } from "express";
import axios from "axios";

import { UserModel } from "../..";
import { usersSortedByMaxStepsAggregation } from "./users.aggregations";
import { guessUserGender } from "./utils";
import { logger } from "../../logger";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userName = req.body.username;
  const userExists = await UserModel.findOne({ username: userName });

  if (userExists) {
    logger.error("User already exists!");
    res.status(400).json({ error: true, errMessage: "Username taken!" });
    return;
  }

  // create user:
  const createdUser = await UserModel.create({ username: userName });

  // Guess user gender:
  const inferredGender = await guessUserGender(userName);

  // enrich user details:
  const genderFilter = inferredGender !== "undetermined" ? inferredGender : "";
  const enrichedDetailsResponse = await axios.get(
    `https://randomuser.me/api/?gender=${genderFilter}`
  );

  const enrichedUserData = enrichedDetailsResponse.data.results?.[0];
  const userAddedData = {
    gender: inferredGender,
    location: enrichedUserData.location,
    email: enrichedUserData.email,
    phone: enrichedUserData.phone,
  };

  const enrichedUser = await UserModel.findByIdAndUpdate(
    createdUser._id,
    userAddedData
  );
  logger.info(`Finished enriching user, data: ${enrichedUser}`);

  return enrichedUser;
};

export const GetScores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersSortedByScores = await UserModel.aggregate(
    usersSortedByMaxStepsAggregation
  );
  logger.info(`Fetched users sroted by scores: ${usersSortedByScores}`);
  return usersSortedByScores;
};

export const newScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, score } = req.body;
  const currentUser = await UserModel.findOne({ username });

  // would do a middleware to check this :)
  const userId = currentUser?._id;
  if (!userId) return "user does not exist!";
  if (score === null) return "No score was sent!";
  const currentUserScore = currentUser?.maxStepsReached ?? 0;

  // if already had better/equal score
  if (currentUserScore >= score) {
    return "user already had a better/equal score!";
  }

  // update score
  else {
    await UserModel.findByIdAndUpdate(userId, {
      maxStepsReached: score,
    });
    return `Congratulations! new score: ${score}`;
  }
};
