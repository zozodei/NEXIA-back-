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
                    nombre
                FROM institucion
                ORDER BY nombre
            `);

            return result.rows;
        } catch (error) {
            console.error("ERROR SQL EN GET ALL INSTITUCION:");
            console.error("MENSAJE:", error.message);
            console.error("DETALLE:", error.detail);
            console.error("CODIGO:", error.code);

            throw error;
        }
    }

    getByIdAsync = async (id) => {
        try {
            const result = await pool.query(`
                SELECT 
                    id,
                    nombre
                FROM institucion
                WHERE id = $1
            `, [id]);

            return result.rows[0] || null;
        } catch (error) {
            console.error("ERROR SQL EN GET BY ID INSTITUCION:");
            console.error("MENSAJE:", error.message);
            console.error("DETALLE:", error.detail);
            console.error("CODIGO:", error.code);

            throw error;
        }
    }
}