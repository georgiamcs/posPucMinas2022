import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { Util } from 'src/app/shared/utils/util.util';
import { UsuarioTrocaSenha } from '../../../shared/models/usuario-troca-senha.model';
import { Usuario } from '../../../shared/models/usuario.model';
import { Vacinacao } from './../../../shared/models/vacinacao.model';

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
      const url = `${environment.API_URL_BASE}clientes/trocarsenha/${id}`;
      return this.http.put<Usuario>(url, registro);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  getNome(id: string | null | undefined): Observable<string> {
    if (id) {
      const url = `${environment.API_URL_BASE}clientes/nome/${id}`;
      return this.http.get<string>(url);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  registrar(registro: Usuario): Observable<Usuario> {
    const url = `${environment.API_URL_BASE}clientes/registrar`;
    return this.http.post<Usuario>(url, registro);
  }

  getVacinacoes(id: string | null | undefined): Observable<Vacinacao[]> {
    if (id) {
      const url = `${environment.API_URL_BASE}clientes/vacinacoes/${id}`;
      return this.http.get<Vacinacao[]>(url);
    }
    return throwError(() => 'Id do usuário inválido!');
  }

  async getArquivoVacinaoUsuario(id: string | null | undefined): Promise<void> {
    let dados = [];
    await this.getVacinacoes(id).subscribe({
      next: (r) => {
        dados = r.flatMap((v) => {
          return v.itens_vacinacao.map((item) => {
            return {
              'Data de Aplicacao': new Date(
                v.data_aplicacao + ''
              ).toLocaleDateString('pt-BR'),
              codigo: v.codigo,
              vacina: item.vacina.nome,
              lote: item.lote,
              validade: new Date(item.data_validade + '').toLocaleDateString(
                'pt-BR'
              ),
              valor: item.vl_item,
            };
          });
        });

        Util.exportToExcel(dados, 'VacinacoesUsuario', 'VacinacoesUsuario');
      },
      error: (err) => {
        throw err;
      },
    });
  }

}
