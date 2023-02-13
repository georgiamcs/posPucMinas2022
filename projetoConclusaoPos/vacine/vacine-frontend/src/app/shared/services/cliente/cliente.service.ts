import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { UsuarioTrocaSenha } from '../../models/usuario-troca-senha.model';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  trocarSenha(registro: UsuarioTrocaSenha): Observable<Usuario> {
    const url = `${environment.API_URL_BASE}$cliente/${registro._id}`;
    return this.http.put<Usuario>(url, registro);
  }
}
