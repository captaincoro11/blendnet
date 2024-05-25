"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const dotenv = require('dotenv');
dotenv.config({});
const port = process.env.PORT;
(0, db_1.connectDatabase)();
app.use('/user', userRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello User"
    });
});
app.listen(port, () => {
    console.log(`LET's Go at ${port}`);
});
