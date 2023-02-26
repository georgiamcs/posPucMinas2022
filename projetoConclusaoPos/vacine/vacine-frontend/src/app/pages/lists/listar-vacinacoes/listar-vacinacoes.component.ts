import { ListaVacinacoesService } from './../../../services/lists/lista-vacinacoes/lista-vacinacoes.service';
import { ListaVacinacoes } from './../../../shared/classes/lista-vacinacoes.class';
import { Component } from '@angular/core';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';

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
  }

  protected getTituloPagina(): string {
    return 'Vacinações';
  }

  protected getPathCrudUrl(): string | null {
    return 'vacinacao';
  }

  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Código: r.codigo,
        DataCompra: new Date(r.data_aplicacao + '').toLocaleDateString('pt-BR'),
        Cliente: r.cliente,
        AplicadorVacina: r.aplicador_vacina,
        Vacinas: r.vacinas,
        ValorTotal: r.vl_total,
      };
    });
    return ret;
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'codigo' },
      { def: 'data_aplicacao' },
      { def: 'cliente' },
      { def: 'aplicador_vacina', showMobile: false },
      { def: 'vacinas' },
      { def: 'vl_total', showMobile: false },
      { def: 'acoes' },
    ];
  }
}
