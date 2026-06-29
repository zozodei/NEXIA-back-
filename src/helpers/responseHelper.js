export const ok = (res, data, message = 'Operación exitosa') => {
  return res.status(200).json({
    ok: true,
    message,
    data
  });
};

export const created = (res, data, message = 'Creado correctamente') => {
  return res.status(201).json({
    ok: true,
    message,
    data
  });
};

export const badRequest = (res, message = 'Solicitud inválida') => {
  return res.status(400).json({
    ok: false,
    message
  });
};

export const unauthorized = (res, message = 'No autorizado') => {
  return res.status(401).json({
    ok: false,
    message
  });
};

export const notFound = (res, message = 'No encontrado') => {
  return res.status(404).json({
    ok: false,
    message
  });
};

export const conflict = (res, message = 'Conflicto con datos existentes') => {
  return res.status(409).json({
    ok: false,
    message
  });
};

export const forbidden = (res, message = 'No tenés permiso para realizar esta acción') => {
  return res.status(403).json({
    ok: false,
    message
  });
};

export const serverError = (res, error) => {
  console.error(error);

  return res.status(500).json({
    ok: false,
    message: 'Error interno del servidor',
    error: error.message
  });
};