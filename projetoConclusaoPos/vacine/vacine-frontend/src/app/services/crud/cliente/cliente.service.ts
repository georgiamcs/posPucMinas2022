import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Usuario } from '../../../shared/classes/usuario.class';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  registrar(registro: Usuario): Observable<Usuario> {
    const url = `${environment.API_URL_BASE}clientes/registrar`;
    return this.http.post<Usuario>(url, registro);
  }
}
