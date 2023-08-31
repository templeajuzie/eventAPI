# Compass 3rd Challenge "Express.js and TypeScript Project" by Temple Ajuzie

This is a sample project that demonstrates how to create a RESTful API using Express.js and TypeScript. The project includes features for user authentication and event management.

## Prerequisites

- Node.js Version = 12.0.0 - and above
- npm Version= 6.0.0 and above
- MongoDB Version= 4.0.0 and above

################################ Follow the instructions

## Installation

1. Clone the repository on Github.com

## Clone repo
git clone https://github.com/templeajuzie/eventAPI.git

## Change directory to project directory after clone
cd eventAPI

## Open Vs code directly from your terminal
code .

2. Install dependencies:
npm install


3. Set up environment variables:
Create a .env file in the root directory and add the following variables:

PORT=3000
MONGODB_URI= database_url
JWT_SECRET=your-secret-key


## Running the Application

npm start

The application will run on http://localhost:8000 or http://localhost:5000 by default. You can change the port by modifying the PORT variable in the .env file.

## Here is a list of all the API Endpoints for this application


#User Authentication API endpoint

POST /signup         #Create a new user account.
POST /signin         #Log in a user.


#Event Management API endpoint

POST /events         #Create a new event.
GET /events          #Get all events for the authenticated user.
GET /events/:id      #Get a single event by ID.
DELETE /events/:id   #Delete a single event by ID.
DELETE /events:      #Delete multiple events based on query parameters.


#Error Handling

The project includes custom error handling for different scenarios, such as unauthorized access, validation errors, and resource not found.

1. Not Found Error
2. Unauthorized Error
3. Validation Error
4. Internal Server Error

## Libraries Used

Express.js               #Web application framework.
TypeScript               #Superset of JavaScript with static typing.
MongoDB                  #NoSQL database for storing data.
JWT (jsonwebtoken)       #Token-based authentication.
Bcrypt                   #Library for hashing passwords.
Joi                      #Data validation library.
http-status-codes        #collection of HTTP status codes.
Custom error handling    #Custom error classes for different scenarios.


Project Structure
The project follows a modular structure with separate directories for models, routes, controllers, utils, and error handling.

src/
├── Models/
│   ├── AuthSchema.ts
│   ├── EventSchema.ts
├── Routes/
│   ├── AuthRoutes.ts
│   ├── EventRoutes.ts
├── Controllers/
│   ├── AuthController.ts
│   ├── EventController.ts
├── Utils/
│   ├── AuthJoiSchema.ts
│   ├── EventJoiSchema.ts
│   ├── CreateToken.ts
├── Error/
│   ├── Index.ts
│   ├── NotFound Error
│   ├── UnAuthorizedError
│   ├── Validation Error
├── Server.ts
.env

## For further information, reach out to me via email: temple.ajuzie@academy.compass.uol