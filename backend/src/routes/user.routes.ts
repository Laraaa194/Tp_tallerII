import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';

export const userRoutes = Router();

userRoutes.post('/register', UserController.register);
