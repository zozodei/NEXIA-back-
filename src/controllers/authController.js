import { Router } from 'express';
import AuthService from '../services/authService.js';

const router = Router();
const svc = new AuthService();

router.post('/login', async (req, res) => {
    try {
        const { institucion_id, dni, password } = req.body;

        if (!institucion_id || !dni || !password) {
            return res.status(400).json({
                message: 'institucion_id, dni y password son obligatorios.'
            });
        }

        const usuario = await svc.loginAsync(institucion_id, dni, password);

        if (!usuario) {
            return res.status(401).json({
                message: 'DNI o contraseña incorrectos.'
            });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Error en POST /auth/login:', error.message);
        return res.status(500).json({
            message: 'Error interno en login.'
        });
    }
});

export default router;