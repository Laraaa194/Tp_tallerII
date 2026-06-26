import { Router } from "express";
import { ProductoController } from '../controller/producto.controller.js';
import authRouter from "./authRouter.js";

const productoController = new ProductoController();
export class AppRoutes {


    static get routes(): Router {
        const router = Router();
        router.get('/api/productos', productoController.getProductos);
        router.get('/api/productos/buscar', productoController.buscarProductos);
        router.use("/api/auth", authRouter)
        return router
    }


}