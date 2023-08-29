"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signIn = exports.signUp = void 0;
const AuthSchema_1 = __importDefault(require("../Models/AuthSchema"));
const AuthJoiSchema_1 = require("../Utils/AuthJoiSchema");
const http_status_codes_1 = require("http-status-codes");
const CreateToken_1 = require("../Helpers/CreateToken");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const secreteKey = process.env.SECRETE_KEY;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, birthDate, city, country, email, password, confirmPassword, } = req.body;
    try {
        const oldUser = yield AuthSchema_1.default.findOne({ email });
        if (oldUser) {
            return res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json({ message: 'User already exists' });
        }
        const { error, value } = AuthJoiSchema_1.UserJoiSchema.validate({
            firstName,
            lastName,
            birthDate,
            city,
            country,
            email,
            password,
            confirmPassword,
        });
        if (error) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: error.message });
        }
        const newUser = yield AuthSchema_1.default.create(value);
        console.log(newUser);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(newUser);
    }
    catch (error) { }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const oldUser = yield AuthSchema_1.default.findOne({ email });
        if (!oldUser) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'User does not exist' });
        }
        const isPasswordCorrect = yield oldUser.compareUserPassword(password);
        if (!isPasswordCorrect) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Invalid credentials' });
        }
        const token = (0, CreateToken_1.CreateTokenRequest)({ email: oldUser.email, id: oldUser._id });
        res.setHeader('Authorization', 'Bearer ' + token);
        res.status(http_status_codes_1.StatusCodes.OK).json(oldUser);
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Something went wrong' });
    }
});
exports.signIn = signIn;
