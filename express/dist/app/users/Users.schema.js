"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.usersSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    maxStepsReached: { type: Number, required: false },
    gender: { type: String, required: false },
    location: { type: Object, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
});
