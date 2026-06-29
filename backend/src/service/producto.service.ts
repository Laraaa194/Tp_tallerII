import { ProductoRepository } from '../repository/producto.repository.js';

const productoRepository = new ProductoRepository();

export class ProductoService {

  async getProductos() {
    try {
      return await productoRepository.findAll();
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async buscarProductos(termino: string) {
    try {
      return await productoRepository.findByNombre(termino);
    } catch (error) {
      throw new Error('Error al buscar productos');
    }
  }

  async crearProducto(data: { nombre: string; descripcion: string; clasificacion: string; precio: number; imagenUrl: string; stock: number }) {
    try {
      return await productoRepository.crear(data);
    } catch (error) {
      throw new Error('Error al crear el producto');
    }
  }

  async actualizarProducto(id: number, data: { nombre: string; descripcion: string; clasificacion: string; precio: number; imagenUrl: string; stock: number }) {
    try {
      return await productoRepository.actualizar(id, data);
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async eliminarProducto(id: number) {
    try {
      return await productoRepository.eliminar(id);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}