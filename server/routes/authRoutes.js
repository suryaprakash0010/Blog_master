import express from 'express';
import { login, signup, createAdmin } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.post('/create-admin', createAdmin);

export default authRouter;
