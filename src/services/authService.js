import AuthRepository from '../repositories/authRepository.js';

export default class AuthService {
    constructor() {
        console.log('Estoy en: AuthService.constructor()');
        this.repo = new AuthRepository();
    }

    loginAsync = async (institucionId, dni, password) => {
        const usuario = await this.repo.loginUsuarioAsync(
            institucionId,
            dni,
            password
        );

        if (usuario) {
            return usuario;
        }

        const gestor = await this.repo.loginGestorAsync(
            institucionId,
            dni,
            password
        );

        if (gestor) {
            return gestor;
        }

        return null;
    }
}