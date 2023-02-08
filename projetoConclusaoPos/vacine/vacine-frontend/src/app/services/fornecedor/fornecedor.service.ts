import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/environment';
import { ServiceCrud } from 'src/app/shared/interfaces/crud.service.interface';
import { Fornecedor } from 'src/app/shared/models/fornecedor.model';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService implements ServiceCrud {
  private API_URL_COMPLETA = environment.API_URL + 'fornecedores/';

  constructor(private http: HttpClient) {}

  listar(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.API_URL_COMPLETA);
  }

  incluir(vacina: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.API_URL_COMPLETA, vacina);
  }

  excluir(id: string): Observable<Fornecedor> {
    const url = `${this.API_URL_COMPLETA}${id}`;
    return this.http.delete<Fornecedor>(url);
  }

  alterar(vacina: Fornecedor): Observable<Fornecedor> {
    const url = `${this.API_URL_COMPLETA}${vacina._id}`;
    return this.http.put<Fornecedor>(url, vacina);
  }

  procurarPorId(id: string): Observable<Fornecedor> {
    const url = `${this.API_URL_COMPLETA}${id}`;
    return this.http.get<Fornecedor>(url);
  }
}

