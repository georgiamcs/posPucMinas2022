import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from 'src/app/shared/models/usuario.model';
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
    const url = `${this.fullApiURL}tipo/${tipo}`;
    return this.http.get<Usuario[]>(url);
  }

  public getAllByTipoConverted<Type>(tipo: string,fnTransformTipo: any): Observable<Type[]> {
    let ret = this.getAllByTipo(tipo).pipe(
      map((ret) => this.toArrayNewType<Type>(ret, fnTransformTipo))
    );
    return ret;
  }
}
