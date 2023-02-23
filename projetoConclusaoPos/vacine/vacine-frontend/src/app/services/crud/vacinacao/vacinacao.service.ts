import { Vacinacao } from './../../../shared/models/vacinacao.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class VacinacaoService extends GenericCrudService<Vacinacao>{

  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'vacinacoes';
  }
}
