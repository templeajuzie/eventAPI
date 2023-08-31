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
const Index_1 = require("../Error/Index");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, dayOfWeek } = req.body;
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            throw new Index_1.UnauthorizedError('Unauthorized');
        }
        const { error, value } = EventJoiSchema_1.EventJoiSchema.validate({
            description,
            dayOfWeek,
            userId: getUserId,
        });
        if (error) {
            throw new Index_1.ValidationError(error.message);
        }
        const createEvent = yield EventSchema_1.default.create(value);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(createEvent);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.createEvent = createEvent;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            throw new Index_1.UnauthorizedError('Unauthorized');
        }
        const getUserEvent = yield EventSchema_1.default.find({ userId: getUserId });
        if (!getUserEvent) {
            throw new Index_1.NotFoundError('Event not found');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(getUserEvent);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.getEvent = getEvent;
const deleteEventByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventDay = req.query;
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            throw new Index_1.UnauthorizedError('Unauthorized');
        }
        const getallEvents = yield EventSchema_1.default.find(eventDay);
        yield EventSchema_1.default.deleteMany(eventDay).exec();
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ deletedEvents: getallEvents });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.deleteEventByDay = deleteEventByDay;
const getSingleEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            throw new Index_1.UnauthorizedError('Unauthorized');
        }
        const getUserEvent = yield EventSchema_1.default.findById(id);
        if (!getUserEvent) {
            throw new Index_1.NotFoundError('Event not found');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(getUserEvent);
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.getSingleEventById = getSingleEventById;
const deleteEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const getUserId = yield req.user._id.toString();
        if (!getUserId) {
            throw new Index_1.UnauthorizedError('Unauthorized');
        }
        const getUserEvent = yield EventSchema_1.default.findByIdAndDelete(id);
        if (!getUserEvent) {
            throw new Index_1.NotFoundError('Event not found');
        }
        res
            .status(http_status_codes_1.StatusCodes.NO_CONTENT)
            .json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
});
exports.deleteEventById = deleteEventById;
