import { CompraVacinaService } from './../../entidades/compra-vacina/compra-vacina.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompraVacina } from 'src/app/shared/models/compra-vacina.model';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';

@Injectable({
  providedIn: 'root',
})
export class ListaCompraVacinaService extends GenericCrudService<ListaComprasVacina> {

  constructor(private _http: HttpClient, private serviceCompraVacina: CompraVacinaService) {
    super();
    this.http = _http;
    this.relativeApiURL = 'compras-vacinas';
  }

  static compraVacinaToListaCompraVacina(
    compraVacina: CompraVacina
  ): ListaComprasVacina {
    let novo = new ListaComprasVacina();

    novo._id = compraVacina._id;
    novo.data_compra = new Date(compraVacina.data_compra).toLocaleDateString(
      'pt-BR'
    );
    novo.dt_inclusao = compraVacina.dt_inclusao;
    novo.dt_alteracao = compraVacina.dt_alteracao;
    novo.fornecedor_nome = compraVacina.fornecedor_nome;
    novo.nota_fiscal = compraVacina.nota_fiscal;
    novo.vl_total_compra = compraVacina.vl_total_compra.toLocaleString(
      'pt-br',
      { minimumFractionDigits: 2 }
    );
    novo.itens = compraVacina.itens_compra
      .map((i) => i.vacina_nome)
      .reduce((acum, currentElement) => `${acum}, ${currentElement}`);

    return novo;
  }

  public override getById(id: string): Observable<ListaComprasVacina> {

    return this.serviceCompraVacina.getByIdConverted<ListaComprasVacina>(
      id,
      ListaCompraVacinaService.compraVacinaToListaCompraVacina
    );
  }

  public override getAll(): Observable<ListaComprasVacina[]> {

    return this.serviceCompraVacina.getAllConverted<ListaComprasVacina>(
      ListaCompraVacinaService.compraVacinaToListaCompraVacina
    );
  }
}
