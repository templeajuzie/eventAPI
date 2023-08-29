"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserJoiSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(5).required(),
    lastName: joi_1.default.string().min(5).required(),
    birthDate: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().required()
}).options({ abortEarly: false });
