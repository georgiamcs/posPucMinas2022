import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';
import { GenericCrudService } from 'src/app/services/generic/generic-crud/generic-crud.service';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import {
  definirLabelBotaoAcaoModoFormulario,
  definirLabelBotaoFecharModoFormulario,
  definirModoFormulario,
  ModoFormulario,
} from 'src/app/shared/enums/modo-formulario.enum';
import { RetornoHttp } from 'src/app/shared/enums/retorno-http.enum';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { UtilRota } from 'src/app/shared/utils/rota.util';
import { MENSAGEM_REGISTRO_DUPLICADO } from 'src/app/variables/constantes';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao/dialogo-confirmacao.component';
import { GenericPageFormComponent } from '../generic-page-form/generic-page-form.component';
import { TipoOrigemRota } from './../../shared/enums/tipo-rota.enum';

@Component({
  selector: 'vacine-generic-crud',
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.scss'],
})
export abstract class GenericCrudComponent<T extends EntityModel>
  extends GenericPageFormComponent
{
  protected readonly ROTULO_BOTAO_ACEITAR = 'Sim';
  protected readonly ROTULO_BOTAO_REJEITAR = 'Não';

  protected modoFormulario: ModoFormulario = ModoFormulario.INCLUSAO;
  protected lbBotaoSalvar: string | null;
  protected lbBotaoFechar: string | null;

  protected id: string | null;
  protected registro: T;

  private _nomeEntidade: string;
  private _pluralEntidade: string;
  private _artigoEntidade: string;
  private _nomeCampoFormIdentificaEntidade: string;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    protected override formBuilder: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    protected dialogoConf: MatDialog,
    protected service: GenericCrudService<T>
  ) {
    super(changeDetectorRef, media, router, serviceAcesso, formBuilder);
    this.definirIdentificadoresEntidade();
    this.preencherAtributosGenericosCrud();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.carregarDadosId();
    this.definirHabilitacaoFormulario();
  }

  protected abstract definirIdentificadoresEntidade(): void;

  protected verificarAcessoModoFormulario() {
    if (
      (this.modoFormulario == ModoFormulario.INCLUSAO &&
        !this.temAcessoAdicionar()) ||
      (this.modoFormulario == ModoFormulario.ALTERACAO &&
        !this.temAcessoAlterar()) ||
      (this.modoFormulario == ModoFormulario.EXCLUSAO &&
        !this.temAcessoExcluir()) ||
      (this.modoFormulario == ModoFormulario.CONSULTA &&
        !this.temAcessoVisualizarTodos())
    ) {
      this.tratarErroAcesso(true);
    }
  }

  protected preencherAtributosGenericosCrud() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.modoFormulario = definirModoFormulario(this.id, this.router.url);
    this.verificarAcessoModoFormulario();
    this.lbBotaoSalvar = definirLabelBotaoAcaoModoFormulario(
      this.modoFormulario
    );
    this.lbBotaoFechar = definirLabelBotaoFecharModoFormulario(
      this.modoFormulario
    );
  }

  protected definirHabilitacaoFormulario() {
    this.somenteLeitura() ? this.form.disable() : this.form.enable();
  }

  protected get nomeEntidade(): string {
    return this._nomeEntidade;
  }

  protected set nomeEntidade(v: string) {
    this._nomeEntidade = v;
  }

  protected get pluralEntidade(): string {
    return this._pluralEntidade;
  }

  protected set pluralEntidade(v: string) {
    this._pluralEntidade = v;
  }

  protected get artigoEntidade(): string {
    return this._artigoEntidade;
  }

  protected set artigoEntidade(v: string) {
    this._artigoEntidade = v;
  }

  public get nomeCampoFormIdentificaEntidade(): string {
    return this._nomeCampoFormIdentificaEntidade;
  }
  public set nomeCampoFormIdentificaEntidade(v: string) {
    this._nomeCampoFormIdentificaEntidade = v;
  }

  protected carregarDadosId() {
    if (this.modoFormulario != ModoFormulario.INCLUSAO) {
      if (this.id) {
        this.subscriptions.push(
          this.service.getById(this.id).subscribe({
            next: (regBusca) => this.preencherFormComRegistroId(regBusca),
            error: (erro) =>
              this.tratarErro(`Erro ao carregar dados => ${erro.message}`),
          })
        );
      }
    }
  }

  protected carregarRegistros(msgFeedback: MensagemFeedback) {
    this.irParaListaRegistros(
      this.getCaminhoRelativoListaRegistros(),
      msgFeedback
    );
  }

  protected getRegistroForm() {
    return this.form.value;
  }

  protected incluirRegistro() {
    const novoRegistro = this.getRegistroForm();

    this.subscriptions.push(
      this.service.add(novoRegistro).subscribe({
        next: () => {
          const msgFeedbackSucesso = this.getMsgFeedBackIncluidoSucesso(
            this.nomeCampoFormIdentificaEntidade
          );
          this.addMensagem(msgFeedbackSucesso);
          this.limparFormulario();
        },
        error: (erro) => {
          let msgErro: string;

          if (erro.status === RetornoHttp.HTTP_CONFLIT) {
            msgErro = `Operação não pode ser realizada. ${MENSAGEM_REGISTRO_DUPLICADO}`;
          } else {
            const textoErro = !!erro.error?.error
              ? erro.error.error
              : erro.message;
            msgErro = `Erro ao incluir registro => ${textoErro}`;
          }
          const msgFeedbackErro = new MensagemFeedback(
            TipoMensagemFeedback.ERRO,
            msgErro
          );
          this.addMensagem(msgFeedbackErro);
        },
      })
    );
  }

  protected registrar() {
    throwError(() => 'Função de registrar() não implementada.');
  }

  protected alterarRegistro() {
    const regAlterado = this.getRegistroForm();

    this.subscriptions.push(
      this.service.update(regAlterado).subscribe({
        next: () => {
          const msgFeedback = this.getMsgFeedBackAlteradoSucesso(
            this.nomeCampoFormIdentificaEntidade
          );
          this.carregarRegistros(msgFeedback);
        },
        error: (erro) => {
          let msgErro: string;

          if (erro.status === RetornoHttp.HTTP_CONFLIT) {
            msgErro = `Operação não pode ser realizada. ${MENSAGEM_REGISTRO_DUPLICADO}`;
          } else {
            const textoErro = !!erro.error?.error
              ? erro.error.error
              : erro.message;
            msgErro = `Erro ao alterar registro => ${textoErro}`;
          }
          const msgFeedbackErro = new MensagemFeedback(
            TipoMensagemFeedback.ERRO,
            msgErro
          );
          this.addMensagem(msgFeedbackErro);
        },
      })
    );
  }

  protected excluirRegistro(id: string) {
    this.subscriptions.push(
      this.service.delete(id).subscribe({
        next: () => {
          const msgFeedback = this.getMsgFeedBackExcluidoSucesso(
            this.nomeCampoFormIdentificaEntidade
          );
          this.carregarRegistros(msgFeedback);
        },
        error: (erro) => {
          const textoErro = !!erro.error?.error
            ? erro.error.error
            : erro.message;
          const msgErro = `Erro ao excluir registro => ${textoErro}`;
          const msgFeedbackErro = new MensagemFeedback(
            TipoMensagemFeedback.ERRO,
            msgErro
          );
          this.addMensagem(msgFeedbackErro);
        },
      })
    );
  }

  protected confirmarExclusaoRegistro(registro: EntityModel) {
    const modalRef = this.dialogoConf.open(
      DialogoConfirmacaoComponent,
      this.getDataConfirmaExclusaoModal(this.nomeCampoFormIdentificaEntidade)
    );

    this.subscriptions.push(
      modalRef.afterClosed().subscribe({
        next: (result) => {
          if (result == this.ROTULO_BOTAO_ACEITAR && registro._id) {
            this.excluirRegistro(registro._id);
          }
        },
        error: (erro) =>
          this.tratarErro(
            `Erro ao fechar janela de confirmação de exclusão => ${erro}`
          ),
      })
    );
  }

  protected salvar() {
    this.form.updateValueAndValidity();
    this.form.markAsTouched();

    if (this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO) {
      switch (this.modoFormulario) {
        case ModoFormulario.INCLUSAO:
          this.mensagens = [];
          this.incluirRegistro();
          break;
        case ModoFormulario.REGISTRAR:
          this.registrar();
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
      console.error('this.form)', this.form);
      this.addMensagem(
        new MensagemFeedback(
          TipoMensagemFeedback.ERRO,
          'Formulário com preenchimento inválido.'
        )
      );
    }
  }

  protected fechar() {
    this.dialogoConf.closeAll();
    if (this.modoFormulario == ModoFormulario.REGISTRAR) {
      this.irParaPagina('/login');
    } else if (this.origemRotaNavegacao == TipoOrigemRota.LISTAGEM) {
      this.irParaPagina(this.getCaminhoRelativoListaRegistros());
    } else this.irParaPagina('/home');
  }

  protected preencherFormComRegistroId(registro: any): void {
    this.registro = registro;
    this.form.patchValue(registro);
  }

  protected somenteLeitura(): boolean {
    return (
      this.modoFormulario == ModoFormulario.CONSULTA ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
    );
  }

  protected override exibeHint(
    form: FormGroup,
    nomeFormControl: string
  ): boolean {
    const vlCampo = this.getValorCampoForm(form, nomeFormControl);
    return (
      !this.somenteLeitura() &&
      (vlCampo == null || vlCampo == undefined || vlCampo == '')
    );
  }

  protected temBotaoAcao(): boolean {
    return this.modoFormulario != ModoFormulario.CONSULTA;
  }

  protected atualizarValidadores(
    formControl: AbstractControl,
    validators: ValidatorFn | ValidatorFn[] | null
  ): void {
    formControl?.setValidators(validators);
    // codigo comentado porque estava dando erro recursivo qnd atualiza validadores no onchange
    // remover apos testes mais exaustivos
    // formControl?.updateValueAndValidity();
  }

  protected irParaListaRegistros(
    caminhoRelativo: string,
    msgFeedback: MensagemFeedback
  ) {
    const state = UtilRota.gerarStateMsgFeedbackRota(msgFeedback);
    this.irParaPagina(caminhoRelativo, state);
  }

  protected setValorCampoForm(formControlName: string, valor: any): any {
    return this.form.get(formControlName)?.setValue(valor);
  }

  protected habilitarBotaoAcao(): boolean {
    return this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO;
  }

  protected habilitarBotaoAcaoForm(form: FormGroup): boolean {
    return form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO;
  }

  protected getCaminhoRelativoListaRegistros(): string {
    return `${this.pluralEntidade}`;
  }

  protected getMsgFeedBackIncluidoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.getValorCampoForm(this.form, nomeCampoForm)}"
                  foi incluíd${this.artigoEntidade} com sucesso!`
    );
  }

  protected getMsgFeedBackAlteradoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.getValorCampoForm(this.form, nomeCampoForm)}"
                  foi alterad${this.artigoEntidade} com sucesso!`
    );
  }

  protected getMsgFeedBackExcluidoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.getValorCampoForm(this.form, nomeCampoForm)}"
                  foi excluíd${this.artigoEntidade} com sucesso!`
    );
  }

  protected getDataConfirmaExclusaoModal(nomeCampoForm: string): any {
    return {
      data: {
        tituloModal: `Exclusão de ${
          this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)
        }`,
        pergunta: `Confirma a exclusão d${this.artigoEntidade} ${
          this.nomeEntidade
        }
                   "${this.getValorCampoForm(this.form, nomeCampoForm)}"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    };
  }

  protected limparFormulario() {
    this.form.reset();
  }
}
