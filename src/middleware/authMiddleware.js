import jwt from 'jsonwebtoken';
import { unauthorized } from '../helpers/responseHelper.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    return unauthorized(res, 'Token de autenticación requerido');
  }

  const token = authHeader.slice(7);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return unauthorized(res, 'Token inválido o expirado');
  }
};
