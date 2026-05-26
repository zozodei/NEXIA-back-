import ProfesorRepository from "../repositories/profesorRepository.js";

export default class ProfesorService {
    constructor() {
        console.log('Estoy en: ProfesorService.constructor()');
        this.repo = new ProfesorRepository();
    }

    getByIdAsync = async (id) => {
        return await this.repo.getByIdAsync(id);
    }

    getMateriasAsync = async (profesorId) => {
        return await this.repo.getMateriasAsync(profesorId);
    }
}