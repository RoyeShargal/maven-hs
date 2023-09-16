"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUserDataAxiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.randomUserDataAxiosInstance = axios_1.default.create({
    baseURL: process.env.RANDOM_USER_API_URL,
});
