import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vacina } from '../../shared/models/vacina.model';

@Injectable({
  providedIn: 'root',
})
export class VacinaService { //TODO tratar excecoes do http (ex: backend fora, retorno com erro)
  private readonly API = 'http://localhost:3005/vacinas/';

  constructor(private http: HttpClient) {}

  listar(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.API);
  }

  incluir(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(this.API, vacina);
  }

  excluir(id: String): Observable<Vacina> {
    const url = `${this.API}${id}`;
    return this.http.delete<Vacina>(url);
  }

  procurarPorId(id: String): Observable<Vacina> {
    const url = `${this.API}${id}`;
    return this.http.get<Vacina>(url);
  }
}
