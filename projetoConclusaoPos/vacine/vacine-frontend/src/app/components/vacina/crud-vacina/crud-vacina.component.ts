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
import {
  definirModoFormulario,
  definirLabelBotaoAcaoModoFormulario,
  definirLabelBotaoFecharModoFormulario,
  ModoFormulario,
} from 'src/app/shared/enums/modo-formulario-enum';
import {
  mapearDominio,
  DominioCodigoRotulo,
} from 'src/app/shared/models/dominio-codigo-rotulo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent implements OnInit {
  form: FormGroup;
  modoFormulario: ModoFormulario = ModoFormulario.INCLUSAO;
  lbBotaoSalvar: string | null;
  lbBotaoFechar: string | null;

  // vacina: Vacina;
  idVacina: string | null;

  tiposIdadeRecomendada: DominioCodigoRotulo[];

  private ROTULO_BOTAO_ACEITAR = 'Sim';
  private ROTULO_BOTAO_REJEITAR = 'Não';

  constructor(
    private vacinaService: VacinaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialogoConf: MatDialog
  ) {
    //this.vacina = new Vacina();
    this.tiposIdadeRecomendada = mapearDominio(DominioIdadeRecomendada);
    this.idVacina = this.activatedRoute.snapshot.paramMap.get('id');
    this.modoFormulario = definirModoFormulario(this.idVacina, this.router.url);
    this.lbBotaoSalvar = definirLabelBotaoAcaoModoFormulario(
      this.modoFormulario
    );
    this.lbBotaoFechar = definirLabelBotaoFecharModoFormulario(
      this.modoFormulario
    );
  }

  private preencherFormulario(vacina: Vacina): void {
    this.form.patchValue(vacina);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: [null],
      tx_nome: [null],
      tx_protecao_contra: [null],
      tx_composicao: [null],
      in_idade_recomendada: [true],
      tp_idade_recomendada: ['A'],
      nr_idade_recomendada: [null],
    });
    if (this.modoFormulario != ModoFormulario.INCLUSAO) {
      if (this.idVacina) {
        this.vacinaService
          .procurarPorId(this.idVacina)
          .subscribe((vacinaBusca) => this.preencherFormulario(vacinaBusca));
      }
    }
    this.somenteLeitura() ? this.form.disable() : this.form.enable();
  }

  private incluirVacina() {
    this.vacinaService
      .incluir(this.form.value)
      .subscribe(() => this.carregarVacinas());
  }

  private alterarVacina() {
    this.vacinaService
      .alterar(this.form.value)
      .subscribe(() => this.carregarVacinas());
  }

  private excluirVacina(idVacina: string) {
    this.vacinaService.excluir(idVacina).subscribe(() => {
      this.carregarVacinas();
    });
  }

  somenteLeitura(): boolean {
    return (
      this.modoFormulario == ModoFormulario.CONSULTA ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
    );
  }

  temBotaoAcao(): boolean {
    return (this.modoFormulario != ModoFormulario.CONSULTA);
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
    console.log('this.form.value', this.form.value);
    switch (this.modoFormulario) {
      case ModoFormulario.INCLUSAO:
        this.incluirVacina();
        break;
      case ModoFormulario.ALTERACAO:
        this.alterarVacina();
        break;
      case ModoFormulario.EXCLUSAO:
        this.confirmarExclusaoVacina(this.form.value);
        break;
      default:
        throw new Error('Modo do formulário não definido');
    }
  }

  fechar() {
    this.router.navigate(['/listar-vacina']);
  }
}
