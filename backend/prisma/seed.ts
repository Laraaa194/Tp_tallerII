import 'dotenv/config';  

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
import { PrismaClient } from '../src/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { config } from '../src/config/config.js';

const adapter = new PrismaMariaDb(config.db);
const prisma = new PrismaClient({ adapter });
async function main() {

  const count = await prisma.producto.count();

  if (count === 0) {
    await prisma.producto.createMany({
      data: [
        {
          nombre: 'Remera Básica Blanca',
          descripcion: 'Remera de algodón 100%, corte regular, ideal para el día a día.',
          clasificacion: 'Remeras',
          precio: 12000.00,
          imagenUrl: 'remera-blanca.png',
        },
        {
          nombre: 'Jeans Slim Fit Azul',
          descripcion: 'Jean de corte slim, tela stretch de alta calidad.',
          clasificacion: 'Pantalones',
          precio: 35000.00,
          imagenUrl: 'jeans-slim.png',
        },
        {
          nombre: 'Campera de Cuero Negra',
          descripcion: 'Campera de cuero ecológico, forro interior cálido.',
          clasificacion: 'Camperas',
          precio: 89000.00,
          imagenUrl: 'campera-cuero.png',
        },
        {
          nombre: 'Vestido Floral Verano',
          descripcion: 'Vestido liviano con estampado floral, ideal para clima cálido.',
          clasificacion: 'Vestidos',
          precio: 28000.00,
          imagenUrl: 'vestido-floral.png',
        },
        {
          nombre: 'Buzo Canguro Gris',
          descripcion: 'Buzo con capucha y bolsillo frontal, tela frizada por dentro.',
          clasificacion: 'Buzos',
          precio: 22000.00,
          imagenUrl: 'buzo-gris.png',
        },
      ],
    });
    console.log('✅ Base de datos sembrada con éxito.');
  } else {
    console.log('⚠️ Ya hay productos, se omite el seed.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });