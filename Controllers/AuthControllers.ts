import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../Models/AuthSchema';
import { UserJoiSchema } from '../Utils/AuthJoiSchema';
import { StatusCodes } from 'http-status-codes';
import {CreateTokenRequest} from '../Helpers/CreateToken';
import * as dotenv from 'dotenv';
dotenv.config();

// const secreteKey: Secret = process.env.SECRETE_KEY || 'secrete';
const secreteKey: Secret =  'secrete';

interface UserSignUpInterface {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserSignInInterface {
  email: string;
  password: string;
}

export const signUp = async (req: Request, res: Response) => {
  

  const {
    firstName,
    lastName,
    birthDate,
    city,
    country,
    email,
    password,
    confirmPassword,
  } = req.body as UserSignUpInterface;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'User already exists' });
    }

    const { error, value } = UserJoiSchema.validate({
      firstName,
      lastName,
      birthDate,
      city,
      country,
      email,
      password,
      confirmPassword,
    });

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }

    const newUser = await User.create(value);

    console.log(newUser);

    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {}
};

export const signIn = async (req: Request, res: Response) => {

  const { email, password } = req.body as UserSignInInterface;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await oldUser.compareUserPassword(password)

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid credentials' });
    }

    const token = CreateTokenRequest({ id: oldUser._id })

    res.setHeader('Authorization', 'Bearer ' + token);
    res.status(StatusCodes.OK).json({data: oldUser, token: token});
    
    
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Something went wrong' });
  }
};
