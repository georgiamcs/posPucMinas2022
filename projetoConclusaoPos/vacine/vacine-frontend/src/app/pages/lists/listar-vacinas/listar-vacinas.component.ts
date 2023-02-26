import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
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
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: VacinaService
  ) {
    super(__router, __deviceService, _service);
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nome' },
      { def: 'protecaoContra', showMobile: false },
      { def: 'qtd_doses_estoque' },
      { def: 'vl_atual_unit_dose' },
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
    this.router.navigate([`/controle-estoque-vacina/${id}`]);
  }
}
