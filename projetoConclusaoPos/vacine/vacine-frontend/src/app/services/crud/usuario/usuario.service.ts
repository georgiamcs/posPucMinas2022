import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';

import { map, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/shared/classes/usuario.class';
import { UsuarioTrocaSenha } from 'src/app/shared/models/usuario-troca-senha.model';
import { Vacinacao } from 'src/app/shared/models/vacinacao.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericCrudService<Usuario> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'usuarios';
  }

  public getAllByTipo(tipos: string[]): Observable<Usuario[]> {
    // http param nao aceita array
    const queryParams = new HttpParams().set('tipos', tipos.join(','));
    const url = `${this.fullApiURL}getByTipos`;

    return this.http.get<Usuario[]>(url, { params: queryParams });
  }

  public getAllByTipoConverted<Type>(
    tipos: string[],
    fnTransformTipo: any
  ): Observable<Type[]> {
    let ret = this.getAllByTipo(tipos).pipe(
      map((ret) => this.toArrayNewType<Type>(ret, fnTransformTipo))
    );
    return ret;
  }

  trocarSenha(
    id: string | null | undefined,
    registro: UsuarioTrocaSenha
  ): Observable<Usuario> {
    if (id) {
      const url = `${this.fullApiURL}trocarsenha/${id}`;
      return this.http.put<Usuario>(url, registro);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  getNome(id: string | null | undefined): Observable<string> {
    if (id) {
      const url = `${this.fullApiURL}/nome/${id}`;
      return this.http.get<string>(url);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  getVacinacoes(id: string | null | undefined): Observable<Vacinacao[]> {
    if (id) {
      const url = `${this.fullApiURL}/vacinacoes/${id}`;
      return this.http.get<Vacinacao[]>(url);
    }
    return throwError(() => 'Id do usuário inválido!');
  }
}
