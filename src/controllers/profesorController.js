import { Router } from 'express';
import ProfesorService from './../services/profesorService.js';

const router = Router();
const svc = new ProfesorService();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const data = await svc.getByIdAsync(id);

        data
            ? res.status(200).json(data)
            : res.status(404).send('Profesor no encontrado.');
    } catch (e) {
        console.error("Error en GET /profesor/:id:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.get('/:id/materias', async (req, res) => {
    try {
        const profesorId = req.params.id;

        const data = await svc.getMateriasAsync(profesorId);

        data != null
            ? res.status(200).json(data)
            : res.status(500).send('Error interno.');
    } catch (e) {
        console.error("Error en GET /profesor/:id/materias:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

export default router;