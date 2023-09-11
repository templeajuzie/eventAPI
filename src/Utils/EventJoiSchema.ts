import Joi from 'joi';
import { UserInterface } from '../Models/AuthSchema';
import {EventInterface} from '../Models/EventSchema';


export const EventJoiSchema = Joi.object<EventInterface>({
  description: Joi.string().min(5).required(),
  dayOfWeek: Joi.string().lowercase().required(),
  userId: Joi.string().required(),
}).options({ abortEarly: false });