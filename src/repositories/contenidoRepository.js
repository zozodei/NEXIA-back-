import pool from '../database/db.js';

export default class ContenidoRepository {
    constructor() {
        console.log('Estoy en: ContenidoRepository.constructor()');
    }

    getAllAsync = async () => {
        try {
            const result = await pool.query(`
                SELECT 
                    con.id,
                    con.profe_curso_materia_id,
                    con.tipo_contenido_id,
                    tc.nombre AS tipo_contenido,
                    con.titulo,
                    con.descripcion,
                    con.archivo_url,
                    con.fecha_creacion,
                    m.nombre AS materia_nombre,
                    c.anio,
                    c.division
                FROM contenido con
                INNER JOIN tipo_contenido tc ON tc.id = con.tipo_contenido_id
                INNER JOIN profe_curso_materia pcm ON pcm.id = con.profe_curso_materia_id
                INNER JOIN curso_materia cm ON cm.id = pcm.curso_materia_id
                INNER JOIN materia m ON m.id = cm.materia_id
                INNER JOIN curso c ON c.id = cm.curso_id
                ORDER BY con.fecha_creacion DESC
            `);

            return result.rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getByIdAsync = async (id) => {
        try {
            const result = await pool.query(`
                SELECT 
                    con.id,
                    con.profe_curso_materia_id,
                    con.tipo_contenido_id,
                    tc.nombre AS tipo_contenido,
                    con.titulo,
                    con.descripcion,
                    con.archivo_url,
                    con.fecha_creacion,
                    m.nombre AS materia_nombre,
                    c.anio,
                    c.division
                FROM contenido con
                INNER JOIN tipo_contenido tc ON tc.id = con.tipo_contenido_id
                INNER JOIN profe_curso_materia pcm ON pcm.id = con.profe_curso_materia_id
                INNER JOIN curso_materia cm ON cm.id = pcm.curso_materia_id
                INNER JOIN materia m ON m.id = cm.materia_id
                INNER JOIN curso c ON c.id = cm.curso_id
                WHERE con.id = $1
            `, [id]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    createAsync = async (payload) => {
        try {
            const {
                profe_curso_materia_id,
                tipo_contenido_id,
                titulo,
                descripcion,
                archivo_url
            } = payload;

            const result = await pool.query(`
                INSERT INTO contenido (
                    profe_curso_materia_id,
                    tipo_contenido_id,
                    titulo,
                    descripcion,
                    archivo_url
                )
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `, [
                profe_curso_materia_id,
                tipo_contenido_id,
                titulo,
                descripcion,
                archivo_url
            ]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}