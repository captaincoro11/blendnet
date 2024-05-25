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
exports.dashboard = exports.login = exports.register = void 0;
const user_1 = require("../middleware/model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!email) {
            return res.status(401).json({
                message: "Please Enter Email"
            });
        }
        if (!password) {
            return res.status(401).json({
                message: "Please Enter Password"
            });
        }
        if (!name) {
            return res.status(401).json({
                message: "Please Enter Name"
            });
        }
        if (password.length < 6) {
            return res.status(403).json({
                message: "Password length should be minimum 6 characters"
            });
        }
        const user = yield user_1.User.findOne({
            email: email
        });
        if (user) {
            return res.status(402).json({
                message: "User already exists"
            });
        }
        ;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const token = yield jsonwebtoken_1.default.sign(email, process.env.JWT_SECRET_KEY);
        const newUser = yield user_1.User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        };
        res.cookie("token", token, options).status(200).json({
            message: "User Registered Successfully",
            newUser,
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(401).json({
            message: "Please Enter Username"
        });
    }
    if (!password) {
        return res.status(401).json({
            message: "Please Enter Password"
        });
    }
    ;
    const user = yield user_1.User.findOne({
        email: email
    });
    if (!user) {
        return res.status(401).json({
            message: "User not found please register first"
        });
    }
    ;
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        return res.status(402).json({
            message: "Wrong password please try again"
        });
    }
    console.log(isMatch);
    const token = yield jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET_KEY);
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    };
    res.cookie("token", token, options).json({
        message: "User logged in successfully",
        user,
        token,
    });
});
exports.login = login;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = [
            {
                "merchantCode": "SD00020871",
                "approvedCreditLimit": 100000,
                "availableCreditLimit": 50000,
                "effectiveStartDate": "17-02-2022",
                "effectiveEndDate": "18-05-2022",
                "transactions": [
                    {
                        "transactionRef": "63424",
                        "transactionDate": "17-02-2022",
                        "transactionAmount": 50000,
                        "interestAmount": 653.85,
                        "repaymentDetails": [
                            {
                                "amount": 50654,
                                "date": "17-03-2022",
                                "paidOn": null
                            }
                        ],
                        "outstandingAmount": 50654,
                        "paidAmount": 0,
                        "status": "Unpaid",
                        "paymentLink": {
                            "link": "https://fndf.in",
                            "expiryDate": "18-02-2022"
                        },
                        "orderId": "118"
                    },
                    {
                        "transactionRef": "63416",
                        "transactionDate": "17-02-2022",
                        "transactionAmount": 10000,
                        "interestAmount": 130.78,
                        "repaymentDetails": [
                            {
                                "amount": 10131,
                                "date": "17-03-2022",
                                "paidOn": "17-02-2022"
                            }
                        ],
                        "outstandingAmount": 0,
                        "paidAmount": 10131,
                        "status": "Paid",
                        "paymentLink": {
                            "link": "https://fndf.in",
                            "expiryDate": "18-02-2022"
                        },
                        "orderId": "115"
                    }
                ]
            }
        ];
        const messsage = JSON.stringify(data);
        res.status(200).json({
            messsage,
            message: "successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});
exports.dashboard = dashboard;
