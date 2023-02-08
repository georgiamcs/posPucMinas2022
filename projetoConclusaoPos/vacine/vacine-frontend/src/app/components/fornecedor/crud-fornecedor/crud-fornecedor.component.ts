import { Component, OnInit } from '@angular/core';

import { Fornecedor } from './../../../shared/models/fornecedor.model';
import { CrudComponent } from '../../../shared/components/crud/crud.component';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { validadoresRequeridoSemEspacos } from 'src/app/shared/utils/util';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { DialogoConfirmacaoComponent } from '../../../shared/components/dialogo-confirmacao/dialogo-confirmacao.component';

@Component({
  selector: 'vacine-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.scss'],
})
export class CrudFornecedorComponent
  extends CrudComponent<Fornecedor>
  implements OnInit
{
  private definirIdentificadoresEntidade() {
    this.nomeEntidade   = 'fornecedor';
    this.pluralEntidade = 'fornecedores';
    this.artigoEntidade = 'o';
  }

  constructor(
    private service: FornecedorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public  dialogoConf: MatDialog
  ) {
    super();
    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud(this.router, this.activatedRoute);
  }

  private preencherFormulario(registro: Fornecedor): void {
    this.preencherFormComRegistroId(registro);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: [null],
      cnpj: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(14),
          Validators.maxLength(14),
        ]),
      ],
      nome: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      email: [null, validadoresRequeridoSemEspacos()],
      endereco: this.formBuilder.group({
        logradouro: [null, validadoresRequeridoSemEspacos()],
        numero: [null, validadoresRequeridoSemEspacos()],
        complemento: [null],
        cep: [null, validadoresRequeridoSemEspacos()],
      }),
      telefone_fixo: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      telefone_celular: [
        null,
        Validators.compose([
          validadoresRequeridoSemEspacos(),
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
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
  }

  private incluirRegistro() {
    const msgFeedback = this.getMsgFeedBackIncluidoSucesso(this.nomeCampoFormIdentificaEntidade);
    this.service
      .incluir(this.form.value)
      .subscribe(() => this.carregarRegistros(msgFeedback));
  }

  private alterarRegistro() {
    const msgFeedback = this.getMsgFeedBackAlteradoSucesso(this.nomeCampoFormIdentificaEntidade);
    this.service
      .alterar(this.form.value)
      .subscribe(() => this.carregarRegistros(msgFeedback));
  }

  private excluirRegistro(id: string) {
    const msgFeedback = this.getMsgFeedBackExcluidoSucesso(this.nomeCampoFormIdentificaEntidade);
    this.service.excluir(id).subscribe(() => {
      this.carregarRegistros(msgFeedback);
    });
  }

  private carregarRegistros(msgFeedback: MensagemFeedback) {
    this.carregarListaRegistros(
      this.router,
      this.getCaminhoRelativoListaRegistros(),
      msgFeedback
    );
  }

  private confirmarExclusaoRegistro(registro: Fornecedor) {
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
    this.executarAcaoFechar(this.router, this.getCaminhoRelativoListaRegistros());
  }
}
