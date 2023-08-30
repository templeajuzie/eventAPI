import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '../Models/AuthSchema';
import * as dotenv from 'dotenv';
dotenv.config();

const secretKey: Secret = 'secrete';

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('middleware check');

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  console.log('token exists');

  try {
    const decodedToken: any = jwt.verify(token, secretKey);

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'User not found' });
    }

    (req as any).user = user;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid token' });
  }
};

export default checkUser;
