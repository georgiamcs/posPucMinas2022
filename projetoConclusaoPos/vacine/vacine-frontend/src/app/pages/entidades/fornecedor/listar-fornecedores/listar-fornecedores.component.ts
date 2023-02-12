import { Component } from '@angular/core';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';

import { Router } from '@angular/router';
import { ListarRegistrosComponent } from 'src/app/components/listar-registros/listar-registros.component';
import { Fornecedor } from '../../../../shared/models/fornecedor.model';

@Component({
  selector: 'vacine-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
})
export class ListarFornecedoresComponent extends ListarRegistrosComponent<Fornecedor> {
  constructor(private _router: Router, private _service: FornecedorService) {
    super();
    this.colunasExibidas = ['nome', 'cnpj', 'email', 'tel_celular', 'acoes'];
    this.definirAtributosInjetores();
    this.carregarMensagensAoIniciar();
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}
