import { prisma } from '../prisma.js';

const aProducto = (p: any) => ({
  ...p,
  precio: p.precio.toNumber()
});

export class ProductoRepository {

  async findAll() {
    const productos = await prisma.producto.findMany();
    return productos.map(aProducto);
  }

  async findByNombre(termino: string) {
    const productos = await prisma.producto.findMany({
      where: {
        nombre: {
          contains: termino,
        }
      }
    });
    return productos.map(aProducto);
  }

  async findById(id: number) {
    const producto = await prisma.producto.findUnique({
      where: { id }
    });
    return producto ? aProducto(producto) : null;
  }

  async updateStock(id: number, stock: number) {
    return prisma.producto.update({
      where: { id },
      data: { stock }
    });
  }

  async crear(data: any) {
    return prisma.producto.create({ data });
  }

  async actualizar(id: number, data: any) {
    return prisma.producto.update({ where: { id }, data });
  }

  async eliminar(id: number) {
    return prisma.$transaction([
      prisma.carritoItem.deleteMany({ where: { productoId: id } }),
      prisma.producto.delete({ where: { id } })
    ]);
  }
}
