import { Router } from "express";
import { ProductoController } from '../controller/producto.controller.js';
import authRouter from "./authRouter.js";
import { CarritoController } from "../controller/carrito.controller.js";

const productoController = new ProductoController();
const carritoController = new CarritoController();
export class AppRoutes {


    static get routes(): Router {
        const router = Router();
        router.get('/api/productos', productoController.getProductos);
        router.get('/api/productos/buscar', productoController.buscarProductos);
        router.post("/carrito", carritoController.add.bind(carritoController));
        router.get("/carrito", carritoController.getAll.bind(carritoController));
        router.use("/api/auth", authRouter)
        return router
    }

}