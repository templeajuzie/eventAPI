"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthControllers_1 = require("../Controllers/AuthControllers");
const router = express_1.default.Router();
router.route('/users/sign-up').post(AuthControllers_1.signUp);
router.route('/users/sign-in').post(AuthControllers_1.signIn);
exports.default = router;
