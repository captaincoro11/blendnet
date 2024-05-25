"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
const url = process.env.DATABASE_URL;
const connectDatabase = () => {
    mongoose_1.default.connect(url)
        .then((con) => console.log(`Database Connected : ${con.connection.host}`))
        .catch((error) => console.log(error));
};
exports.connectDatabase = connectDatabase;
