import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vacinacao } from 'src/app/shared/models/vacinacao.model';
import { VacinacaoService } from '../../crud/vacinacao/vacinacao.service';
import { GenericCrudService } from '../../generic/generic-crud/generic-crud.service';
import { ListaVacinacoes } from './../../../shared/classes/lista-vacinacoes.class';

@Injectable({
  providedIn: 'root',
})
export class ListaVacinacoesService extends GenericCrudService<ListaVacinacoes> {
  constructor(
    private _http: HttpClient,
    private serviceVacinacao: VacinacaoService
  ) {
    super();
    this.http = _http;
    this.relativeApiURL = 'vacinacoes';
  }

  static vacinacaoToListaVacinacao(vacinacao: Vacinacao): ListaVacinacoes {
    let novo = new ListaVacinacoes();

    novo._id = vacinacao._id;
    novo.codigo = vacinacao.codigo;
    novo.data_aplicacao = vacinacao.data_aplicacao;
    novo.cliente = vacinacao.usuario_cliente.nome;
    novo.aplicador_vacina = vacinacao.usuario_aplicador_vacina.nome;
    novo.vl_total = vacinacao.vl_total.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });
    novo.vacinas = vacinacao.itens_vacinacao
      .map((i) => i.vacina.nome)
      .sort((a, b) => a!.localeCompare(b!))
      .reduce((acum, currentElement) => `${acum}, ${currentElement}`);

    return novo;
  }

  public override getById(id: string): Observable<ListaVacinacoes> {
    return this.serviceVacinacao.getByIdConverted<ListaVacinacoes>(
      id,
      ListaVacinacoesService.vacinacaoToListaVacinacao
    );
  }

  public override getAll(): Observable<ListaVacinacoes[]> {
    return this.serviceVacinacao.getAllConverted<ListaVacinacoes>(
      ListaVacinacoesService.vacinacaoToListaVacinacao
    );
  }
}
