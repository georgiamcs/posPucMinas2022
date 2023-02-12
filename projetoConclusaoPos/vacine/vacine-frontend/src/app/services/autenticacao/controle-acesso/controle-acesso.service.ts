import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/app/environment';
import { Tema } from 'src/app/shared/enums/tema.enum';
import { TokenPayload } from 'src/app/shared/interfaces/token-payload.interface';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { Acesso, TipoPerfil } from '../../../shared/classes/acesso.class';
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

  // TODO: LOGIN GOOGLE
  // loginGoogle(usuario: SocialUser) {
  //   return this.http
  //     .post<UsuarioToken>(this.API_AUTENTICACAO + 'loginGoogle', usuario)
  //     .pipe(
  //       tap((res) => {
  //         this.security.setToken(res);
  //         return res;
  //       })
  //     );
  // }

  logout() {
    this.security.removeTokenUsuario();
  }

  isLogado() {
    return this.security.autenticado();
  }

  getUsuario(): Usuario {
    return this.security.getUsuario();
  }

  setUsuario(usuario: Usuario) {
    this.security.armazenaUsuario(usuario);
  }

  setTokenUsuario(tokenPayload: TokenPayload) {
    this.security.armazenaTokenUsuario(tokenPayload);
  }

  verificaExistePerfil(listaPerfil: TipoPerfil[]): boolean {
    let retorno = false;

    if (this.isLogado()) {
      let usuario = this.getUsuario();

      if (usuario && usuario.perfis) {
        for (let i = 0; i < listaPerfil.length; i++) {
          if (usuario.perfis.indexOf(listaPerfil[i]) >= 0) {
            retorno = true;
            break;
          }
        }
      }
    }

    return retorno;
  }

  isAdmin(): boolean {
    return this.verificaExistePerfil([TipoPerfil.ADMINISTRADOR]);
  }

  isCadastradorVacina(): boolean {
    return this.verificaExistePerfil(Acesso.getListaPerfilPorTema(Tema.VACINA));
  }

  isCadastradorVacinacao(): boolean {
    return this.verificaExistePerfil(
      Acesso.getListaPerfilPorTema(Tema.VACINACAO)
    );
  }

  isCadastradorUsuario(): boolean {
    return this.verificaExistePerfil(
      Acesso.getListaPerfilPorTema(Tema.USUARIO)
    );
  }

  isCadastradorCompra(): boolean {
    return this.verificaExistePerfil(Acesso.getListaPerfilPorTema(Tema.COMPRA));
  }

  isCadastradorFornecedor(): boolean {
    return this.verificaExistePerfil(
      Acesso.getListaPerfilPorTema(Tema.FORNECEDOR)
    );
  }

  isCliente(): boolean {
    return this.verificaExistePerfil([TipoPerfil.CLIENTE]);
  }
}
