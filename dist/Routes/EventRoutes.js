"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthChecker_1 = __importDefault(require("../Middlewares/AuthChecker"));
const EventControllers_1 = require("../Controllers/EventControllers");
const eventRouter = (0, express_1.Router)();
eventRouter.route('/events').get(AuthChecker_1.default, EventControllers_1.getEvent);
eventRouter.route('/events').post(AuthChecker_1.default, EventControllers_1.createEvent);
eventRouter.route('/events').delete(AuthChecker_1.default, EventControllers_1.deleteEventByDay);
eventRouter.route('/events/:id').get(AuthChecker_1.default, EventControllers_1.getSingleEventById);
eventRouter.route('/events/:id').delete(AuthChecker_1.default, EventControllers_1.deleteEventById);
exports.default = eventRouter;
