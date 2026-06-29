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

async crear(data: { nombre: string; descripcion: string; clasificacion: string; precio: number; imagenUrl: string; stock: number }) {
  return prisma.producto.create({ data });
}

async actualizar(id: number, data: { nombre: string; descripcion: string; clasificacion: string; precio: number; imagenUrl: string; stock: number }) {
  return prisma.producto.update({ where: { id }, data });
}

async eliminar(id: number) {
  await prisma.carritoItem.deleteMany({ where: { productoId: id } });
  return prisma.producto.delete({ where: { id } });
}
}