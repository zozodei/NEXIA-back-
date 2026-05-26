import { Router } from 'express';
import AlumnoService from './../services/alumnoService.js';

const router = Router();
const svc = new AlumnoService();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const data = await svc.getByIdAsync(id);

        data
            ? res.status(200).json(data)
            : res.status(404).send('Alumno no encontrado.');
    } catch (e) {
        console.error("Error en GET /alumno/:id:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.get('/:id/materias', async (req, res) => {
    try {
        const alumnoId = req.params.id;

        const data = await svc.getMateriasAsync(alumnoId);

        data != null
            ? res.status(200).json(data)
            : res.status(500).send('Error interno.');
    } catch (e) {
        console.error("Error en GET /alumno/:id/materias:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.get('/:id/materias-con-contenidos', async (req, res) => {
    try {
        const alumnoId = req.params.id;

        const data = await svc.getMateriasConContenidosAsync(alumnoId);

        data != null
            ? res.status(200).json(data)
            : res.status(500).send('Error interno.');
    } catch (e) {
        console.error("Error en GET /alumno/:id/materias-con-contenidos:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.get('/:id/contenidos', async (req, res) => {
    try {
        const alumnoId = req.params.id;
        const materiaId = req.query.materiaId || null;

        const data = await svc.getContenidosAsync(alumnoId, materiaId);

        data != null
            ? res.status(200).json(data)
            : res.status(500).send('Error interno.');
    } catch (e) {
        console.error("Error en GET /alumno/:id/contenidos:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

export default router;