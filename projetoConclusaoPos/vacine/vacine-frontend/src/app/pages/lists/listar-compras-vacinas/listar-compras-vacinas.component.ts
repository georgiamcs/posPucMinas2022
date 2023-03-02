import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { ListaCompraVacinaService } from '../../../services/lists/lista-compra-vacina/lista-compra-vacina.service';
import { ListaComprasVacina } from '../../../shared/classes/lista-compras-vacina.class';

@Component({
  selector: 'vacine-listar-compras-vacina',
  templateUrl: './listar-compras-vacinas.component.html',
  styleUrls: ['./listar-compras-vacinas.component.scss'],
})
export class ListarComprasVacinaComponent extends GenericListarRegistrosComponent<ListaComprasVacina> {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override service: ListaCompraVacinaService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.COMPRA_VACINA;
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'nota_fiscal' },
      { def: 'data_compra', showMobileResolution: false },
      {
        def: 'fornecedor_nome',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'itens', showMobileResolution: false },
      {
        def: 'vl_total_compra',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      { def: 'acoes' },
    ];
  }

  protected getPathCrudUrl() {
    return 'compra-vacina';
  }

  protected getTituloPagina(): string {
    return 'Compras de Vacinas';
  }
  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        NotaFiscal: r.nota_fiscal,
        DataCompra: new Date(r.data_compra + '').toLocaleDateString('pt-BR'),
        NomeFornecedor: r.fornecedor_nome,
        ItensCompra: r.itens,
        ValorTotalCompra: r.vl_total_compra,
      };
    });
    return ret;
  }
  protected irParaTelaControleEstoque(id: string) {
    this.router.navigate([`/controle-estoque-vacina/${id}`]);
  }
}
