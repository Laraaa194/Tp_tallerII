import { ProductoRepository } from '../repository/producto.repository.js';

const productoRepository = new ProductoRepository();

export class ProductoService {

  async getProductos() {
    return productoRepository.findAll();
  }

  async buscarProductos(termino: string) {
    return productoRepository.findByNombre(termino);
  }

  async getProductoPorId(id: number) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  }

  async crearProducto(data: any) {
    return productoRepository.crear(data);
  }

  async actualizarProducto(id: number, data: any) {
    const existente = await productoRepository.findById(id);
    if (!existente) {
      throw new Error('Producto no encontrado');
    }
    return productoRepository.actualizar(id, data);
  }

  async eliminarProducto(id: number) {
    const existente = await productoRepository.findById(id);
    if (!existente) {
      throw new Error('Producto no encontrado');
    }
    return productoRepository.eliminar(id);
  }
}
