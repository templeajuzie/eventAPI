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
exports.deleteEventById = exports.getSingleEventById = exports.deleteEventByDay = exports.getEvent = exports.createEvent = void 0;
const http_status_codes_1 = require("http-status-codes");
const EventSchema_1 = __importDefault(require("../Models/EventSchema"));
const EventJoiSchema_1 = require("../Utils/EventJoiSchema");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, dayOfWeek } = req.body;
    try {
        const getUserId = yield req.user._id.toString();
        console.log(getUserId);
        // const checkUser = await (req as any).use;
        if (!getUserId) {
            return false;
        }
        console.log(true + 'user account exists');
        const { error, value } = EventJoiSchema_1.EventJoiSchema.validate({
            description,
            dayOfWeek,
            userId: getUserId,
        });
        if (error) {
            return res.send(error);
        }
        console.log('create event in progress');
        const createEvent = yield EventSchema_1.default.create(value);
        console.log('create event in progress');
        res.status(http_status_codes_1.StatusCodes.CREATED).json(createEvent);
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(error);
    }
});
exports.createEvent = createEvent;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUserId = yield req.user._id.toString();
        console.log(getUserId);
        // const checkUser = await (req as any).use;
        if (!getUserId) {
            return false;
        }
        const getUserEvent = yield EventSchema_1.default.find({ userId: getUserId });
        if (!getUserEvent) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'User not found' });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(getUserEvent);
    }
    catch (error) { }
});
exports.getEvent = getEvent;
const deleteEventByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventDay = req.query;
    console.log(eventDay);
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            return false;
        }
        const getallEvents = yield EventSchema_1.default.find(eventDay);
        yield EventSchema_1.default.deleteMany(eventDay).exec();
        res.status(http_status_codes_1.StatusCodes.OK).json({ deletedEvents: getallEvents });
    }
    catch (error) { }
});
exports.deleteEventByDay = deleteEventByDay;
const getSingleEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            return false;
        }
        const getUserEvent = yield EventSchema_1.default.findById(id);
        if (!getUserEvent) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Event not found' });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(getUserEvent);
    }
    catch (error) { }
});
exports.getSingleEventById = getSingleEventById;
const deleteEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: 'Unauthorized' });
        }
        const getUserEvent = yield EventSchema_1.default.findByIdAndDelete(id);
        if (!getUserEvent) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: 'Event not found' });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Event deleted successfully' });
    }
    catch (error) { }
});
exports.deleteEventById = deleteEventById;
