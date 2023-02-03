import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vacina } from '../../shared/models/vacina.model';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root',
})
export class VacinaService { //TODO tratar excecoes do http (ex: backend fora, retorno com erro)

  constructor(private http: HttpClient) {}

  listar(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(environment.API_URL);
  }

  incluir(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(environment.API_URL, vacina);
  }

  excluir(id: string): Observable<Vacina> {
    const url = `${environment.API_URL}${id}`;
    return this.http.delete<Vacina>(url);
  }

  alterar(vacina: Vacina): Observable<Vacina> {
    const url = `${environment.API_URL}${vacina._id}`;
    return this.http.put<Vacina>(url, vacina);
  }

  procurarPorId(id: string): Observable<Vacina> {
    const url = `${environment.API_URL}${id}`;
    return this.http.get<Vacina>(url);
  }
}
