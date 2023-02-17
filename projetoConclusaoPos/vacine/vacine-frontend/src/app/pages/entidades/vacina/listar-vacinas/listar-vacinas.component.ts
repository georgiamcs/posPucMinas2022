//TODO: Verificar como usar no routerLink o tipo da rota = usar funcao no ts para retornar?
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { Vacina } from 'src/app/shared/models/vacina.model';
import { VacinaService } from '../../../../services/entidades/vacina/vacina.service';

@Component({
  selector: 'vacine-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent extends GenericListarRegistrosComponent<Vacina> {
  constructor(
    private _router: Router,
    private _service: VacinaService,
    private __deviceService: DeviceDetectorService
  ) {
    super(__deviceService);
    this.definirColunasExibidas();
    this.definirAtributosInjetores();
    this.carregarMensagensAoIniciar();
  }

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'nome' },
      { def: 'protecaoContra', showMobile: false },
      { def: 'vlIdadeRecomendada', showMobile: false },
      { def: 'estoque' },
      { def: 'acoes' },
    ];
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}
