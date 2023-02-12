import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenPayload } from 'src/app/shared/interfaces/token-payload.interface';
import { SecurityProvider } from './../../../providers/security.provider';
import { TipoPerfil } from './../../../shared/enums/tipo-perfil.enum';

import { tap } from 'rxjs';
import { environment } from 'src/app/environment';
import { Usuario } from 'src/app/shared/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ControleAcessoService {
  private readonly API_AUTENTICACAO = `${environment.API_URL_BASE}/login/`;

  constructor(private http: HttpClient, private security: SecurityProvider) {}

  //TODO: alterar implementacao para quem chamar essa rotina recuperar o observable e tratar, armazendando token no next, tratando erro e fazendo subscricao e unsuscrube
  loginJwt(usuario: Usuario) {
    return this.http
      .post<TokenPayload>(this.API_AUTENTICACAO + 'jwt', usuario)
      .pipe(
        tap((res) => {
          this.security.armazenaTokenUsuario(res);
          return res;
        })
      );
  }

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
    return (
      this.isAdmin() ||
      this.verificaExistePerfil([TipoPerfil.CADASTRADOR_VACINA])
    );
  }

  isCadastradorVacinacao(): boolean {
    return (
      this.isAdmin() ||
      this.verificaExistePerfil([TipoPerfil.CADASTRADOR_VACINACAO])
    );
  }

  isCadastradorUsuario(): boolean {
    return (
      this.isAdmin() ||
      this.verificaExistePerfil([TipoPerfil.CADASTRADOR_USUARIO])
    );
  }

  isCadastradorCompra(): boolean {
    return (
      this.isAdmin() ||
      this.verificaExistePerfil([TipoPerfil.CADASTRADOR_COMPRA])
    );
  }

  isCadastradorFornecedor(): boolean {
    return (
      this.isAdmin() ||
      this.verificaExistePerfil([TipoPerfil.CADASTRADOR_FORNECEDOR])
    );
  }

  isCliente(): boolean {
    return this.verificaExistePerfil([TipoPerfil.CLIENTE]);
  }
}
