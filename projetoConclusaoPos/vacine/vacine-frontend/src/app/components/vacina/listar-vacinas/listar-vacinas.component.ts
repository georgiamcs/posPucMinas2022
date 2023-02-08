//TODO: Verificar como usar no routerLink o tipo da rota = usar funcao no ts para retornar?
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Vacina } from 'src/app/shared/models/vacina.model';
import { VacinaService } from '../../../services/vacina/vacina.service';
import { ListarRegistrosComponent } from '../../../shared/components/listar-registros/listar-registros.component';

@Component({
  selector: 'vacine-listar-vacinas',
  templateUrl: './listar-vacinas.component.html',
  styleUrls: ['./listar-vacinas.component.scss'],
})
export class ListarVacinasComponent extends ListarRegistrosComponent<Vacina> {
  constructor(private _router: Router, private _service: VacinaService) {
    super();
    this.colunasExibidas = [
      'nome',
      'protecaoContra',
      'vlIdadeRecomemendada',
      'acoes',
    ];
    this.definirAtributosInjetores();
    this.carregarMensagensAoIniciar();
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }

}
