import { CrudService } from '../../../shared/services/crud/crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Vacina } from '../../../shared/models/vacina.model';

@Injectable({
  providedIn: 'root',
})
export class VacinaService extends CrudService<Vacina> {

  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.apiUrlRelativa = 'vacinas'
  }
}
