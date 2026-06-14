import { type Request, type Response } from 'express';
import { ProductoService } from '../service/producto.service.js';

const productoService = new ProductoService();

export class ProductoController {

  public getProductos = async (req: Request, res: Response) => {
    try {
      const productos = await productoService.getProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  }

  public buscarProductos = async (req: Request, res: Response) => {
    try {
      const termino = req.query['termino'] as string ?? '';
      const productos = await productoService.buscarProductos(termino);
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar productos', error });
    }
  }
}