import { Injectable } from '@angular/core';
import { TokenPayload } from '../shared/interfaces/token-payload.interface';
import { Usuario } from '../shared/models/usuario.model';

@Injectable()
export class SecurityProvider {

  private readonly KEY_TOKEN = 'vacine-authToken';
  private readonly KEY_USER = 'vacine-user';

  constructor() {}

  autenticado() {
    return !!this.getToken();
  }

  armazenaUsuario(u: Usuario) {
    window.localStorage.setItem(this.KEY_USER, JSON.stringify(u));
  }

  armazenaTokenUsuario(tokenPayload: TokenPayload) {
    window.localStorage.setItem(this.KEY_TOKEN, tokenPayload.token);
    this.armazenaUsuario(tokenPayload.usuario);
  }

  getToken() {
    return window.localStorage.getItem(this.KEY_TOKEN);
  }

  getUsuario() {
    let usuario = window.localStorage.getItem(this.KEY_USER);
    if (usuario) {
      return JSON.parse(usuario);
    } else {
      return null;
    }
  }

  removeTokenUsuario() {
    window.localStorage.removeItem(this.KEY_TOKEN);
    window.localStorage.removeItem(this.KEY_USER);
  }
}
