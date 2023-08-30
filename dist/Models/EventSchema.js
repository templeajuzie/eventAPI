"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        minLength: 5,
    },
    dayOfWeek: {
        type: String,
        enum: [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ],
        required: true,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
}, { timestamps: true });
const EventModel = mongoose_1.default.model('Events', EventSchema);
exports.default = EventModel;
