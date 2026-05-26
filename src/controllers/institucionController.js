import { Router } from 'express';
import InstitucionService from './../services/institucionService.js';

const router = Router();
const svc = new InstitucionService();

router.get('', async (req, res) => {
    try {
        const data = await svc.getAllAsync();

        data != null
            ? res.status(200).json(data)
            : res.status(500).send('Error interno.');
    } catch (e) {
        console.error("Error en GET /institucion:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const data = await svc.getByIdAsync(id);

        data
            ? res.status(200).json(data)
            : res.status(404).send('Institución no encontrada.');
    } catch (e) {
        console.error("Error en GET /institucion/:id:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

export default router;