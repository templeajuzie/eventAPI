"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventJoiSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.EventJoiSchema = joi_1.default.object({
    description: joi_1.default.string().min(5).required(),
    dayOfWeek: joi_1.default.string().lowercase().required(),
    userId: joi_1.default.string().required(),
}).options({ abortEarly: false });
