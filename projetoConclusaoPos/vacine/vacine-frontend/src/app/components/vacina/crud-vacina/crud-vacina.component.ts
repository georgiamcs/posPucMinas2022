//TODO: Validar campos obrigatorios
//TODO: Verificar porque nao esta funcionando qnd nao marca idade recomendada
//TODO: Verificar porque nao esta funcionando qnd marca idade anos
//TODO: Desabilitar tipo e idade recomendada se nao tem idade recomendada
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TipoRota } from './../../../shared/enums/tipo-rota.enum';
import { VacinaService } from './../../../services/vacina/vacina.service';
import { DialogoConfirmacaoComponent } from './../../lib/dialogo-confirmacao/dialogo-confirmacao.component';

import {
  DominioIdadeRecomendada,
  Vacina,
} from '../../../shared/models/vacina.model';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario-enum';
import {
  mapearDominio,
  DominioCodigoRotulo,
} from 'src/app/shared/models/dominio-codigo-rotulo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent implements OnInit {
  modoFormulario: ModoFormulario;
  vacina: Vacina;
  idVacina: string | null;
  lbBotaoSalvar: string | null;
  lbBotaoFechar: string | null;

  tiposIdadeRecomendada: DominioCodigoRotulo[];

  private ROTULO_BOTAO_ACEITAR = 'Sim';
  private ROTULO_BOTAO_REJEITAR = 'Não';

  constructor(
    private vacinaService: VacinaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogoConf: MatDialog
  ) {
    this.vacina = new Vacina();
    this.tiposIdadeRecomendada = mapearDominio(DominioIdadeRecomendada);
    this.idVacina = this.activatedRoute.snapshot.paramMap.get('id');
    this.definirModoFormulario();
    this.definirLabelsBotoes();
  }

  private definirModoFormulario() {
    if (!this.idVacina) {
      this.modoFormulario = ModoFormulario.INCLUSAO;
    } else {
      this.modoFormulario =
        this.router.url.indexOf(TipoRota.ALTERACAO) > 0
          ? ModoFormulario.ALTERACAO
          : this.router.url.indexOf(TipoRota.EXCLUSAO) > 0
          ? ModoFormulario.EXCLUSAO
          : ModoFormulario.CONSULTA;
    }
  }

  private definirLabelsBotoes() {
    this.lbBotaoFechar = 'Cancelar';

    switch (this.modoFormulario) {
      case ModoFormulario.INCLUSAO:
        this.lbBotaoSalvar = 'Incluir';
        break;
      case ModoFormulario.ALTERACAO:
        this.lbBotaoSalvar = 'Alterar';
        break;
      case ModoFormulario.EXCLUSAO:
        this.lbBotaoSalvar = 'Excluir';
        break;
      case ModoFormulario.CONSULTA:
        this.lbBotaoFechar = 'Fechar';
        break;
    }
  }

  ngOnInit(): void {
    if (this.modoFormulario != ModoFormulario.INCLUSAO) {
      if (this.idVacina) {
        this.vacinaService
          .procurarPorId(this.idVacina)
          .subscribe((vacinaBusca) => (this.vacina = vacinaBusca));
      }
    }
  }

  private incluirVacina() {
    this.vacinaService
      .incluir(this.vacina)
      .subscribe(() => this.carregarVacinas());
  }

  private alterarVacina() {
    this.vacinaService
      .alterar(this.vacina)
      .subscribe(() => this.carregarVacinas());
  }

  private excluirVacina(idVacina: string) {
    this.vacinaService.excluir(idVacina).subscribe(() => {
      this.carregarVacinas();
    });
  }

  somenteLeitura(): boolean {
    return this.modoFormulario == ModoFormulario.CONSULTA;
  }

  private carregarVacinas() {
    this.router.navigate(['/listar-vacina']);
  }

  private confirmarExclusaoVacina(vacina: Vacina) {
    const modalRef = this.dialogoConf.open(DialogoConfirmacaoComponent, {
      data: {
        tituloModal: 'Exclusão de Vacina',
        pergunta: `Confirma a exclusão da vacina "'${vacina.tx_nome}'"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result == this.ROTULO_BOTAO_ACEITAR && vacina._id) {
        this.excluirVacina(vacina._id);
      }
    });
  }

  public salvar() {
    switch (this.modoFormulario) {
      case ModoFormulario.INCLUSAO:
        this.incluirVacina();
        break;
      case ModoFormulario.ALTERACAO:
        this.alterarVacina();
        break;
      case ModoFormulario.EXCLUSAO:
        this.confirmarExclusaoVacina(this.vacina);
        break;
      default:
        throw new Error('Modo do formulário não definido');
    }
  }

  fechar() {
    this.router.navigate(['/listar-vacina']);
  }
}
