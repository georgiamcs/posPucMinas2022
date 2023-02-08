//TODO: Verificar css qnd nao escolhe idade e tipo idade pq esta quebrando
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MensagemFeedback } from '../../../shared/classes/mensagem-feedback';
import { CrudComponent } from './../../lib/crud/crud.component';
import { VacinaService } from './../../../services/vacina/vacina.service';
import { DialogoConfirmacaoComponent } from './../../lib/dialogo-confirmacao/dialogo-confirmacao.component';
import { Vacina } from '../../../shared/models/vacina.model';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { validadoresRequeridoSemEspacos } from 'src/app/shared/utils/util';

@Component({
  selector: 'vacine-crud-vacina',
  templateUrl: './crud-vacina.component.html',
  styleUrls: ['./crud-vacina.component.scss'],
})
export class CrudVacinaComponent
  extends CrudComponent<Vacina>
  implements OnInit
{
  constructor(
    private service: VacinaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public  dialogoConf: MatDialog
  ) {
    super();
    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud(this.router, this.activatedRoute);
  }

  private definirIdentificadoresEntidade() {
    this.nomeEntidade = 'vacina';
    this.pluralEntidade = 'vacinas';
    this.artigoEntidade = 'a';
    this.nomeCampoFormIdentificaEntidade = 'tx_nome';
  }

  private preencherFormulario(registro: Vacina): void {
    this.preencherFormComRegistroId(registro);
    this.verificarIdadeRecomendada();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      tx_nome: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      tx_protecao_contra: [null, validadoresRequeridoSemEspacos()],
      tx_composicao: [null, validadoresRequeridoSemEspacos()],
      in_idade_recomendada: [true, [Validators.required]],
      tp_idade_recomendada: [null],
      nr_idade_recomendada: [null],
    });
  }

  private carregarDadosId() {
    if (this.modoFormulario != ModoFormulario.INCLUSAO) {
      if (this.id) {
        this.service
          .procurarPorId(this.id)
          .subscribe((regBusca) => this.preencherFormulario(regBusca));
      }
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.carregarDadosId();
    this.somenteLeitura() ? this.form.disable() : this.form.enable();
    this.verificarIdadeRecomendada();
  }

  private incluirRegistro() {
    const msgFeedback = this.getMsgFeedBackIncluidoSucesso(
      this.nomeCampoFormIdentificaEntidade
    );
    this.service
      .incluir(this.form.value)
      .subscribe(() => this.carregarRegistros(msgFeedback));
  }

  private alterarRegistro() {
    const msgFeedback = this.getMsgFeedBackIncluidoSucesso(
      this.nomeCampoFormIdentificaEntidade
    );
    this.service
      .alterar(this.form.value)
      .subscribe(() => this.carregarRegistros(msgFeedback));
  }

  private excluirRegistro(id: string) {
    const msgFeedback = this.getMsgFeedBackExcluidoSucesso(
      this.nomeCampoFormIdentificaEntidade
    );
    this.service.excluir(id).subscribe(() => {
      this.carregarRegistros(msgFeedback);
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
  }

  private carregarRegistros(msgFeedback: MensagemFeedback) {
    this.carregarListaRegistros(
      this.router,
      this.getCaminhoRelativoListaRegistros(),
      msgFeedback
    );
  }

  private confirmarExclusaoRegistro(registro: Vacina) {
    const modalRef = this.dialogoConf.open(
      DialogoConfirmacaoComponent,
      this.getDataConfirmaExclusaoModal(this.nomeCampoFormIdentificaEntidade)
    );

    modalRef.afterClosed().subscribe((result) => {
      if (result == this.ROTULO_BOTAO_ACEITAR && registro._id) {
        this.excluirRegistro(registro._id);
      }
    });
  }

  public salvar() {
    if (this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO) {
      switch (this.modoFormulario) {
        case ModoFormulario.INCLUSAO:
          this.incluirRegistro();
          break;
        case ModoFormulario.ALTERACAO:
          this.alterarRegistro();
          break;
        case ModoFormulario.EXCLUSAO:
          this.confirmarExclusaoRegistro(this.form.value);
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
    this.executarAcaoFechar(
      this.router,
      this.getCaminhoRelativoListaRegistros()
    );
  }
}
