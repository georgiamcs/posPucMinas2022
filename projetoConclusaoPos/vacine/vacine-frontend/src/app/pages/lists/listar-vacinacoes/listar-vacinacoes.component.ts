import { ListaVacinacoesService } from './../../../services/lists/lista-vacinacoes/lista-vacinacoes.service';
import { ListaVacinacoes } from './../../../shared/classes/lista-vacinacoes.class';
import { Component } from '@angular/core';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'vacine-listar-vacinacoes',
  templateUrl: './listar-vacinacoes.component.html',
  styleUrls: ['./listar-vacinacoes.component.scss'],
})
export class ListarVacinacoesComponent extends GenericListarRegistrosComponent<ListaVacinacoes> {
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: ListaVacinacoesService
  ) {
    super(__router, __deviceService, _service);

    this.pathCrudUrl = 'compras-vacina';

    this.definirColunasExibidas();
    this.definirAtributosSuperClasse();
  }

  codigo: string | undefined | null;
  data_aplicacao: string | undefined | null;
  cliente: string | undefined | null;
  aplicador_vacina: string | undefined | null;
  vacinas: string | undefined | null;
  vl_total: string | undefined | null;

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'codigo' },
      { def: 'data_aplicacao' },
      { def: 'cliente' },
      { def: 'aplicador_vacina', showMobile: false },
      { def: 'vacinas' },
      { def: 'vl_total', showMobile: false },
      { def: 'acoes' },
    ];
  }

  private definirAtributosSuperClasse() {
    this.pathCrudUrl = 'vacinacao';
  }
}
