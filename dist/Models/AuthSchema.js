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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const gensalt = bcrypt_1.default.genSalt(saltRounds);
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 5,
    },
    birthDate: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
}, { timestamps: true });
UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield bcrypt_1.default.hash(this.password, yield gensalt);
        this.password = hashPassword;
        this.confirmPassword = hashPassword;
    });
});
UserSchema.methods.compareUserPassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isMatch = yield bcrypt_1.default.compare(candidatePassword, this.password);
            return isMatch;
        }
        catch (error) {
            return false;
        }
    });
};
const User = mongoose_1.default.model('Users', UserSchema);
exports.default = User;
