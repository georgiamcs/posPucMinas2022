import { ChangeDetectorRef, Component } from '@angular/core';
import { FornecedorService } from '../../../services/crud/fornecedor/fornecedor.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj/cnpj.pipe';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';
import { Fornecedor } from '../../../shared/models/fornecedor.model';

@Component({
  selector: 'vacine-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.scss'],
})
export class ListarFornecedoresComponent extends GenericListarRegistrosComponent<Fornecedor> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override service: FornecedorService
  ) {
    super(changeDetectorRef, media, router, service);
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
        TelefoneCelular: new TelefonePipe().transform(r.tel_celular),
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
      { def: 'cnpj', showMobileResolution: false },
      { def: 'email', showMobileResolution: false },
      { def: 'tel_celular' },
      { def: 'acoes' },
    ];
  }
}
