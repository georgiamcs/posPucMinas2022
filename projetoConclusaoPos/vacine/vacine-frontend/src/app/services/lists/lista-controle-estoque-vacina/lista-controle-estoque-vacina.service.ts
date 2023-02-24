import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericGetterService } from '../../generic/generic-getter/generic-getter.service';
import { ControleEstoqueVacina } from './../../../shared/models/controle-estoque-vacina.model';

@Injectable({
  providedIn: 'root',
})
export class ListaControleEstoqueVacinaService extends GenericGetterService<ControleEstoqueVacina> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.relativeApiURL = 'vacinas/controle-estoque';
  }

  public getByIdVacina(idVacina: string): Observable<ControleEstoqueVacina[]> {
    const url = `${this.fullApiURL}${idVacina}`;
    return this.http.get<ControleEstoqueVacina[]>(url);
  }
}
