import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { ListaVacinacoesService } from './../../../services/lists/lista-vacinacoes/lista-vacinacoes.service';
import { ListaVacinacoes } from './../../../shared/classes/lista-vacinacoes.class';

@Component({
  selector: 'vacine-listar-vacinacoes',
  templateUrl: './listar-vacinacoes.component.html',
  styleUrls: ['./listar-vacinacoes.component.scss'],
})
export class ListarVacinacoesComponent extends GenericListarRegistrosComponent<ListaVacinacoes> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override service: ListaVacinacoesService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.VACINACAO;
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
      { def: 'data_aplicacao', showMobileResolution: false },
      {
        def: 'cliente',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      {
        def: 'aplicador_vacina',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      {
        def: 'vacinas',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      {
        def: 'vl_total',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      { def: 'acoes' },
    ];
  }
}
