import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericListarRegistrosComponent } from 'src/app/components/generic-listar-registros/generic-listar-registros.component';
import { ListaControleEstoqueVacinaService } from 'src/app/services/lists/lista-controle-estoque-vacina/lista-controle-estoque-vacina.service';
import { getDescTipoEventoContEstoque, getDescTpMotivoControleEstVacina } from 'src/app/shared/enums/estoque.enum';
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
    private __router: Router,
    private __deviceService: DeviceDetectorService,
    private _service: ListaControleEstoqueVacinaService,
    private activatedRoute: ActivatedRoute
  ) {
    super(__router, __deviceService, _service);
    this.definirColunasExibidas();
    this.idVacina = this.activatedRoute.snapshot.paramMap.get('idVacina');
  }

  protected definirColunasExibidas() {
    this.defColunasExibidas = [
      { def: 'data_evento' },
      { def: 'tipo_evento' },
      { def: 'tipo_motivo' },
      { def: 'descricao_evento' },
      { def: 'qtd_itens' },
      { def: 'qtd_estoque_antes' },
      { def: 'qtd_estoque_depois' },
    ];
  }

  private convertListaControleEstoque(lista: ControleEstoqueVacina[]) {
    lista.forEach((i) => {
      i.tipo_evento = getDescTipoEventoContEstoque(i.tipo_evento);
      i.tipo_motivo = getDescTpMotivoControleEstVacina(i.tipo_motivo);
    });
    return lista;
  }

  calcularQtdItens(registro: ControleEstoqueVacina): number {

    const vl_est_antes = !!registro.qtd_estoque_antes ? registro.qtd_estoque_antes: 0;
    const vl_est_depois = !!registro.qtd_estoque_depois
      ? registro.qtd_estoque_depois
      : 0;

    return (vl_est_depois - vl_est_antes);
  }

  protected override carregarRegistros() {
    this.subscription = this._service.getByIdVacina(this.idVacina!).subscribe({
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
