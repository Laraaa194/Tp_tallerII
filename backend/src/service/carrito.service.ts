import { CarritoRepository } from "../repository/carrito.repository.js";
import { ProductoRepository } from "../repository/producto.repository.js";

const repo = new CarritoRepository();
const productoRepo = new ProductoRepository();

export class CarritoService {

    async addItem(productoId: number, cantidad: number) {
    const producto = await productoRepo.findById(productoId);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }
    if (producto.stock < cantidad) {
      throw new Error("No hay stock disponible");
    }

    const item = await repo.findByProductoId(productoId);

    await productoRepo.updateStock(
      producto.id,
      producto.stock - cantidad
    );

    if (item) {
      return repo.updateCantidad(
        item.id,
        item.cantidad + cantidad
      );
    }

    return repo.addItem(productoId, cantidad);
  }

  getAll() {
    return repo.getAll();
  }
}