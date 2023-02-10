import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Fornecedor } from 'src/app/shared/models/fornecedor.model';
import { CrudService } from 'src/app/shared/services/crud-service.service';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends CrudService<Fornecedor> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.apiUrlRelativa = 'fornecedores';
  }
}

