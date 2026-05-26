import AlumnoRepository from "../repositories/alumnoRepository.js";

export default class AlumnoService {
    constructor() {
        console.log('Estoy en: AlumnoService.constructor()');
        this.repo = new AlumnoRepository();
    }

    getByIdAsync = async (id) => {
        return await this.repo.getByIdAsync(id);
    }

    getMateriasAsync = async (alumnoId) => {
        return await this.repo.getMateriasAsync(alumnoId);
    }

    getMateriasConContenidosAsync = async (alumnoId) => {
        return await this.repo.getMateriasConContenidosAsync(alumnoId);
    }

    getContenidosAsync = async (alumnoId, materiaId) => {
        return await this.repo.getContenidosAsync(alumnoId, materiaId);
    }
}