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
exports.checkUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const AuthSchema_1 = __importDefault(require("../Models/AuthSchema"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const secretKey = 'secrete';
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('middleware check');
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];
    console.log('token exists');
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        const user = yield AuthSchema_1.default.findById(decodedToken.id);
        if (!user) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: 'User not found' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid token' });
    }
});
exports.checkUser = checkUser;
exports.default = exports.checkUser;
