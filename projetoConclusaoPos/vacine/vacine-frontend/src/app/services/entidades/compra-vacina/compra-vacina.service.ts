import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';
import { Injectable } from '@angular/core';
import { CompraVacina } from 'src/app/shared/models/compra-vacina.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompraVacinaService extends GenericCrudService<CompraVacina>{

  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'compras-vacinas';
  }

}
