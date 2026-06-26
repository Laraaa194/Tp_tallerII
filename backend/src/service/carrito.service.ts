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

   async updateCantidad(itemId: number, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      throw new Error("La cantidad debe ser mayor a 0");
    }

    const item = await repo.findById(itemId);

    if (!item) {
      throw new Error("Item de carrito no encontrado");
    }

    const producto = await productoRepo.findById(item.productoId);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // diferencia entre lo que pide ahora y lo que ya tenía reservado
    const diferencia = nuevaCantidad - item.cantidad;

    // si pide más, hay que descontar esa diferencia del stock disponible
    if (diferencia > 0 && producto.stock < diferencia) {
      throw new Error("No hay stock disponible");
    }

    await productoRepo.updateStock(
      producto.id,
      producto.stock - diferencia
    );

    return repo.updateCantidad(itemId, nuevaCantidad);
  }

  async removeItem(itemId: number) {
    const item = await repo.findById(itemId);

    if (!item) {
      throw new Error("Item de carrito no encontrado");
    }

    const producto = await productoRepo.findById(item.productoId);

    if (producto) {
      // devolvemos la cantidad reservada al stock
      await productoRepo.updateStock(
        producto.id,
        producto.stock + item.cantidad
      );
    }

    return repo.deleteItem(itemId);
  }
}