import { UsuarioRepository } from '../repository/usuario.repository.js';
import bcrypt from 'bcrypt';

const usuarioRepository = new UsuarioRepository();

export class UsuarioService {
  async register(data: any) {
    try {
      const existingUser = await usuarioRepository.findByUniqueEmail(data.email);
      if (existingUser) {
        throw new Error('EMAIL_EXISTS');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      return await usuarioRepository.create({
        ...data,
        password: hashedPassword
      });
    } catch (error) {
      throw error;
    }
  }
}
