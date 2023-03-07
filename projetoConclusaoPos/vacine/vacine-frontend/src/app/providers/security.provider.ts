import { Injectable } from '@angular/core';
import { UsuarioAutenticado } from '../shared/classes/usuario-autenticado.class';
import jwt_decode from 'jwt-decode';
import { TokenPayload } from '../shared/interfaces/token-payload.interface';

@Injectable()
export class SecurityProvider {
  private readonly KEY_TOKEN = 'vacine-authToken';

  constructor() {}

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

  autenticado() {
    return !!this.getToken();
  }

  armazenaTokenUsuario(tokenPayload: TokenPayload) {
    window.sessionStorage.setItem(this.KEY_TOKEN, tokenPayload.token);
  }

  getToken() {
    return window.sessionStorage.getItem(this.KEY_TOKEN);
  }

  getUsuario(): UsuarioAutenticado | null {
    let token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.usuario;
    } else {
      return null;
    }
  }

  removeTokenUsuario() {
    window.sessionStorage.removeItem(this.KEY_TOKEN);
  }
}
