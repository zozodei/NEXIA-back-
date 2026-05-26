import pool from '../database/db.js';

export default class InstitucionRepository {
    constructor() {
        console.log('Estoy en: InstitucionRepository.constructor()');
    }

    getAllAsync = async () => {
        try {
            const result = await pool.query(`
                SELECT 
                    id,
                    nombre,
                    direccion,
                    telefono,
                    email
                FROM institucion
                ORDER BY nombre
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
                    id,
                    nombre,
                    direccion,
                    telefono,
                    email
                FROM institucion
                WHERE id = $1
            `, [id]);

            return result.rows[0] || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

//habla con la BD, por eso aca estan las consultas