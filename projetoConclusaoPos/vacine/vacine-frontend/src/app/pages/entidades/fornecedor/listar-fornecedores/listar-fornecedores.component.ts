import { Component } from '@angular/core';
import { FornecedorService } from '../../../../services/fornecedor/fornecedor.service';

import { Router } from '@angular/router';
import { ListarRegistrosComponent } from 'src/app/components/listar-registros/listar-registros.component';
import { Fornecedor } from '../../../../shared/models/fornecedor.model';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'vacine-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
})
export class ListarFornecedoresComponent extends ListarRegistrosComponent<Fornecedor> {
  constructor(
    private _router: Router,
    private _service: FornecedorService,
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
      { def: 'cnpj', showMobile: false },
      { def: 'email', showMobile: false },
      { def: 'tel_celular' },
      { def: 'acoes' },
    ];
  }

  private definirAtributosInjetores() {
    this.service = this._service;
    this.router = this._router;
  }
}
