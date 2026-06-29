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

  public actualizarProducto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params['id']);
      const { nombre, descripcion, clasificacion, precio, imagenUrl, stock } = req.body;
      if (!nombre || !descripcion || !clasificacion || !precio) {
        res.status(400).json({ message: 'Faltan campos obligatorios' });
        return;
      }
      const producto = await productoService.actualizarProducto(id, {
        nombre,
        descripcion,
        clasificacion,
        precio: Number(precio),
        imagenUrl: imagenUrl ?? '',
        stock: stock ? Number(stock) : 0
      });
      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  }

  public eliminarProducto = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params['id']);
      await productoService.eliminarProducto(id);
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }

  public crearProducto = async (req: Request, res: Response) => {
    try {
      const { nombre, descripcion, clasificacion, precio, imagenUrl, stock } = req.body;
      if (!nombre || !descripcion || !clasificacion || !precio) {
        res.status(400).json({ message: 'Faltan campos obligatorios' });
        return;
      }
      const producto = await productoService.crearProducto({
        nombre,
        descripcion,
        clasificacion,
        precio: Number(precio),
        imagenUrl: imagenUrl ?? '',
        stock: stock ? Number(stock) : 0
      });
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }
}