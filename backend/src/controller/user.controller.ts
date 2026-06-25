import type { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcrypt';

export class UserController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, apellido, email, direccion, password } = req.body;
      // @ts-ignore
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'El correo electrónico ya se encuentra registrado.'
        });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // @ts-ignore
      const newUser = await prisma.user.create({
        data: {
          nombre,
          apellido,
          email,
          direccion,
          password: hashedPassword
        }
      });

      res.status(201).json({
        success: true,
        message: '¡Usuario registrado con éxito!'
      });

    } catch (error) {
      console.error("Error en el registro:", error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor.'
      });
    }
  }
}
