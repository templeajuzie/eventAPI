import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserInterface } from '../Models/AuthSchema';
import Event from '../Models/EventSchema';
import { EventJoiSchema } from '../Utils/EventJoiSchema';


export const createEvent = async (req: Request, res: Response) => {
  const { description, dayOfWeek } = req.body;

  try {
    const getUserId = await (req as any).user._id.toString();

    console.log(getUserId);
    // const checkUser = await (req as any).use;

    if (!getUserId) {
      return false;
    }

    console.log(true + 'user account exists');

    const { error, value } = EventJoiSchema.validate({
      description,
      dayOfWeek,
      userId: getUserId,
    });

    if (error) {
      return res.send(error);
    }

    console.log('create event in progress');

    const createEvent = await Event.create(value);

    console.log('create event in progress');

    res.status(StatusCodes.CREATED).json(createEvent);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(error);
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const getUserId = await (req as any).user._id.toString();

    console.log(getUserId);
    // const checkUser = await (req as any).use;

    if (!getUserId) {
      return false;
    }

    const getUserEvent = await Event.find({ userId: getUserId });

    if (!getUserEvent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    res.status(StatusCodes.OK).json(getUserEvent);
  } catch (error) {}
};

export const deleteEventByDay = async (req: Request, res: Response) => {
  const eventDay = req.query;

  console.log(eventDay);

  try {
    const getUserId: string = await (req as any).user._id.toString();

    if (!getUserId) {
      return false;
    }

    const getallEvents = await Event.find(eventDay);
    await Event.deleteMany(eventDay).exec();

    res.status(StatusCodes.OK).json({ deletedEvents: getallEvents });
  } catch (error) {}
};

export const getSingleEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getUserId = await (req as any).user._id.toString();

    if (!getUserId) {
      return false;
    }

    const getUserEvent = await Event.findById(id);

    if (!getUserEvent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Event not found' });
    }

    res.status(StatusCodes.OK).json(getUserEvent);
  } catch (error) {}
};

export const deleteEventById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const getUserId = await (req as any).user._id.toString();

    if (!getUserId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized' });
    }

    const getUserEvent = await Event.findByIdAndDelete(id);

    if (!getUserEvent) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Event not found' });
    }

    res.status(StatusCodes.OK).json({ message: 'Event deleted successfully' });
  } catch (error) {}
};
