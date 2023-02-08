//TODO: Verificar css qnd nao escolhe idade e tipo idade pq esta quebrando
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TipoMensagemFeedback } from './../../../shared/enums/tipo-mensagem-feedback.enum';
import { MensagemFeedback } from '../../../shared/classes/mensagem-feedback';
import { CrudComponent } from './../../lib/crud/crud.component';
import { VacinaService } from './../../../services/vacina/vacina.service';
import { DialogoConfirmacaoComponent } from './../../lib/dialogo-confirmacao/dialogo-confirmacao.component';
import { Vacina } from '../../../shared/models/vacina.model';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';

@Component({
  selector: 'app-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent
  extends CrudComponent<Vacina>
  implements OnInit
{
  private CAMINHO_RELAT_LISTA_REGISTROS = '/listar-vacinas';

  constructor(
    private vacinaService: VacinaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialogoConf: MatDialog
  ) {
    super();
    this.preencherAtributosGenericosCrud(this.router, this.activatedRoute);
  }

  private preencherFormulario(vacina: Vacina): void {
    this.preencherFormComRegistroId(vacina);
    this.verificarIdadeRecomendada();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      tx_nome: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      tx_protecao_contra: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      tx_composicao: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      in_idade_recomendada: [true, [Validators.required]],
      tp_idade_recomendada: [null],
      nr_idade_recomendada: [null],
    });
  }

  private carregarDadosId() {
    if (this.modoFormulario != ModoFormulario.INCLUSAO) {
      if (this.id) {
        this.vacinaService
          .procurarPorId(this.id)
          .subscribe((vacinaBusca) => this.preencherFormulario(vacinaBusca));
      }
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.carregarDadosId();
    this.somenteLeitura() ? this.form.disable() : this.form.enable();
    this.verificarIdadeRecomendada();
  }

  private incluirVacina() {
    const msgFeedback: MensagemFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `Vacina "${this.recuperarValorCampoForm(
        'tx_nome'
      )}" foi incluída com sucesso!`
    );

    this.vacinaService
      .incluir(this.form.value)
      .subscribe(() => this.carregarVacinas(msgFeedback));
  }

  private alterarVacina() {
    const msgFeedback: MensagemFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `Vacina "${this.recuperarValorCampoForm(
        'tx_nome'
      )}" foi alterada com sucesso!`
    );

    this.vacinaService
      .alterar(this.form.value)
      .subscribe(() => this.carregarVacinas(msgFeedback));
  }

  private excluirVacina(idVacina: string) {
    const msgFeedback: MensagemFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `Vacina "${this.recuperarValorCampoForm(
        'tx_nome'
      )}" foi excluída com sucesso!`
    );

    this.vacinaService.excluir(idVacina).subscribe(() => {
      this.carregarVacinas(msgFeedback);
    });
  }

  public verificarIdadeRecomendada() {
    const temIdadeRecomendada = this.form.get('in_idade_recomendada')?.value;
    const controlTpIdade = this.form.get('tp_idade_recomendada');
    const controlNrIdade = this.form.get('nr_idade_recomendada');

    if (!temIdadeRecomendada || temIdadeRecomendada == undefined) {
      controlTpIdade?.setValue(!temIdadeRecomendada ? null : false);
      controlNrIdade?.setValue(null);
      this.atualizarValidadores(controlTpIdade!, null);
      this.atualizarValidadores(controlNrIdade!, null);
      controlTpIdade?.setValidators(null);
      controlNrIdade?.setValidators(null);
    } else {
      controlTpIdade?.setValidators([Validators.required]);
      controlNrIdade?.setValidators(
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(120),
        ])
      );
    }

    console.log('this.form em verificarIdadeRecomendada', this.form);
  }

  private carregarVacinas(dadosEnviadosParaRota: MensagemFeedback) {
    this.carregarListaRegistros(
      this.router,
      this.CAMINHO_RELAT_LISTA_REGISTROS,
      dadosEnviadosParaRota
    );
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
    if (this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO) {
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
    } else {
      console.log('this.form)', this.form);
      alert('Formulário com preenchimento inválido.');
    }
  }

  public fechar() {
    this.executarAcaoFechar(this.router, this.CAMINHO_RELAT_LISTA_REGISTROS);
  }
}
