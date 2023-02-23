import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';
import { CompraVacina } from 'src/app/shared/models/compra-vacina.model';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';
import { CompraVacinaService } from '../../crud/compra-vacina/compra-vacina.service';

@Injectable({
  providedIn: 'root',
})
export class ListaCompraVacinaService extends GenericCrudService<ListaComprasVacina> {
  constructor(
    private _http: HttpClient,
    private serviceCompraVacina: CompraVacinaService
  ) {
    super();
    this.http = _http;
    this.relativeApiURL = 'compras-vacinas';
  }

  nota_fiscal: string | undefined | null;
  data_compra: string | undefined | null;
  fornecedor_nome: string | undefined | null;
  itens: string | undefined | null;
  vl_total_compra: string | undefined | null;

  static compraVacinaToListaCompraVacina(
    compraVacina: CompraVacina
  ): ListaComprasVacina {
    let novo = new ListaComprasVacina();

    novo.nota_fiscal = compraVacina.nota_fiscal;
    novo.data_compra = new Date(compraVacina.data_compra).toLocaleDateString(
      'pt-BR'
    );
    novo.fornecedor_nome = compraVacina.fornecedor.nome;
    novo.itens = compraVacina.itens_compra
      .map((i) => i.vacina.nome)
      .reduce((acum, currentElement) => `${acum}, ${currentElement}`);
    novo.vl_total_compra = compraVacina.vl_total_compra.toLocaleString(
      'pt-br',
      { minimumFractionDigits: 2 }
    );

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
