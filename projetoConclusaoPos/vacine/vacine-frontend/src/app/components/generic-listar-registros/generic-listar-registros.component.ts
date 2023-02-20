import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericPageComponent } from '../generic-page/generic-page.component';
import { GenericGetterService } from './../../services/generic/generic-getter/generic-getter.service';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TipoOrigemRota } from 'src/app/shared/enums/tipo-rota.enum';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { UtilRota } from 'src/app/shared/utils/rota.util';
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
  protected registros: T[] = [];
  protected dataSourceMatTable: MatTableDataSource<T>;
  protected defColunasExibidas: DefinicaoColunasExibidas[] = [];
  protected carregado: boolean = false;

  protected pathCrudUrl: string;

  constructor(
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    protected service: GenericGetterService<T>
  ) {
    super(_router, _deviceService);
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
          Util.converterUndefinedEmTrue(condMobile) ||
          condDesktop ||
          condTablet;
        return exibeColuna;
      })
      .map((cd) => cd.def);

    return ret;
  }

  protected filtrarRegistrosPeloInput(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMatTable.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMatTable.paginator) {
      this.dataSourceMatTable.paginator.firstPage();
    }
  }

  protected irParaTelaAdicionar() {
    const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);

    this.router.navigate([this.pathCrudUrl], state);
  }

  protected irParaTelaVisualizar(id: string) {
    const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);

    this.router.navigate([`${this.pathCrudUrl}/${id}`], state);
  }

  protected irParaTelaEditar(id: string) {
    const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);

    this.router.navigate([`${this.pathCrudUrl}/editar/${id}`], state);
  }

  protected irParaTelaExcluir(id: string) {
    const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);

    this.router.navigate([`${this.pathCrudUrl}/excluir/${id}`], state);
  }
}
