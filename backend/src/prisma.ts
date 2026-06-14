import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { config } from "./config/config.js";
import { PrismaClient } from "./prisma/client.js";

const adapter = new PrismaMariaDb(config.db)

export const prisma = new PrismaClient({ adapter })

export { PrismaClient };
