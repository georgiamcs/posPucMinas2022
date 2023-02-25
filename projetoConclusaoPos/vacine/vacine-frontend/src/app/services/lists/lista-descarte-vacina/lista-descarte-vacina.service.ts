import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaDescarteVacinas } from 'src/app/shared/classes/lista-descarte-vacinas.class';
import { DescarteVacina } from 'src/app/shared/models/descarte-vacina.model';
import { DescarteVacinaService } from '../../crud/descarte-vacina/descarte-vacina.service';
import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';

@Injectable({
  providedIn: 'root',
})
export class ListaDescarteVacinaService extends GenericCrudService<ListaDescarteVacinas> {
  constructor(
    private _http: HttpClient,
    private serviceDescarteVacina: DescarteVacinaService
  ) {
    super();
    this.http = _http;
    this.relativeApiURL = 'vacinacoes';
  }

  static descarteVacinaToListaDescarteVacina(descarteVacina: DescarteVacina): ListaDescarteVacinas {
    let novo = new ListaDescarteVacinas();

    novo._id = descarteVacina._id;
    novo.codigo = descarteVacina.codigo;
    novo.data_descarte = descarteVacina.data_descarte;
    novo.local_descarte = descarteVacina.local_descarte;
    novo.resp_descarte = descarteVacina.usuario_resp_descarte.nome;
    novo.vacinas = descarteVacina.itens_descarte
      .map((i) => i.vacina.nome)
      .sort((a, b) => a!.localeCompare(b!))
      .reduce((acum, currentElement) => `${acum}, ${currentElement}`);

    return novo;
  }

  public override getById(id: string): Observable<ListaDescarteVacinas> {
    return this.serviceDescarteVacina.getByIdConverted<ListaDescarteVacinas>(
      id,
      ListaDescarteVacinaService.descarteVacinaToListaDescarteVacina
    );
  }

  public override getAll(): Observable<ListaDescarteVacinas[]> {
    return this.serviceDescarteVacina.getAllConverted<ListaDescarteVacinas>(
      ListaDescarteVacinaService.descarteVacinaToListaDescarteVacina
    );
  }
}
