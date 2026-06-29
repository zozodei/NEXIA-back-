import { Router } from 'express';
import ComunicadoService from '../services/comunicadoService.js';
import {
  ok,
  created,
  badRequest,
  serverError
} from '../helpers/responseHelper.js';
import { missingFields } from '../helpers/validationHelper.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireRoles } from '../middleware/rolesMiddleware.js';

const router = Router();
const service = new ComunicadoService();

// Solo el gestor puede crear comunicados — gestor_id e institucion_id vienen del token
router.post('/', verifyToken, requireRoles('GESTOR'), async (req, res) => {
  try {
    const faltantes = missingFields(req.body, ['titulo', 'contenido']);

    if (faltantes.length > 0) {
      return badRequest(res, `Faltan campos: ${faltantes.join(', ')}`);
    }

    const data = await service.createAsync({
      ...req.body,
      gestor_id: req.user.gestor_id,
      institucion_id: req.user.institucion_id
    });

    return created(res, data, 'Comunicado creado correctamente');
  } catch (error) {
    if (error.code === '23503') {
      return badRequest(res, 'La institución o el gestor no existe');
    }

    return serverError(res, error);
  }
});

// Cualquier usuario autenticado puede ver los comunicados
router.get('/:institucion_id', verifyToken, async (req, res) => {
  try {
    const data = await service.getAllByInstitucionAsync(req.params.institucion_id);
    return ok(res, data, 'Comunicados obtenidos correctamente');
  } catch (error) {
    return serverError(res, error);
  }
});

export default router;
