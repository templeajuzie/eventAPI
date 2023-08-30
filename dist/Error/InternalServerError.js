"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const InternalServerError = (err, req, res, next) => {
    const statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR || 500;
    const message = err.message || "Internal Server Error";
    if (err.name === "ValidationError") {
        const errorResponse = {
            type: "Validation error",
            errors: Object.keys(err.errors).map((field) => ({
                resource: field,
                message: err.errors[field].message,
            })),
        };
        return res.status(statusCode).json(errorResponse);
    }
    res.status(statusCode).json({ error: message });
};
