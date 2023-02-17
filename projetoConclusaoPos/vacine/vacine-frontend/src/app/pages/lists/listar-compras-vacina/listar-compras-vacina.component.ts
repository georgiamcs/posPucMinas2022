import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';
import { ListaCompraVacinaService } from './../../../services/listagens/lista-compra-vacina/lista-compra-vacina.service';

@Component({
  selector: 'vacine-listar-compras-vacina',
  templateUrl: './listar-compras-vacina.component.html',
  styleUrls: ['./listar-compras-vacina.component.scss'],
})
export class ListarComprasVacinaComponent extends GenericListarRegistrosComponent<ListaComprasVacina> {
  constructor(
    private _router: Router,
    private _service: ListaCompraVacinaService,
    private __deviceService: DeviceDetectorService
  ) {
    super(__deviceService);
    this.definirColunasExibidas();
    this.definirAtributosInjetores();
    this.carregarMensagensAoIniciar();
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

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}
