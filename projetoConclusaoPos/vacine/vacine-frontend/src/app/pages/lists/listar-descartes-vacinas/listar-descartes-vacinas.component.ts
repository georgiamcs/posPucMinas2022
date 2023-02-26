import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { ListaDescarteVacinaService } from './../../../services/lists/lista-descarte-vacina/lista-descarte-vacina.service';
import { ListaDescarteVacinas } from './../../../shared/classes/lista-descarte-vacinas.class';

@Component({
  selector: 'vacine-listar-descarte-vacinas',
  templateUrl: './listar-descartes-vacinas.component.html',
  styleUrls: ['./listar-descartes-vacinas.component.scss'],
})
export class ListarDescarteVacinasComponent extends GenericListarRegistrosComponent<ListaDescarteVacinas> {
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: ListaDescarteVacinaService
  ) {
    super(__router, __deviceService, _service);
  }

  protected getTituloPagina(): string {
    return 'Descartes de Vacinas';
  }

  protected getPathCrudUrl(): string | null {
    return 'descartes-vacina';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Código: r.codigo,
        DataDescarte: new Date(r.data_descarte + '').toLocaleDateString(
          'pt-BR'
        ),
        ResponsavelDescarte: r.resp_descarte,
        Vacinas: r.vacinas,
      };
    });
    return ret;
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'codigo' },
      { def: 'data_descarte' },
      { def: 'resp_descarte', showMobile: false },
      { def: 'vacinas' },
      { def: 'acoes' },
    ];
  }
}
