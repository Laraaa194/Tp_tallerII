import { UsuarioRepository } from '../repository/usuario.repository.js';
import { config } from '../config/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }


    public async autenticarCredenciales(email: string, password: string): Promise<string | null> {
        const usuario = await this.usuarioRepository.findByUniqueEmail(email);

        if (!usuario) {
            return null;
        }
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            return null;
        }
        const payload = {
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre,
            rol: usuario.rol
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '2h' });
        return token;
    }
}
