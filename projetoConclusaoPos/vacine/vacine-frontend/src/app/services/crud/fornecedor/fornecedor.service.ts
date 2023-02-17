import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Fornecedor } from 'src/app/shared/models/fornecedor.model';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService extends GenericCrudService<Fornecedor> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'fornecedores';
  }
}

