import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { UsuarioTrocaSenha } from '../../models/usuario-troca-senha.model';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  trocarSenha(
    id: string | null | undefined,
    registro: UsuarioTrocaSenha
  ): Observable<Usuario> {
    if (id) {
      const url = `${environment.API_URL_BASE}cliente/trocarsenha/${id}`;
      return this.http.put<Usuario>(url, registro);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  getNome(id: string | null | undefined): Observable<string> {
    if (id) {
      const url = `${environment.API_URL_BASE}cliente/nome/${id}`;
      return this.http.get<string>(url);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  registrar(registro: Usuario): Observable<Usuario> {
    const url = `${environment.API_URL_BASE}cliente/registrar`;
    return this.http.post<Usuario>(url, registro);
  }
}
