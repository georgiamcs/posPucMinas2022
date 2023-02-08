import { ServiceCrud } from './../../shared/interfaces/crud.service.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vacina } from '../../shared/models/vacina.model';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class VacinaService implements ServiceCrud<Vacina> {
  //TODO tratar excecoes do http (ex: backend fora, retorno com erro)

  constructor(private http: HttpClient) {}

  private API_URL_COMPLETA = environment.API_URL + 'vacinas/';

  listar(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.API_URL_COMPLETA);
  }

  incluir(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(this.API_URL_COMPLETA, vacina);
  }

  excluir(id: string): Observable<Vacina> {
    const url = `${this.API_URL_COMPLETA}${id}`;
    return this.http.delete<Vacina>(url);
  }

  alterar(vacina: Vacina): Observable<Vacina> {
    const url = `${this.API_URL_COMPLETA}${vacina._id}`;
    return this.http.put<Vacina>(url, vacina);
  }

  procurarPorId(id: string): Observable<Vacina> {
    const url = `${this.API_URL_COMPLETA}${id}`;
    return this.http.get<Vacina>(url);
  }
}
