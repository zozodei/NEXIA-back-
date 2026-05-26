import pool from '../database/db.js';

export default class ProfesorRepository {
    constructor() {
        console.log('Estoy en: ProfesorRepository.constructor()');
    }

    getByIdAsync = async (id) => {
        try {
            const result = await pool.query(`
                SELECT 
                    p.id AS profesor_id,
                    u.id AS usuario_id,
                    u.institucion_id,
                    u.nombre,
                    u.apellido,
                    u.email,
                    u.dni,
                    u.rol,
                    u.activo
                FROM profesor p
                INNER JOIN usuario u ON u.id = p.usuario_id
                WHERE p.id = $1
            `, [id]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getMateriasAsync = async (profesorId) => {
        try {
            const result = await pool.query(`
                SELECT
                    pcm.id AS profe_curso_materia_id,
                    p.id AS profesor_id,
                    m.id AS materia_id,
                    m.nombre AS materia_nombre,
                    m.descripcion AS materia_descripcion,
                    c.id AS curso_id,
                    c.anio,
                    c.division
                FROM profesor p
                INNER JOIN profe_curso_materia pcm ON pcm.profesor_id = p.id
                INNER JOIN curso_materia cm ON cm.id = pcm.curso_materia_id
                INNER JOIN materia m ON m.id = cm.materia_id
                INNER JOIN curso c ON c.id = cm.curso_id
                WHERE p.id = $1
                ORDER BY c.anio, c.division, m.nombre
            `, [profesorId]);

            return result.rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}