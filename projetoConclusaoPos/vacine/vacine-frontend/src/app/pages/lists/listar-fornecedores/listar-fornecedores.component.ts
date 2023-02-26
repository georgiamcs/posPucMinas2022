import { Component } from '@angular/core';
import { FornecedorService } from '../../../services/crud/fornecedor/fornecedor.service';

import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { Fornecedor } from '../../../shared/models/fornecedor.model';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj/cnpj.pipe';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';

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
  }

  protected getTituloPagina(): string {
    return 'Fornecedores';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        Nome: r.nome,
        CNPJ: new CnpjPipe().transform(r.cnpj),
        Email: r.email,
        TelefoneCelular: new TelefonePipe().transform(r.tel_celular)
      };
    });
    return ret;
  }
  protected getPathCrudUrl(): string | null {
    return 'fornecedor';
  }
  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nome' },
      { def: 'cnpj', showMobile: false },
      { def: 'email', showMobile: false },
      { def: 'tel_celular' },
      { def: 'acoes' },
    ];
  }
}
