import { Router } from "express";
import authRouter from "./authRouter.js";

export class AppRoutes {


    static get routes(): Router {
        const router = Router();

       // router.use("/api/productos")
        router.use("/api/auth", authRouter)
        return router
    }

}