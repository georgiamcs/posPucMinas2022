import { Component } from '@angular/core';
import { FornecedorService } from '../../../services/crud/fornecedor/fornecedor.service';

import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { Fornecedor } from '../../../shared/models/fornecedor.model';

@Component({
  selector: 'vacine-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
})
export class ListarFornecedoresComponent extends GenericListarRegistrosComponent<Fornecedor> {
  constructor(
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: FornecedorService
  ) {
    super(__router, __deviceService, _service);
    this.definirColunasExibidas();
    this.definirAtributosSuperClasse();
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

  private definirAtributosSuperClasse() {
    this.pathCrudUrl = 'fornecedor';
  }
}
