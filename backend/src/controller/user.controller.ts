import { type Request, type Response } from 'express';
import { UsuarioService } from '../service/usuario.service.js';

const usuarioService = new UsuarioService();

export class UserController {

  public register = async (req: Request, res: Response) => {
    try {
      await usuarioService.register(req.body);
      res.status(201).json({ message: '¡Usuario registrado con éxito!' });
    } catch (error: any) {
      if (error.message === 'EMAIL_EXISTS') {
        res.status(400).json({ message: 'El correo electrónico ya se encuentra registrado.' });
      } else {
        res.status(500).json({ message: 'Error interno del servidor', error });
      }
    }
  }
}
