import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const secreteKey = process.env.SECRETE_KEY || '';

const MaxAge = 3*24*60*60;

export const CreateTokenRequest = (payload: object): string => {
  const createToken = jwt.sign(payload, secreteKey, { expiresIn: MaxAge });
  return createToken;
}
