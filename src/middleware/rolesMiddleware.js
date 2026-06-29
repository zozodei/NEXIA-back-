import { forbidden } from '../helpers/responseHelper.js';

export const requireRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return forbidden(res, 'No tenés permiso para realizar esta acción');
  }
  next();
};
