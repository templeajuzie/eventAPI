
import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();



describe('Server Tests', () => {
  it('responds with 404 for unknown route', async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
    expect(response.text).toBe('404 - Page Not Found');
  });

});
