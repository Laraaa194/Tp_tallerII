import { prisma } from '../prisma.js'

export class UsuarioRepository {

    async findByUniqueEmail(email: string): Promise<any | null> {
        return await prisma.user.findUnique({ where: { email } });

    }

    async create(data: any) {
        return await prisma.user.create({ data });
    }
}
