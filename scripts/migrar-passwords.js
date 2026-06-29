import bcrypt from 'bcryptjs';
import pool from '../src/database/db.js';

// Cambia este valor — va a ser la nueva contraseña para TODOS los usuarios existentes
const NUEVA_PASSWORD = 'nexia1234';

const migrar = async () => {
  const hash = await bcrypt.hash(NUEVA_PASSWORD, 10);

  const resultUsuarios = await pool.query(
    `UPDATE usuario SET password = $1 RETURNING id, dni, rol`,
    [hash]
  );

  const resultGestores = await pool.query(
    `UPDATE gestor SET password = $1 RETURNING id, dni`,
    [hash]
  );

  const resultDirectores = await pool.query(
    `UPDATE director SET password = $1 RETURNING id, dni`,
    [hash]
  );

  console.log(`✓ ${resultUsuarios.rowCount} usuarios actualizados (alumnos, profesores, coordinadores)`);
  console.log(`✓ ${resultGestores.rowCount} gestores actualizados`);
  console.log(`✓ ${resultDirectores.rowCount} directores actualizados`);
  console.log(`\nNueva contraseña para todos: "${NUEVA_PASSWORD}"`);

  await pool.end();
};

migrar().catch(err => {
  console.error('Error en la migración:', err.message);
  process.exit(1);
});
