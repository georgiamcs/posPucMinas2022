import { FornecedorService } from './../../../services/fornecedor/fornecedor.service';
import { Component } from '@angular/core';

import { Fornecedor } from './../../../shared/models/fornecedor.model';
import { ListarRegistrosComponent } from '../../../shared/components/listar-registros/listar-registros.component';
import { Router } from '@angular/router';


@Component({
  selector: 'vacine-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
})
export class ListarFornecedoresComponent extends ListarRegistrosComponent<Fornecedor> {
  constructor(private _router: Router, private _service: FornecedorService) {
    super();
    this.colunasExibidas = [
      'nome',
      'cnpj',
      'email',
      'tel_celular',
      'tel_fixo',
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
