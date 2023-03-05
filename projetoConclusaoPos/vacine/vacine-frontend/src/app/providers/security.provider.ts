import { Injectable } from '@angular/core';
import { TokenPayload } from '../shared/interfaces/token-payload.interface';
import { Usuario } from '../shared/classes/usuario.class';
import { UsuarioAutenticado } from '../shared/classes/usuario-autenticado.class';

@Injectable()
export class SecurityProvider {

  private readonly KEY_TOKEN = 'vacine-authToken';
  private readonly KEY_USER = 'vacine-user';

  constructor() {}

  autenticado() {
    return !!this.getToken();
  }

  armazenaUsuario(u: UsuarioAutenticado) {
    window.sessionStorage.setItem(this.KEY_USER, JSON.stringify(u));
  }

  armazenaTokenUsuario(tokenPayload: TokenPayload) {
    window.sessionStorage.setItem(this.KEY_TOKEN, tokenPayload.token);
    this.armazenaUsuario(tokenPayload.usuario);
  }

  getToken() {
    return window.sessionStorage.getItem(this.KEY_TOKEN);
  }

  getUsuario(): UsuarioAutenticado | null {
    let usuario = window.sessionStorage.getItem(this.KEY_USER);
    if (usuario) {
      return JSON.parse(usuario);
    } else {
      return null;
    }
  }

  removeTokenUsuario() {
    window.sessionStorage.removeItem(this.KEY_TOKEN);
    window.sessionStorage.removeItem(this.KEY_USER);
  }
}
