import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericPageComponent } from '../generic-page/generic-page.component';

import { EntityModel } from 'src/app/shared/models/entity.model';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { converterUndefinedEmTrue } from 'src/app/shared/utils/util.util';

@Component({
  selector: 'vacine-generic-listar-registros',
  templateUrl: './generic-listar-registros.component.html',
  styleUrls: ['./generic-listar-registros.component.scss'],
})
export class GenericListarRegistrosComponent<T extends EntityModel>
  extends GenericPageComponent
  implements OnInit, OnDestroy
{
  protected service: CrudService<T>;
  protected registros: T[] = [];
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
    this.subscription = this.service.listar().subscribe({
      next: (listaReg) => {
        this.carregado = true;
        this.registros = listaReg;
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
          converterUndefinedEmTrue(cd.showMobile) && this.isMobile();
        let condDesktop = converterUndefinedEmTrue(cd.showDesktop) && this.isDesktop();
        let condTablet = converterUndefinedEmTrue(cd.showTablet) && this.isTablet();
        let exibeColuna = converterUndefinedEmTrue(condMobile) || condDesktop || condTablet;
        return exibeColuna;
      })
      .map((cd) => cd.def);

    return ret;
  }
}
