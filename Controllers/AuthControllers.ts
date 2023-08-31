import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../Models/AuthSchema';
import { UserJoiSchema } from '../Utils/AuthJoiSchema';
import { StatusCodes } from 'http-status-codes';
import { CreateTokenRequest } from '../Helpers/CreateToken';

import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from '../Error/Index';


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
  } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      throw new UnauthorizedError('Unauthorized');
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
      throw new ValidationError(error.message);
    }

    const newUser = await User.create(value);

    return res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) {
      throw new NotFoundError('Not found');
    }

    const isPasswordCorrect = await oldUser.compareUserPassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Unauthorized');
    }

    const token = CreateTokenRequest({ id: oldUser._id });

    res.setHeader('Authorization', 'Bearer ' + token);
    res.status(StatusCodes.OK).json({ data: oldUser, token: token });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
