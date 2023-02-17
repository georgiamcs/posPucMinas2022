import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompraVacina } from 'src/app/shared/models/compra-vacina.model';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';

@Injectable({
  providedIn: 'root',
})
export class ListaCompraVacinaService extends CrudService<ListaComprasVacina> {
  constructor(private _http: HttpClient) {
    super();
    this.http = _http;
    this.apiUrlRelativa = 'compras-vacinas';
  }

  private compraVacinaToListaCompraVacina(
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

  private arrayCompraVacinaToArrayListaCompraVacina(
    lista: CompraVacina[]
  ): ListaComprasVacina[] {
    return lista.map((c) => this.compraVacinaToListaCompraVacina(c));
  }

  override listar(): Observable<ListaComprasVacina[]> {
    return this.http
      .get<CompraVacina[]>(this.apiUrlCompleta)
      .pipe(map((ret) => this.arrayCompraVacinaToArrayListaCompraVacina(ret)));
  }
}
