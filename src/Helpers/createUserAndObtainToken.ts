import User, { UserInterface } from '../Models/AuthSchema';
import jwt, { Secret } from 'jsonwebtoken';

const secreteKey: Secret = process.env.SECRETE_KEY || 'secrete';


export const createUserAndObtainToken = async () => {

  const userData = {
    firstName: 'Johnny',
    lastName: 'Davidson',
    birthDate: '2023-08-28',
    city: 'Alabama',
    country: 'United States',
    email: 'johnnydavidson@example.com',
    password: 'password',
    confirmPassword: 'password1',
  };

  const newUser = new User(userData);
  await newUser.save();

  const token = generateAuthToken(newUser);

  return { user: newUser, token };
};

const generateAuthToken = (user: UserInterface) => {
  return jwt.sign({ userId: user._id }, 'your-secret-key', {
    expiresIn: '1h', 
  });
};

export default createUserAndObtainToken;
