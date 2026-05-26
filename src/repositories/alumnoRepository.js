import pool from '../database/db.js';

export default class AlumnoRepository {
    constructor() {
        console.log('Estoy en: AlumnoRepository.constructor()');
    }

    getByIdAsync = async (id) => {
        try {
            const result = await pool.query(`
                SELECT 
                    a.id AS alumno_id,
                    u.id AS usuario_id,
                    u.institucion_id,
                    u.nombre,
                    u.apellido,
                    u.email,
                    u.dni,
                    u.rol,
                    u.activo,
                    c.id AS curso_id,
                    c.anio,
                    c.division
                FROM alumno a
                INNER JOIN usuario u ON u.id = a.usuario_id
                INNER JOIN curso c ON c.id = a.curso_id
                WHERE a.id = $1
            `, [id]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getMateriasAsync = async (alumnoId) => {
        try {
            const result = await pool.query(`
                SELECT
                    a.id AS alumno_id,
                    c.id AS curso_id,
                    c.anio,
                    c.division,
                    m.id AS materia_id,
                    m.nombre AS materia_nombre,
                    m.descripcion AS materia_descripcion
                FROM alumno a
                INNER JOIN curso c ON c.id = a.curso_id
                INNER JOIN curso_materia cm ON cm.curso_id = c.id
                INNER JOIN materia m ON m.id = cm.materia_id
                WHERE a.id = $1
                ORDER BY m.nombre
            `, [alumnoId]);

            return result.rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getMateriasConContenidosAsync = async (alumnoId) => {
        try {
            const result = await pool.query(`
                SELECT
                    a.id AS alumno_id,
                    c.id AS curso_id,
                    c.anio,
                    c.division,
                    m.id AS materia_id,
                    m.nombre AS materia_nombre,
                    m.descripcion AS materia_descripcion,
                    COALESCE(
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'contenido_id', con.id,
                                'titulo', con.titulo,
                                'descripcion', con.descripcion,
                                'archivo_url', con.archivo_url,
                                'fecha_creacion', con.fecha_creacion,
                                'tipo_contenido', tc.nombre
                            )
                            ORDER BY con.fecha_creacion DESC
                        ) FILTER (WHERE con.id IS NOT NULL),
                        '[]'
                    ) AS contenidos
                FROM alumno a
                INNER JOIN curso c ON c.id = a.curso_id
                INNER JOIN curso_materia cm ON cm.curso_id = c.id
                INNER JOIN materia m ON m.id = cm.materia_id
                LEFT JOIN profe_curso_materia pcm ON pcm.curso_materia_id = cm.id
                LEFT JOIN contenido con ON con.profe_curso_materia_id = pcm.id
                LEFT JOIN tipo_contenido tc ON tc.id = con.tipo_contenido_id
                WHERE a.id = $1
                GROUP BY 
                    a.id,
                    c.id,
                    c.anio,
                    c.division,
                    m.id,
                    m.nombre,
                    m.descripcion
                ORDER BY m.nombre
            `, [alumnoId]);

            return result.rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getContenidosAsync = async (alumnoId, materiaId = null) => {
        try {
            const values = [alumnoId];

            let filtroMateria = '';

            if (materiaId) {
                values.push(materiaId);
                filtroMateria = `AND m.id = $2`;
            }

            const result = await pool.query(`
                SELECT
                    con.id AS contenido_id,
                    con.titulo,
                    con.descripcion,
                    con.archivo_url,
                    con.fecha_creacion,
                    tc.nombre AS tipo_contenido,
                    m.id AS materia_id,
                    m.nombre AS materia_nombre,
                    c.id AS curso_id,
                    c.anio,
                    c.division
                FROM alumno a
                INNER JOIN curso c ON c.id = a.curso_id
                INNER JOIN curso_materia cm ON cm.curso_id = c.id
                INNER JOIN materia m ON m.id = cm.materia_id
                INNER JOIN profe_curso_materia pcm ON pcm.curso_materia_id = cm.id
                INNER JOIN contenido con ON con.profe_curso_materia_id = pcm.id
                INNER JOIN tipo_contenido tc ON tc.id = con.tipo_contenido_id
                WHERE a.id = $1
                ${filtroMateria}
                ORDER BY con.fecha_creacion DESC
            `, values);

            return result.rows;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}