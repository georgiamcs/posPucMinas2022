import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';

import { Vacina } from '../../../shared/models/vacina.model';

@Injectable({
  providedIn: 'root',
})
export class VacinaService extends GenericCrudService<Vacina> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'vacinas';
  }
}
