import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Vacina } from '../../shared/models/vacina.model';

@Injectable({
  providedIn: 'root',
})
export class VacinaService {
  private readonly API = 'http://localhost:3005/vacinas/';

  constructor(private http: HttpClient) {}

  listar(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(this.API);
  }

  incluir(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(this.API, vacina);
  }

  excluir(vacina: Vacina): Observable<Vacina> {
    return this.http.delete<Vacina>(this.API + '' + vacina._id);
  }
}
