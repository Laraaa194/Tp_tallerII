import { prisma } from "../prisma.js";

export class CarritoRepository {

  async addItem(productoId: number, cantidad: number) {
    return prisma.carritoItem.create({
      data: {
        productoId,
        cantidad
      }
    });
  }

  async getAll() {
    return prisma.carritoItem.findMany({
      include: {
        producto: true
      }
    });
  }

  async deleteItem(id: number) {
    return prisma.carritoItem.delete({
      where: { id }
    });
  }

   async findByProductoId(productoId: number) {
    return prisma.carritoItem.findFirst({
      where: { productoId }
    });
  }

  async updateCantidad(id: number, cantidad: number) {
    return prisma.carritoItem.update({
      where: { id },
      data: { cantidad }
    });
  }
}