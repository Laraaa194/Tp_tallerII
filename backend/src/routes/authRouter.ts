import { Router } from "express";
import { LoginController } from "../controller/login.controller.js"; 

const authRouter = Router();
const loginController = new LoginController();


authRouter.post('/', loginController.procesarLogin.bind(loginController));

export default authRouter;