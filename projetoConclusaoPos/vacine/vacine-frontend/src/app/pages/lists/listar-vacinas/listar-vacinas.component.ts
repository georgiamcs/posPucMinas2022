//TODO: Verificar como usar no routerLink o tipo da rota = usar funcao no ts para retornar?
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
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
    this.definirColunasExibidas();
    this.definirAtributosSuperClasse();
  }

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'nome' },
      { def: 'protecaoContra', showMobile: false },
      { def: 'qtd_doses_estoque' },
      { def: 'acoes' },
    ];
  }

  private definirAtributosSuperClasse() {
    this.pathCrudUrl = 'vacina';
  }
}
