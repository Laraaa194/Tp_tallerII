import { prisma } from '../prisma.js'
export class UsuarioRepository {
    constructor() {}

    public async findByUniqueEmail(email: string): Promise<any | null> {
        return await prisma.user.findUnique({ where: { email } }); 
     
    }
}