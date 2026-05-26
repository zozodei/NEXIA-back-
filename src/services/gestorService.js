import GestorRepository from "../repositories/gestorRepository.js";

export default class GestorService {
    constructor() {
        console.log('Estoy en: GestorService.constructor()');
        this.repo = new GestorRepository();
    }

    crearGestorAsync = async (payload) => {
        return await this.repo.crearGestorAsync(payload);
    }

    crearAlumnoAsync = async (payload) => {
        return await this.repo.crearAlumnoAsync(payload);
    }

    crearProfesorAsync = async (payload) => {
        return await this.repo.crearProfesorAsync(payload);
    }

    asignarAlumnoACursoAsync = async (alumnoId, cursoId) => {
        return await this.repo.asignarAlumnoACursoAsync(alumnoId, cursoId);
    }

    asignarProfesorAMateriaAsync = async (payload) => {
        return await this.repo.asignarProfesorAMateriaAsync(payload);
    }
}