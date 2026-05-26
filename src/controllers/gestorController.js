import { Router } from 'express';
import GestorService from './../services/gestorService.js';

const router = Router();
const svc = new GestorService();

router.post('', async (req, res) => {
    try {
        const created = await svc.crearGestorAsync(req.body);

        created
            ? res.status(201).json(created)
            : res.status(500).send('Error al crear gestor.');
    } catch (e) {
        console.error("Error en POST /gestor:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.post('/alumnos', async (req, res) => {
    try {
        const created = await svc.crearAlumnoAsync(req.body);

        created
            ? res.status(201).json(created)
            : res.status(500).send('Error al crear alumno.');
    } catch (e) {
        console.error("Error en POST /gestor/alumnos:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.post('/profesores', async (req, res) => {
    try {
        const created = await svc.crearProfesorAsync(req.body);

        created
            ? res.status(201).json(created)
            : res.status(500).send('Error al crear profesor.');
    } catch (e) {
        console.error("Error en POST /gestor/profesores:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.post('/alumnos/:alumnoId/curso', async (req, res) => {
    try {
        const alumnoId = req.params.alumnoId;
        const { curso_id } = req.body;

        const updated = await svc.asignarAlumnoACursoAsync(alumnoId, curso_id);

        updated
            ? res.status(200).json(updated)
            : res.status(404).send('Alumno no encontrado.');
    } catch (e) {
        console.error("Error en POST /gestor/alumnos/:alumnoId/curso:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

router.post('/profesores/asignar-materia', async (req, res) => {
    try {
        const created = await svc.asignarProfesorAMateriaAsync(req.body);

        created
            ? res.status(201).json(created)
            : res.status(500).send('Error al asignar profesor a materia.');
    } catch (e) {
        console.error("Error en POST /gestor/profesores/asignar-materia:", e.message);
        res.status(500).send(`Error: ${e.message}`);
    }
});

export default router;