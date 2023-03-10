import { ChangeDetectorRef, Component } from '@angular/core';
import { FornecedorService } from '../../../services/crud/fornecedor/fornecedor.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj/cnpj.pipe';
import { TelefonePipe } from 'src/app/shared/pipes/telefone/telefone.pipe';
import { Fornecedor } from '../../../shared/models/fornecedor.model';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';

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
    protected override serviceAcesso: ControleAcessoService,
    protected override service: FornecedorService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.FORNECEDOR_VACINA;
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
  protected getPathCrudUrl(): string {
    return 'fornecedor';
  }
  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nome' },
      {
        def: 'cnpj',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      {
        def: 'email',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      { def: 'tel_celular', showMobileResolution: false },
      { def: 'acoes' },
    ];
  }
}
