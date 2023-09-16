import axios from "axios";

export const globalAxiosConfig = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const getScoresList = () => globalAxiosConfig.get(`/users/scores`);

export const postNewScore = (newScoreBody: object) =>
  globalAxiosConfig.post("/users/new-score", newScoreBody);

export const createNewUser = (username: string) =>
  globalAxiosConfig.post("/users/create", { username });
