import { GenericGetterService } from './../../services/generic/generic-getter/generic-getter.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericPageComponent } from '../generic-page/generic-page.component';

import { MatTableDataSource } from '@angular/material/table';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';
import { Util } from 'src/app/shared/utils/util.util';

@Component({
  selector: 'vacine-generic-listar-registros',
  templateUrl: './generic-listar-registros.component.html',
  styleUrls: ['./generic-listar-registros.component.scss'],
})
export class GenericListarRegistrosComponent<T extends EntityModel>
  extends GenericPageComponent
  implements OnInit, OnDestroy
{
  protected service: GenericGetterService<T>;
  protected registros: T[] = [];
  protected dataSourceMatTable: MatTableDataSource<T>;
  protected defColunasExibidas: DefinicaoColunasExibidas[] = [];
  protected carregado: boolean = false;

  constructor(private _deviceService: DeviceDetectorService) {
    super();
    this.deviceService = this._deviceService;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.carregarRegistros();
  }

  protected carregarRegistros() {
    this.subscription = this.service.getAll().subscribe({
      next: (listaReg) => {
        this.registros = listaReg;
        this.dataSourceMatTable = new MatTableDataSource(this.registros);
        this.carregado = true;
      },
      error: (erro) => {
        this.carregado = false;
        this.tratarErro(
          `Erro ao carregar registros => ${erro.message}. Tente acessar novamente em alguns minutos. Caso o erro persista, contacte o suporte.`
        );
      },
    });
  }

  protected getDisplayedColumnsMediaType(): string[] {
    let ret = this.defColunasExibidas
      .filter((cd) => {
        let condMobile =
          Util.converterUndefinedEmTrue(cd.showMobile) && this.isMobile();
        let condDesktop =
          Util.converterUndefinedEmTrue(cd.showDesktop) && this.isDesktop();
        let condTablet =
          Util.converterUndefinedEmTrue(cd.showTablet) && this.isTablet();
        let exibeColuna =
          Util.converterUndefinedEmTrue(condMobile) || condDesktop || condTablet;
        return exibeColuna;
      })
      .map((cd) => cd.def);

    return ret;
  }

  filtrarRegistrosPeloInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMatTable.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMatTable.paginator) {
      this.dataSourceMatTable.paginator.firstPage();
    }
  }
}
