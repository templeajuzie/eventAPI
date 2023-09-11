import { StatusCodes } from "http-status-codes";

class NotFoundError extends Error {
  statusCode: number;
  error: string;

  constructor(message: string) {
    super(message);
    this.error = 'Not Found';
    this.statusCode = StatusCodes.NOT_FOUND;
    this.message = message;
  }
}

export default NotFoundError;
