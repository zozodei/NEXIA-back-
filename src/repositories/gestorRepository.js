import pool from '../database/db.js';

export default class GestorRepository {
    constructor() {
        console.log('Estoy en: GestorRepository.constructor()');
    }

    crearGestorAsync = async (payload) => {
        try {
            const {
                nombre,
                dni,
                password
            } = payload;

            const result = await pool.query(`
                INSERT INTO gestor (
                    nombre,
                    dni,
                    password
                )
                VALUES ($1, $2, $3)
                RETURNING *
            `, [
                nombre,
                dni,
                password
            ]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    crearAlumnoAsync = async (payload) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const {
                institucion_id,
                nombre,
                apellido,
                email,
                password,
                dni,
                curso_id
            } = payload;

            const usuarioResult = await client.query(`
                INSERT INTO usuario (
                    institucion_id,
                    nombre,
                    apellido,
                    email,
                    password,
                    dni,
                    rol,
                    activo
                )
                VALUES ($1, $2, $3, $4, $5, $6, 'ALUMNO', TRUE)
                RETURNING *
            `, [
                institucion_id,
                nombre,
                apellido,
                email,
                password,
                dni
            ]);

            const usuario = usuarioResult.rows[0];

            const alumnoResult = await client.query(`
                INSERT INTO alumno (usuario_id, curso_id)
                VALUES ($1, $2)
                RETURNING *
            `, [usuario.id, curso_id]);

            await client.query('COMMIT');

            return {
                usuario,
                alumno: alumnoResult.rows[0]
            };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            return null;
        } finally {
            client.release();
        }
    }

    crearProfesorAsync = async (payload) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const {
                institucion_id,
                nombre,
                apellido,
                email,
                password,
                dni
            } = payload;

            const usuarioResult = await client.query(`
                INSERT INTO usuario (
                    institucion_id,
                    nombre,
                    apellido,
                    email,
                    password,
                    dni,
                    rol,
                    activo
                )
                VALUES ($1, $2, $3, $4, $5, $6, 'PROFESOR', TRUE)
                RETURNING *
            `, [
                institucion_id,
                nombre,
                apellido,
                email,
                password,
                dni
            ]);

            const usuario = usuarioResult.rows[0];

            const profesorResult = await client.query(`
                INSERT INTO profesor (usuario_id)
                VALUES ($1)
                RETURNING *
            `, [usuario.id]);

            await client.query('COMMIT');

            return {
                usuario,
                profesor: profesorResult.rows[0]
            };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            return null;
        } finally {
            client.release();
        }
    }

    asignarAlumnoACursoAsync = async (alumnoId, cursoId) => {
        try {
            const result = await pool.query(`
                UPDATE alumno
                SET curso_id = $1
                WHERE id = $2
                RETURNING *
            `, [cursoId, alumnoId]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    asignarProfesorAMateriaAsync = async (payload) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const {
                profesor_id,
                curso_id,
                materia_id
            } = payload;

            const cursoMateriaResult = await client.query(`
                INSERT INTO curso_materia (curso_id, materia_id)
                VALUES ($1, $2)
                ON CONFLICT (curso_id, materia_id)
                DO UPDATE SET materia_id = EXCLUDED.materia_id
                RETURNING *
            `, [curso_id, materia_id]);

            const cursoMateria = cursoMateriaResult.rows[0];

            const profeCursoMateriaResult = await client.query(`
                INSERT INTO profe_curso_materia (curso_materia_id, profesor_id)
                VALUES ($1, $2)
                ON CONFLICT (curso_materia_id, profesor_id)
                DO UPDATE SET profesor_id = EXCLUDED.profesor_id
                RETURNING *
            `, [cursoMateria.id, profesor_id]);

            await client.query('COMMIT');

            return {
                curso_materia: cursoMateria,
                profe_curso_materia: profeCursoMateriaResult.rows[0]
            };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            return null;
        } finally {
            client.release();
        }
    }
}