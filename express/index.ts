import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { usersSchema } from "./app/users/Users.schema";
import { usersRouter } from "./app/users/users.router";

dotenv.config();
const app: Express = express();
const port = 3001; // process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL as string);
export const UserModel = mongoose.model("Users", usersSchema);

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
