import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';
import { ListaCompraVacinaService } from '../../../services/lists/lista-compra-vacina/lista-compra-vacina.service';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Util } from 'src/app/shared/utils/util.util';

@Component({
  selector: 'vacine-listar-compras-vacina',
  templateUrl: './listar-compras-vacinas.component.html',
  styleUrls: ['./listar-compras-vacinas.component.scss'],
})
export class ListarComprasVacinaComponent extends GenericListarRegistrosComponent<ListaComprasVacina> {
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: ListaCompraVacinaService
  ) {
    super(__router, __deviceService, _service);
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nota_fiscal' },
      { def: 'data_compra' },
      { def: 'fornecedor_nome' },
      { def: 'itens', showMobile: false },
      { def: 'vl_total_compra' },
      { def: 'acoes' },
    ];
  }

  protected getPathCrudUrl() {
    return 'compra-vacina';
  }

  protected getTituloPagina(): string {
    return 'Compras de Vacinas';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
    return {
      NotaFiscal: r.nota_fiscal,
      DataCompra: new Date(r.data_compra+'').toLocaleDateString('pt-BR'),
      NomeFornecedor: r.fornecedor_nome,
      ItensCompra: r.itens,
      ValorTotalCompra: r.vl_total_compra
    }});
    return ret;
  }
  protected irParaTelaControleEstoque(id: string) {
    this.router.navigate([`/controle-estoque-vacina/${id}`]);
  }
}
