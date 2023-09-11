import { Router } from 'express';
import AuthChecker from '../Middlewares/AuthChecker';
import {
  createEvent,
  getEvent,
  deleteEventByDay,
  getSingleEventById,
  deleteEventById,
} from '../Controllers/EventControllers';

const eventRouter = Router();

eventRouter.route('/events').get(AuthChecker, getEvent);
eventRouter.route('/events').post(AuthChecker, createEvent);
eventRouter.route('/events').delete(AuthChecker, deleteEventByDay);
eventRouter.route('/events/:id').get(AuthChecker, getSingleEventById);
eventRouter.route('/events/:id').delete(AuthChecker, deleteEventById);

export default eventRouter;
