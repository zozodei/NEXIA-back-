import ContenidoRepository from "../repositories/contenidoRepository.js";

export default class ContenidoService {
    constructor() {
        console.log('Estoy en: ContenidoService.constructor()');
        this.repo = new ContenidoRepository();
    }

    getAllAsync = async () => {
        return await this.repo.getAllAsync();
    }

    getByIdAsync = async (id) => {
        return await this.repo.getByIdAsync(id);
    }

    createAsync = async (payload) => {
        return await this.repo.createAsync(payload);
    }
}