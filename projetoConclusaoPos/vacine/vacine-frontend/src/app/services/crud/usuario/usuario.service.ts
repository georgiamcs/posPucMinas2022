import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from 'src/app/shared/classes/usuario.class';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericCrudService<Usuario> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'usuarios';
  }

  public getAllByTipo(tipo: string): Observable<Usuario[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('tipo', tipo);

    const url = `${this.fullApiURL}`;

    return this.http.get<Usuario[]>(url, { params: queryParams });
  }

  public getAllByTipoConverted<Type>(
    tipo: string,
    fnTransformTipo: any
  ): Observable<Type[]> {
    let ret = this.getAllByTipo(tipo).pipe(
      map((ret) => this.toArrayNewType<Type>(ret, fnTransformTipo))
    );
    return ret;
  }
}
