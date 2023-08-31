"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const http_status_codes_1 = require("http-status-codes");
const InternalServerError = (err, req, res, next) => {
    const errorMessage = {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Internal Server Error",
        error: "Internal Server Error",
    };
    res.status(errorMessage.statusCode).json(errorMessage);
};
exports.InternalServerError = InternalServerError;
