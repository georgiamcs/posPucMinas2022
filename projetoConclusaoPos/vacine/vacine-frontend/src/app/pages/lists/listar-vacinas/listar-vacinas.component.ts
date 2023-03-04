import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Vacina } from 'src/app/shared/models/vacina.model';
import { VacinaService } from '../../../services/crud/vacina/vacina.service';

@Component({
  selector: 'vacine-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent extends GenericListarRegistrosComponent<Vacina> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override service: VacinaService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.VACINA;
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nome' },
      {
        def: 'protecaoContra',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'qtd_doses_estoque', showMobileResolution: false },
      { def: 'vl_atual_unit_dose', showMobileResolution: false },
      { def: 'acoes' },
    ];
  }

  protected getPathCrudUrl() {
    return 'vacina';
  }

  protected getTituloPagina(): string {
    return 'Vacinas';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Nome: r.nome,
        ProtecaoContra: r.protecao_contra,
        QtdDosesEstoque: r.qtd_doses_estoque,
        ValorAtualDose: r.vl_atual_unit_dose,
      };
    });
    return ret;
  }

  protected irParaTelaControleEstoque(id: string) {
   this.irParaPagina(`/controle-estoque-vacina/${id}`);
  }
}
