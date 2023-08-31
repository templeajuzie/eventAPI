"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.error = 'ValidationError';
        this.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        this.message = message;
    }
}
exports.default = ValidationError;
