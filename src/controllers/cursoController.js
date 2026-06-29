import { Router } from 'express';
import CursoService from '../services/cursoService.js';
import { ok, serverError } from '../helpers/responseHelper.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();
const service = new CursoService();

router.get('/', verifyToken, async (req, res) => {
  try {
    const data = await service.getAllAsync(req.query.institucion_id);
    return ok(res, data);
  } catch (error) {
    return serverError(res, error);
  }
});

export default router;
