import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { ListaControleEstoqueVacinaService } from 'src/app/services/lists/lista-controle-estoque-vacina/lista-controle-estoque-vacina.service';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import {
  getDescTipoEventoContEstoque,
  getDescTpMotivoControleEstVacina
} from 'src/app/shared/enums/estoque.enum';
import { DefinicaoColunasExibidas } from 'src/app/shared/interfaces/defincao-colunas-exibidas.interface';
import { ControleEstoqueVacina } from './../../../shared/models/controle-estoque-vacina.model';

@Component({
  selector: 'vacine-listar-controle-estoque-vacina',
  templateUrl: './listar-controle-estoque-vacina.component.html',
  styleUrls: ['./listar-controle-estoque-vacina.component.scss'],
})
export class ListarControleEstoqueVacinaComponent extends GenericListarRegistrosComponent<ControleEstoqueVacina> {
  private idVacina: string | null;
  protected nomeVacina: string | null;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override service: ListaControleEstoqueVacinaService,
    private activatedRoute: ActivatedRoute
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, service);
    this.idVacina = this.activatedRoute.snapshot.paramMap.get('idVacina');
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    return TemaAcessoUsuario.VACINA;
  }

  protected getTituloPagina(): string {
    return 'Histórico do Controle de Estoque';
  }

  protected getPathCrudUrl(): string | null {
    return '';
  }

  protected getRegistrosExportar(): any[] {
    let ret = this.registros.map((r) => {
      return {
        DataEvento: new Date(r.data_evento + '').toLocaleDateString('pt-BR'),
        TipoEvento: r.tipo_evento,
        TipoMotivo: r.tipo_motivo,
        DescricaoEvento: r.descricao_evento,
        QtdItens: this.calcularQtdItens(r),
        QtdEstoqueAntes: r.qtd_estoque_antes,
        QtdEstoqueDepois: r.qtd_estoque_depois,
      };
    });
    return ret;
  }

  protected getDefColunasExibidas(): DefinicaoColunasExibidas[] {
    return [
      { def: 'data_evento' },
      {
        def: 'tipo_evento',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'tipo_motivo', showMobileResolution: false },
      {
        def: 'descricao_evento',
        showMobileResolution: false,
        showTabletLowResolution: false,
        showTabletHighResolution: false,
      },
      {
        def: 'qtd_itens',
        showMobileResolution: false,
        showTabletLowResolution: false,
      },
      { def: 'qtd_estoque_antes' },
      { def: 'qtd_estoque_depois' },
    ];
  }

  private convertListaControleEstoque(lista: ControleEstoqueVacina[]) {
    lista.forEach((i) => {
      i.tipo_evento = getDescTipoEventoContEstoque(i.tipo_evento);
      i.tipo_motivo = getDescTpMotivoControleEstVacina(i.tipo_motivo);
    });

    lista.sort((a, b) => {
      return -(a.data_evento.valueOf() - b.data_evento.valueOf());
    });
    return lista;
  }

  calcularQtdItens(registro: ControleEstoqueVacina): number {
    const vl_est_antes = !!registro.qtd_estoque_antes
      ? registro.qtd_estoque_antes
      : 0;
    const vl_est_depois = !!registro.qtd_estoque_depois
      ? registro.qtd_estoque_depois
      : 0;

    return vl_est_depois - vl_est_antes;
  }

  protected override carregarRegistros() {
    this.subscription = this.service.getByIdVacina(this.idVacina!).subscribe({
      next: (listaReg) => {
        if (listaReg.length > 0 && !!listaReg[0].vacina.nome) {
          this.nomeVacina = listaReg[0].vacina.nome;
        }
        this.registros = this.convertListaControleEstoque(listaReg);
        this.dataSourceMatTable.data = this.registros;
        this.carregado = true;
      },
      error: (erro) => {
        this.carregado = false;
        this.tratarErro(
          `Erro ao carregar registros => ${erro.message}. Tente acessar novamente em alguns minutos. Caso o erro persista, contacte o suporte.`
        );
      },
    });
  }

  protected voltar() {
    this.router.navigate(['vacinas']);
  }
}
