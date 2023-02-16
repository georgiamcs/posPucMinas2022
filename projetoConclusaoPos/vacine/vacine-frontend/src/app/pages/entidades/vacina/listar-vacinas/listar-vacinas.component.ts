//TODO: Verificar como usar no routerLink o tipo da rota = usar funcao no ts para retornar?
//TODO: Verfificar se tem como colocar mensagens diferentes qnd backend fora e qnd nao tem registros. Atualmente, nos dois casos aparece sem registros
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

import { ListarRegistrosComponent } from 'src/app/components/listar-registros/listar-registros.component';
import { Vacina } from 'src/app/shared/models/vacina.model';
import { VacinaService } from '../../../../services/vacina/vacina.service';

@Component({
  selector: 'vacine-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent extends ListarRegistrosComponent<Vacina> {
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
      { def: 'nome', showMobile: true, showDesktop: true, showTablet: true },
      {
        def: 'protecaoContra',
        showMobile: false,
        showDesktop: true,
        showTablet: true,
      },
      {
        def: 'vlIdadeRecomendada',
        showMobile: false,
        showDesktop: true,
        showTablet: true,
      },
      {
        def: 'estoque',
        showMobile: true,
        showDesktop: true,
        showTablet: true,
      },
      { def: 'acoes', showMobile: true, showDesktop: true, showTablet: true },
    ];
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}
