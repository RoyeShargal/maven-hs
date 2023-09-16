"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putNewScore = exports.GetScores = exports.CreateUser = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("../..");
const users_aggregations_1 = require("./users.aggregations");
const utils_1 = require("./utils");
const CreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userName = req.body.username;
    const userExists = yield __1.UserModel.findOne({ username: userName });
    if (userExists) {
        res.status(400).json({ error: true, errMessage: "Username taken!" });
        return;
    }
    // create user:
    const createdUser = yield __1.UserModel.create({ username: userName });
    // Guess user gender:
    const inferredGender = yield (0, utils_1.guessUserGender)(userName);
    // enrich user details:
    const genderFilter = inferredGender !== "undetermined" ? inferredGender : "";
    const enrichedDetailsResponse = yield axios_1.default.get(`https://randomuser.me/api/?gender=${genderFilter}`);
    const enrichedUserData = (_a = enrichedDetailsResponse.data.results) === null || _a === void 0 ? void 0 : _a[0];
    const userAddedData = {
        gender: inferredGender,
        location: enrichedUserData.location,
        email: enrichedUserData.email,
        phone: enrichedUserData.phone,
    };
    const enrichedUser = yield __1.UserModel.findByIdAndUpdate(createdUser._id, userAddedData);
    return enrichedUser;
});
exports.CreateUser = CreateUser;
const GetScores = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usersSortedByScores = yield __1.UserModel.aggregate(users_aggregations_1.usersSorterByStepsAggregation);
    return usersSortedByScores;
});
exports.GetScores = GetScores;
const putNewScore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { username, score } = req.body;
    const currentUser = yield __1.UserModel.findOne({ username });
    // would do a middleware to check this :)
    const userId = currentUser === null || currentUser === void 0 ? void 0 : currentUser._id;
    if (!userId)
        return "user does not exist!";
    if (score === null)
        return "No score was sent!";
    const currentUserScore = (_b = currentUser === null || currentUser === void 0 ? void 0 : currentUser.maxStepsReached) !== null && _b !== void 0 ? _b : 0;
    // if already had better/equal score
    if (currentUserScore >= score)
        return "user already had a better/equal score!";
    // update score
    else {
        yield __1.UserModel.findByIdAndUpdate(userId, {
            maxStepsReached: score,
        });
        return `Congratulations! new score: ${score}`;
    }
});
exports.putNewScore = putNewScore;
