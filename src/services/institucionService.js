import InstitucionRepository from "../repositories/institucionRepository.js";

export default class InstitucionService {
    constructor() {
        console.log('Estoy en: InstitucionService.constructor()');
        this.repo = new InstitucionRepository();
    }

    getAllAsync = async () => {
        return await this.repo.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repo.getByIdAsync(id);
    }
}

//entre el controller y el repositorie