import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';
import { ListaCompraVacinaService } from './../../../services/lists/lista-compra-vacina/lista-compra-vacina.service';

@Component({
  selector: 'vacine-listar-compras-vacina',
  templateUrl: './listar-compras-vacina.component.html',
  styleUrls: ['./listar-compras-vacina.component.scss'],
})
export class ListarComprasVacinaComponent extends GenericListarRegistrosComponent<ListaComprasVacina> {
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: ListaCompraVacinaService
  ) {
    super(__router, __deviceService, _service);

    this.pathCrudUrl = 'compras-vacina';

    this.definirColunasExibidas();
    this.definirAtributosSuperClasse();
  }

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'nota_fiscal' },
      { def: 'data_compra' },
      { def: 'fornecedor_nome' },
      { def: 'itens', showMobile: false },
      { def: 'vl_total_compra' },
      { def: 'acoes' },
    ];
  }

  private definirAtributosSuperClasse() {
    this.pathCrudUrl = 'compra-vacina';
  }
}
