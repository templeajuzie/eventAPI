import request from 'supertest';
import express from 'express';
import {
  createEvent,
  getEvent,
  deleteEventByDay,
  getSingleEventById,
  deleteEventById,
} from '../../Controllers/EventControllers'; // Replace with the actual path to your route handlers
import { StatusCodes } from 'http-status-codes';

const app = express();
app.use(express.json());

describe('Event Routes', () => {



  describe('POST /api/v1/events', () => {
    it('should create an event', async () => {
      await request(app).post('/api/v1/events')
        .send({
          description: 'Sample Event',
          dayOfWeek: 'monday',
        })

      expect(StatusCodes.CREATED);

    });

    it('should return 401 for unauthorized access', async () => {
      await request(app).post('/api/v1/events').send({
        description: 'Sample Event',
        dayOfWeek: 'weekend',
      })

      expect(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('GET /api/v1/events', () => {
    it('should get user events', async () => {
      const response = await request(app).get('/api/v1/events')

      expect(StatusCodes.OK);

    });

    it('should return 401 for unauthorized access', async () => {
      await request(app).get('/api/v1/events')
      expect(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('DELETE /api/v1/events', () => {
    it('should delete events by day', async () => {
      const response = await request(app)
        .delete('/api/v1/events')
        .query({ dayOfWeek: 'Monday' })

      expect(StatusCodes.NO_CONTENT);

    });

    it('should return 401 for unauthorized access', async () => {
      await request(app).delete('/api/v1/events').query({ dayOfWeek: 'Monday' })

      expect(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('GET /api/v1/events/:id', () => {
    it('should get a single event by ID', async () => {

      const eventId = 'yourEventId';

      const response = await request(app).get(`/api/v1/events/${eventId}`)

      expect(StatusCodes.OK);

    });

    it('should return 401 for unauthorized access', async () => {

      const eventId = 'yourEventId';

      await request(app).get(`/api/v1/events/${eventId}`)

      expect(StatusCodes.UNAUTHORIZED);
    });

    it('should return 404 for non-existent event', async () => {
      const nonExistentEventId = 'nonExistentEventId';

      await request(app).get(`/api/v1/events/${nonExistentEventId}`)

      expect(StatusCodes.NOT_FOUND);
    });
  });

  describe('DELETE /api/v1/events/:id', () => {
    it('should delete a single event by ID', async () => {

      const eventId = 'yourEventId';

      const response = await request(app).delete(`/api/v1/events/${eventId}`)

      expect(StatusCodes.NO_CONTENT);
    });

    it('should return 401 for unauthorized access', async () => {

      const eventId = 'yourEventId';

      await request(app).delete(`/api/v1/events/${eventId}`)

      expect(StatusCodes.UNAUTHORIZED);
    });

    it('should return 404 for non-existent event', async () => {

      const nonExistentEventId = 'nonExistentEventId';

      await request(app).delete(`/api/v1/events/${nonExistentEventId}`)

      expect(StatusCodes.NOT_FOUND);
    });
  });

});
