import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
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
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override service: ListaDescarteVacinaService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.DESCARTE_VACINA;
  }

  protected getTituloPagina(): string {
    return 'Descartes de Vacinas';
  }

  protected getPathCrudUrl(): string {
    return 'descarte-vacina';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Código: r.codigo,
        DataDescarte: new Date(r.data_descarte + '').toLocaleDateString(
          'pt-BR'
        ),
        MotivoDescarte: r.motivo_descarte,
        Vacinas: r.vacinas,
        ResponsavelDescarte: r.resp_descarte,
      };
    });
    return ret;
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'codigo' },
      { def: 'data_descarte', showMobileResolution: false },
      {
        def: 'motivo_descarte',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'vacinas', showMobileResolution: false },
      {
        def: 'resp_descarte',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      { def: 'acoes' },
    ];
  }
}
