"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const app = express_1.default.Router();
app.use(express_1.default.json());
app.post('/signup', user_1.register);
app.post('/login', user_1.login);
app.get('/dashboard', user_1.dashboard);
exports.default = app;
