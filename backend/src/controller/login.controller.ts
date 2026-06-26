import {type Request, type Response } from 'express';
import { AuthService } from '../service/auth.service.js';

export class LoginController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async procesarLogin(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ 
                exito: false, 
                message: "El correo y la contraseña son obligatorios." 
            });
            return; 
        }
        const token = await this.authService.autenticarCredenciales(email, password);
        if (token) {
            res.status(200).json({ 
                exito: true, 
                message: "Login exitoso", 
                token: token 
            });
        } else {
            res.status(401).json({ 
                exito: false, 
                message: "Correo o contraseña incorrectos" 
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error interno en el servidor", error });
    }
}
}