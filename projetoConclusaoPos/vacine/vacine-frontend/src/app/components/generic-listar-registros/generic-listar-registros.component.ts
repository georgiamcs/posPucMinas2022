import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { GenericPageComponent } from '../generic-page/generic-page.component';
import { GenericGetterService } from './../../services/generic/generic-getter/generic-getter.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
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
export abstract class GenericListarRegistrosComponent<T extends EntityModel>
  extends GenericPageComponent
  implements AfterViewInit
{
  protected registros: T[] = [];
  protected carregado: boolean = false;

  protected dataSourceMatTable: MatTableDataSource<T> =
    new MatTableDataSource();
  private paginator!: MatPaginator;
  private sort!: MatSort;

  protected abstract getTituloPagina(): string;
  protected abstract getRegistrosExportar(): any[];
  protected abstract getPathCrudUrl(): string;
  protected abstract getDefColunasExibidas(): DefinicaoColunasExibidas[];

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected service: GenericGetterService<T>
  ) {
    super(changeDetectorRef, media, router, serviceAcesso);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (!this.temAcessoVisualizarTodos()) {
      this.tratarErroAcesso(true);
    }
    this.carregarRegistros();
  }

  ngAfterViewInit() {
    this.dataSourceMatTable.paginator = this.paginator;
    this.dataSourceMatTable.sort = this.sort;
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSourceMatTable.paginator = this.paginator;
    this.dataSourceMatTable.sort = this.sort;
  }

  protected carregarRegistros() {
    this.subscriptions.push(
      this.service.getAll().subscribe({
        next: (listaReg) => {
          this.registros = listaReg;
          this.dataSourceMatTable.data = this.registros;
          this.carregado = true;
        },
        error: (erro) => {
          this.carregado = false;
          this.tratarErro(
            `Erro ao carregar registros => ${erro.message}. Tente acessar novamente em alguns minutos. Caso o erro persista, contacte o suporte.`
          );
        },
      })
    );
  }

  protected getDisplayedColumnsMediaType(): string[] {
    let ret = this.getDefColunasExibidas()
      .filter((cd) => {
        const condMobile =
          Util.converterUndefinedEmTrue(cd.showMobileResolution) &&
          this.isMobileResolution();
        const condDesktop =
          Util.converterUndefinedEmTrue(cd.showDesktopResolution) &&
          this.isDesktopResolution();
        const condTabletLow =
          Util.converterUndefinedEmTrue(cd.showTabletLowResolution) &&
          this.isTabletLowResolution();
        const condTabletHigh =
          Util.converterUndefinedEmTrue(cd.showTabletHighResolution) &&
          this.isTabletHighResolution();

        const exibeColuna =
          condMobile || condDesktop || condTabletLow || condTabletHigh;
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
    if (!this.temAcessoAdicionar()) {
      this.tratarErroAcesso(false);
    } else {
      const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);
      this.irParaPagina(this.getPathCrudUrl(), state);
    }
  }

  protected irParaTelaVisualizar(id: string) {
    if (!this.temAcessoVisualizarTodos()) {
      this.tratarErroAcesso(false);
    } else {
      const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);
      this.irParaPagina(`${this.getPathCrudUrl()}/${id}`, state);
    }
  }

  protected irParaTelaEditar(id: string) {
    if (!this.temAcessoAlterar()) {
      this.tratarErroAcesso(false);
    } else {
      const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);
      this.irParaPagina(`${this.getPathCrudUrl()}/editar/${id}`, state);
    }
  }

  protected irParaTelaExcluir(id: string) {
    if (!this.temAcessoExcluir()) {
      this.tratarErroAcesso(false);
    } else {
      const state = UtilRota.gerarStateOrigemRota(TipoOrigemRota.LISTAGEM);
      this.irParaPagina(`${this.getPathCrudUrl()}/excluir/${id}`, state);
    }
  }

  protected exportarParaExcel() {

    const dataFormatada = Util.getDataHoraAtualFormatAnoMesDiaHoraMinutoSegundo();

    const titulo = this.getTituloPagina()
      .trim() // Remove espaços em branco do início e fim da string
      .replace(/\s+/g, '-'); // Substitui múltiplos espaços por um -

    Util.exportToExcel(
      this.getRegistrosExportar(),
      'DadosExportados',
      `${dataFormatada}-${titulo}`
    );
  }

  getPageSizeByResolution(): number[] {

    let ret: number[] = [];

    if (this.isDesktopResolution()) {
      ret = [10, 20, 50, 100];
    } else if (this.isTabletHighResolution()) {
      ret = [6, 15, 30, 50];
    } else if (this.isTabletLowResolution()) {
      ret = [3, 10, 20,];
    } else {
      ret = [6, 15, 30];
    }
    return ret;
  }
}
