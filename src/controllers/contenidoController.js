import { Router } from 'express';
import ContenidoService from './../services/contenidoService.js';

const router = Router();
const svc = new ContenidoService();

router.get('', async (req, res) => {
    try {
        const data = await svc.getAllAsync();

        data != null
            ? res.status(200).json(data)
            : res.status(500).send('Error interno.');
    } catch (e) {
        console.error("Error en GET /contenido:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const data = await svc.getByIdAsync(id);

        data
            ? res.status(200).json(data)
            : res.status(404).send('Contenido no encontrado.');
    } catch (e) {
        console.error("Error en GET /contenido/:id:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.post('', async (req, res) => {
    try {
        const created = await svc.createAsync(req.body);

        created
            ? res.status(201).json(created)
            : res.status(500).send('Error al crear contenido.');
    } catch (e) {
        console.error("Error en POST /contenido:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

export default router;