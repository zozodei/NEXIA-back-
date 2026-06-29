import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthRepository from '../repositories/authRepository.js';

export default class AuthService {
  constructor() {
    this.repo = new AuthRepository();
  }

  loginAsync = async ({ institucion_id, dni, password }) => {
    const usuario = await this.repo.loginUsuarioAsync({ institucion_id, dni });
    if (usuario && await bcrypt.compare(password, usuario.password)) {
      return this.#buildResponse(usuario);
    }

    const gestor = await this.repo.loginGestorAsync({ institucion_id, dni });
    if (gestor && await bcrypt.compare(password, gestor.password)) {
      return this.#buildResponse(gestor);
    }

    const director = await this.repo.loginDirectorAsync({ institucion_id, dni });
    if (director && await bcrypt.compare(password, director.password)) {
      return this.#buildResponse(director);
    }

    return null;
  };

  #buildResponse = (userData) => {
    const { password, ...payload } = userData;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
    return { token, user: payload };
  };
}
