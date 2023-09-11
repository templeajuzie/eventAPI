import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserInterface } from '../Models/AuthSchema';
import Event from '../Models/EventSchema';
import { EventJoiSchema } from '../Utils/EventJoiSchema';

import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from '../Error/Index';

export const createEvent = async (req: Request, res: Response) => {
  const { description, dayOfWeek } = req.body;

  try {
    const getUserId = await (req as any).user._id.toString();


    if (!getUserId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const { error, value } = EventJoiSchema.validate({
      description,
      dayOfWeek,
      userId: getUserId,
    });

    if (error) {
      throw new ValidationError(error.message);
    }

    const createEvent = await Event.create(value);

    res.status(StatusCodes.CREATED).json(createEvent);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const getUserId = await (req as any).user._id.toString();

    if (!getUserId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const getUserEvent = await Event.find({ userId: getUserId });

    if (!getUserEvent) {
      throw new NotFoundError('Event not found');
    }

    res.status(StatusCodes.OK).json(getUserEvent);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const deleteEventByDay = async (req: Request, res: Response) => {
  const eventDay = req.query;

  try {
    const getUserId: string = await (req as any).user._id.toString();

    if (!getUserId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const getallEvents = await Event.find(eventDay);
    await Event.deleteMany(eventDay).exec();

    res.status(StatusCodes.NO_CONTENT).json({ deletedEvents: getallEvents });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getSingleEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getUserId = await (req as any).user._id.toString();

    if (!getUserId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const getUserEvent = await Event.findById(id);

    if (!getUserEvent) {
      throw new NotFoundError('Event not found');
    }

    res.status(StatusCodes.OK).json(getUserEvent);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const deleteEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getUserId = await (req as any).user._id.toString();

    if (!getUserId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const getUserEvent = await Event.findByIdAndDelete(id);

    if (!getUserEvent) {
      throw new NotFoundError('Event not found');
    }

    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: 'Event deleted' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
