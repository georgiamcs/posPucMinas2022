import { Component, OnInit } from '@angular/core';

import { Fornecedor } from './../../../shared/models/fornecedor.model';
import { CrudComponent } from '../../lib/crud/crud.component';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { validadoresRequeridoSemEspacos } from 'src/app/shared/utils/util';
import { ModoFormulario } from 'src/app/shared/enums/modo-formulario.enum';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { DialogoConfirmacaoComponent } from '../../lib/dialogo-confirmacao/dialogo-confirmacao.component';

@Component({
  selector: 'vacine-crud-fornecedor',
  templateUrl: './crud-fornecedor.component.html',
  styleUrls: ['./crud-fornecedor.component.scss']
})
export class CrudFornecedorComponent extends CrudComponent<Fornecedor>
  implements OnInit
{
  private CAMINHO_RELAT_LISTA_REGISTROS = '/listar-fornecedores';

  constructor(
    private service: FornecedorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public  dialogoConf: MatDialog
  ) {
    super();
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
        numero: [ null, validadoresRequeridoSemEspacos()],
        complemento: [null],
        cep: [ null, validadoresRequeridoSemEspacos()],
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

  tel_celular?: string;
  tel_fixo?: string;

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
    const msgFeedback: MensagemFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `Fornecedor "${this.recuperarValorCampoForm(
        'nome'
      )}" foi incluído com sucesso!`
    );

    this.service
      .incluir(this.form.value)
      .subscribe(() => this.carregarRegistros(msgFeedback));
  }

  private alterarRegistro() {
    const msgFeedback: MensagemFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `Fornecedor "${this.recuperarValorCampoForm(
        'nome'
      )}" foi alterado com sucesso!`
    );

    this.service
      .alterar(this.form.value)
      .subscribe(() => this.carregarRegistros(msgFeedback));
  }

  private excluirRegistro(id: string) {
    const msgFeedback: MensagemFeedback = new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `Fornecedor "${this.recuperarValorCampoForm(
        'tx_nome'
      )}" foi excluído com sucesso!`
    );

    this.service.excluir(id).subscribe(() => {
      this.carregarRegistros(msgFeedback);
    });
  }

  private carregarRegistros(msgFeedback: MensagemFeedback) {
    this.carregarListaRegistros(
      this.router,
      this.CAMINHO_RELAT_LISTA_REGISTROS,
      msgFeedback
    );
  }

  private confirmarExclusaoRegistro(registro: Fornecedor) {
    const modalRef = this.dialogoConf.open(DialogoConfirmacaoComponent, {
      data: {
        tituloModal: 'Exclusão de Vacina',
        pergunta: `Confirma a exclusão da vacina "'${registro.nome}'"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    });

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
    this.executarAcaoFechar(this.router, this.CAMINHO_RELAT_LISTA_REGISTROS);
  }
}
