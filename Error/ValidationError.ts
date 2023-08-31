import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.error = 'ValidationError';
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
  }
}

export default ValidationError;
