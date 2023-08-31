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
exports.signIn = exports.signUp = void 0;
const AuthSchema_1 = __importDefault(require("../Models/AuthSchema"));
const AuthJoiSchema_1 = require("../Utils/AuthJoiSchema");
const http_status_codes_1 = require("http-status-codes");
const CreateToken_1 = require("../Helpers/CreateToken");
const Index_1 = require("../Error/Index");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, birthDate, city, country, email, password, confirmPassword, } = req.body;
    try {
        const oldUser = yield AuthSchema_1.default.findOne({ email });
        if (oldUser) {
            throw new Index_1.UnauthorizedError('Unauthorized');
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
            throw new Index_1.ValidationError(error.message);
        }
        const newUser = yield AuthSchema_1.default.create(value);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(newUser);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const oldUser = yield AuthSchema_1.default.findOne({ email });
        if (!oldUser) {
            throw new Index_1.NotFoundError('Not found');
        }
        const isPasswordCorrect = yield oldUser.compareUserPassword(password);
        if (!isPasswordCorrect) {
            throw new Index_1.UnauthorizedError('Unauthorized');
        }
        const token = (0, CreateToken_1.CreateTokenRequest)({ id: oldUser._id });
        res.setHeader('Authorization', 'Bearer ' + token);
        res.status(http_status_codes_1.StatusCodes.OK).json({ data: oldUser, token: token });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.signIn = signIn;
