import mongoose from "mongoose";

export const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  maxStepsReached: { type: Number, required: false },
  gender: { type: String, required: false },
  location: { type: Object, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
});
