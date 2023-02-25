import { DescarteVacina } from './../../../shared/models/descarte-vacina.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class DescarteVacinaService extends GenericCrudService<DescarteVacina> {

  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'descarte-vacinas';
  }
}
