import { prisma } from "../prisma.js";

export class CarritoRepository {

  async addItem(productoId: number, cantidad: number, userId: string) {
    return prisma.carritoItem.create({
      data: {
        productoId,
        cantidad,
        userId
      }
    });
  }

  async getAll(userId: string) {
    return prisma.carritoItem.findMany({
      where: { userId },
      include: { producto: true }
    });
  }

  async deleteItem(id: number) {
    return prisma.carritoItem.delete({
      where: { id }
    });
  }

async findByProductoId(productoId: number, userId: string) {
  return prisma.carritoItem.findFirst({
    where: { productoId, userId }
  });
}

  async updateCantidad(id: number, cantidad: number) {
    return prisma.carritoItem.update({
      where: { id },
      data: { cantidad }
    });
  }

  async findById(id: number) {
    return prisma.carritoItem.findUnique({
      where: { id }
    });
  }
}