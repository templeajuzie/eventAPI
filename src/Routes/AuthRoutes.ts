import express, { Router } from 'express';
import { signUp, signIn } from '../Controllers/AuthControllers';

const authRouter: Router = express.Router();

authRouter.route('/users/sign-up').post(signUp);
authRouter.route('/users/sign-in').post(signIn);


export default authRouter;
