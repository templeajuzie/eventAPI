import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const secreteKey: Secret = process.env.SECRETE_KEY || '';

export const AuthChecker = (req:Request , res:Response, next:NextFunction ) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, secreteKey || '');
    req.body.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }

}