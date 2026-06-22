import { prisma } from '../prisma.js';

export class ProductoRepository {

  async findAll() {
    const productos = await prisma.producto.findMany();
    return productos.map(p => ({
      ...p,
      precio: p.precio.toNumber()
    }));
  }

  async findByNombre(termino: string) {
    const productos = await prisma.producto.findMany({
      where: {
        nombre: {
          contains: termino,
        }
      }
    });
    return productos.map(p => ({
      ...p,
      precio: p.precio.toNumber()
    }));
  }

  async findById(id: number) {
  return prisma.producto.findUnique({
    where: { id }
  });
}

async updateStock(id: number, stock: number) {
  return prisma.producto.update({
    where: { id },
    data: { stock }
  });
}
}