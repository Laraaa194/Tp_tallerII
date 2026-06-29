
import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export interface JwtPayload {
    id: string;
    email: string;
    nombre: string;
    rol: string;
}

declare global {
    namespace Express {
        interface Request {
            usuario?: JwtPayload;
        }
    }
}

export const autenticar = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token requerido' });
        return;
    }

    try {
        const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
        req.usuario = payload;
        next();
    } catch {
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

export const requerirAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.usuario?.rol !== 'ADMIN') {
        res.status(403).json({ message: 'Acceso restringido a administradores' });
        return;
    }
    next();
};
