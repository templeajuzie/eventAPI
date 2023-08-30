import { Errback, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


export const InternalServerError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR || 500;
  const message = err.message || "Internal Server Error";
  
  if (err.name === "ValidationError") {

    // const errorResponse = {
    //   type: "Validation error",
    //   errors: Object.keys(err.errors).map((field) => ({
    //     resource: field,
    //     message: err.errors[field].message,
    //   })),
    // };
    // return res.status(statusCode).json(errorResponse);
  }
  res.status(statusCode).json({ error: message });
};


