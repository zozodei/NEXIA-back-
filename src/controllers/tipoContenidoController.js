import { Router } from 'express';
import TipoContenidoService from '../services/tipoContenidoService.js';
import {
  ok,
  created,
  badRequest,
  conflict,
  serverError
} from '../helpers/responseHelper.js';
import { missingFields } from '../helpers/validationHelper.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireRoles } from '../middleware/rolesMiddleware.js';

const router = Router();
const service = new TipoContenidoService();

// Cualquier usuario autenticado puede ver los tipos de contenido
router.get('/', verifyToken, async (req, res) => {
  try {
    const data = await service.getAllAsync();
    return ok(res, data);
  } catch (error) {
    return serverError(res, error);
  }
});

// Solo el GESTOR puede crear tipos de contenido
router.post('/', verifyToken, requireRoles('GESTOR'), async (req, res) => {
  try {
    const faltantes = missingFields(req.body, ['nombre']);

    if (faltantes.length > 0) {
      return badRequest(res, `Faltan campos: ${faltantes.join(', ')}`);
    }

    const data = await service.createAsync(req.body);
    return created(res, data, 'Tipo de contenido creado correctamente');
  } catch (error) {
    if (error.code === '23505') {
      return conflict(res, 'Ese tipo de contenido ya existe');
    }

    return serverError(res, error);
  }
});

export default router;
