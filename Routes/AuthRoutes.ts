import express, { Router } from 'express';
import { signUp, signIn } from '../Controllers/AuthControllers';

const router: Router = express.Router();

router.route('/users/sign-up').post(signUp);
router.route('/users/sign-in').post(signIn);

export default router;
