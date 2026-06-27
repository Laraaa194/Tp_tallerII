import { Router } from 'express';
import { UserController } from '../controller/user.controller.js';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.register);
