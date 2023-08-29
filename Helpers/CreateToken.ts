import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const secreteKey = process.env.SECRETE_KEY;

// export const CreateTokenRequest = (payload: object): string => {
//   const createToken = jwt.sign(payload, secreteKey, { expiresIn: '1d' });
//   return createToken;
// }
