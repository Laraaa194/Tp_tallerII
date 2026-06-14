
import { Router } from 'express';
import { ProductoController } from '../controller/producto.controller.js';

const productoController = new ProductoController();

export class AppRoutes {
  static get routes() {
    const router = Router();
    router.get('/api/productos', productoController.getProductos);
    router.get('/api/productos/buscar', productoController.buscarProductos);
    return router;
  }
}