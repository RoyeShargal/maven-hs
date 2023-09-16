"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Users_schema_1 = require("./app/users/Users.schema");
const users_router_1 = require("./app/users/users.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3001; // process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_DB_URL);
exports.UserModel = mongoose_1.default.model("Users", Users_schema_1.usersSchema);
app.use("/users", users_router_1.usersRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
