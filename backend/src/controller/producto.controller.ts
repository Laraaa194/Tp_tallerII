import { type Request, type Response } from 'express';
import { ProductoService } from '../service/producto.service.js';

const productoService = new ProductoService();

const validarProducto = (body: any): { data?: any; error?: string } => {
  const { nombre, descripcion, clasificacion, precio, imagenUrl, stock } = body;

  if (!nombre || !descripcion || !clasificacion || precio === undefined || precio === null) {
    return { error: 'Faltan campos obligatorios' };
  }

  const precioNum = Number(precio);
  if (isNaN(precioNum) || precioNum <= 0) {
    return { error: 'El precio debe ser un número mayor a 0' };
  }

  const stockNum = stock !== undefined && stock !== null ? Number(stock) : 0;
  if (isNaN(stockNum) || stockNum < 0) {
    return { error: 'El stock debe ser un número mayor o igual a 0' };
  }

  return {
    data: {
      nombre,
      descripcion,
      clasificacion,
      precio: precioNum,
      imagenUrl: imagenUrl ?? '',
      stock: stockNum
    }
  };
};

export class ProductoController {

  public getProductos = async (req: Request, res: Response) => {
    try {
      const productos = await productoService.getProductos();
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  }

  public buscarProductos = async (req: Request, res: Response) => {
    try {
      const termino = req.query['termino'] as string ?? '';
      const productos = await productoService.buscarProductos(termino);
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      res.status(500).json({ message: 'Error al buscar productos' });
    }
  }

  public obtenerProducto = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
    try {
      const producto = await productoService.getProductoPorId(id);
      res.status(200).json(producto);
    } catch (error: any) {
      if (error.message === 'Producto no encontrado') {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ message: 'Error al obtener el producto' });
    }
  }

  public crearProducto = async (req: Request, res: Response) => {
    const { data, error } = validarProducto(req.body);
    if (error || !data) {
      res.status(400).json({ message: error });
      return;
    }
    try {
      const producto = await productoService.crearProducto(data);
      res.status(201).json(producto);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  }

  public actualizarProducto = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
    const { data, error } = validarProducto(req.body);
    if (error || !data) {
      res.status(400).json({ message: error });
      return;
    }
    try {
      const producto = await productoService.actualizarProducto(id, data);
      res.status(200).json(producto);
    } catch (error: any) {
      if (error.message === 'Producto no encontrado') {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  }

  public eliminarProducto = async (req: Request, res: Response) => {
    const id = Number(req.params['id']);
    if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
    }
    try {
      await productoService.eliminarProducto(id);
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error: any) {
      if (error.message === 'Producto no encontrado') {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ message: 'Error al eliminar el producto' });
    }
  }
}
