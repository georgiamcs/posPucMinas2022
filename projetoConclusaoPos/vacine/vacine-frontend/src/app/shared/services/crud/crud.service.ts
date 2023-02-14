import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environment';
import { CrudModel } from '../../models/crud.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T extends CrudModel> {
  private apiUrlCompleta: string;
  private _apiUrlRelativa: string;

  protected http: HttpClient;

  constructor() {}

  set apiUrlRelativa(v: string) {
    this._apiUrlRelativa = v;
    this.apiUrlCompleta = `${environment.API_URL_BASE}${this._apiUrlRelativa}/`;
  }

  listar(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrlCompleta);
  }

  incluir(registro: T): Observable<T> {
    return this.http.post<T>(this.apiUrlCompleta, registro);
  }

  excluir(id: string): Observable<T> {
    const url = `${this.apiUrlCompleta}${id}`;
    return this.http.delete<T>(url);
  }

  alterar(registro: T): Observable<T> {
    const url = `${this.apiUrlCompleta}${registro._id}`;
    return this.http.put<T>(url, registro);
  }

  procurarPorId(id: string): Observable<T> {
    const url = `${this.apiUrlCompleta}${id}`;
    return this.http.get<T>(url);
  }
}
