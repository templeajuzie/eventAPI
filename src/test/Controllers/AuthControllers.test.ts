import app from "../../server";
import supertest from "supertest";
import request from "supertest";
import { StatusCodes } from "http-status-codes";


describe('User Authentication suite', () => {

  describe('user sign up', () => {
    it('should return 201 when user sign up', async () => {

      await request(app).post('/api/v1/auth/signup').send({
        firstName: "Johnny",
        lastName: "Davidson",
        birthDate: "2023-08-28",
        city: "Alabama",
        country: "United States",
        email: "johnnydavidson2@example.com",
        password: "password2",
        confirmPassword: "password1"
      });

    })

    expect(StatusCodes.CREATED);

    it('should return an error when user sign up with invalid data', async () => {
      await request(app).post('/api/v1/auth/signup').send({
        firstName: "Johnny",
        lastName: "Davidson",
        birthDate: "2023-08-28",
        city: "Alabama",
        country: "United States",
        email: "johnnydavidson2example.com",
        password: "password2",
        confirmPassword: "password1"
      });

      expect(StatusCodes.BAD_REQUEST);
    });

  });


  describe('User Sign In', () => {

    it('should return 200 when user signs in with valid credentials', async () => {
      await request(app).post('/api/v1/auth/signin').send({
        email: "johnnydavidson2@example.com",
        password: "password2",
      });

      expect(StatusCodes.OK);
    });

    it('should return 401 when user signs in with invalid credentials', async () => {
      await request(app).post('/api/v1/auth/signin').send({
        email: "johnnydavidson2@example.com",
        password: "incorrectpassword",
      });

      expect(StatusCodes.UNAUTHORIZED);
    });

    it('should return 400 when user signs in with missing credentials', async () => {
      await request(app).post('/api/v1/auth/signin').send({
      });


      expect(StatusCodes.BAD_REQUEST);
    });
  });
})