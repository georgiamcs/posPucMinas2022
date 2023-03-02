import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemaAcessoUsuario, TipoAcessoUsuario } from './../../../shared/classes/acesso.class';

import { environment } from 'src/app/environment';
import { Usuario } from 'src/app/shared/classes/usuario.class';
import { TokenPayload } from 'src/app/shared/interfaces/token-payload.interface';
import { Acesso } from '../../../shared/classes/acesso.class';
import { SecurityProvider } from './../../../providers/security.provider';
import { LoginUsuario } from './../../../shared/interfaces/login-usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class ControleAcessoService {
  private readonly API_AUTENTICACAO = `${environment.API_URL_BASE}login/`;

  constructor(private http: HttpClient, private security: SecurityProvider) {}

  loginJwt(loginUsuario: LoginUsuario) {
    return this.http.post<TokenPayload>(
      this.API_AUTENTICACAO + 'jwt',
      loginUsuario
    );
  }

  loginGoogle(usuario: SocialUser) {
    return this.http.post<TokenPayload>(
      this.API_AUTENTICACAO + 'google',
      usuario
    );
  }

  logout() {
    this.security.removeTokenUsuario();
  }

  isLogado() {
    return this.security.autenticado();
  }

  getUsuario() {
    return this.security.getUsuario();
  }

  setUsuario(usuario: Usuario) {
    this.security.armazenaUsuario(usuario);
  }

  setTokenUsuario(tokenPayload: TokenPayload) {
    this.security.armazenaTokenUsuario(tokenPayload);
  }

  verificaExistePerfil(tema: TemaAcessoUsuario, tiposAcesso: TipoAcessoUsuario[]): boolean {
    return this.isLogado() && Acesso.temAcessoFuncionalidade(tema, tiposAcesso, this.getUsuario()?.autorizacoes);
  }

}
