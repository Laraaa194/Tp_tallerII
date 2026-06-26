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
}