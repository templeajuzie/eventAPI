"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.error = 'Not Found';
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
        this.message = message;
    }
}
exports.default = NotFoundError;
