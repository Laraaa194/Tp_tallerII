import { Router } from "express";
import { ProductoController } from '../controller/producto.controller.js';
import authRouter from "./authRouter.js";
import { CarritoController } from "../controller/carrito.controller.js";
import { userRoutes } from "./user.routes.js";
import { authMiddleware, rolMiddleware } from "../middlewares/auth.middleware.js";

const productoController = new ProductoController();
const carritoController = new CarritoController();

export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        router.get('/api/productos', productoController.getProductos);
        router.get('/api/productos/buscar', productoController.buscarProductos);
        router.post('/api/productos', authMiddleware, rolMiddleware, productoController.crearProducto);
        router.put('/api/productos/:id', authMiddleware, rolMiddleware, productoController.actualizarProducto);
        router.delete('/api/productos/:id', authMiddleware, rolMiddleware, productoController.eliminarProducto);
        router.post("/carrito", authMiddleware, carritoController.add.bind(carritoController));
        router.get("/carrito", authMiddleware, carritoController.getAll.bind(carritoController));
        router.patch("/carrito/:id", authMiddleware, carritoController.updateCantidad.bind(carritoController));
        router.delete("/carrito/:id", authMiddleware, carritoController.remove.bind(carritoController));
        router.use("/api/auth", authRouter);
        router.use("/api/users", userRoutes);
        return router;
    }

}