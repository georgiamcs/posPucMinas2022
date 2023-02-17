//TODO: implementar de forma que nao volte a tela de listagem e permaneca na tela na inclusao, tendo as mensagens de sucesso no proprio formulario
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import {
  definirLabelBotaoAcaoModoFormulario,
  definirLabelBotaoFecharModoFormulario,
  definirModoFormulario,
  ModoFormulario
} from 'src/app/shared/enums/modo-formulario.enum';
import { TipoErroValidacaoFormulario } from 'src/app/shared/enums/tipo-erro-validacao-formulario.enum';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { EntityModel } from 'src/app/shared/models/entity.model';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { Util } from 'src/app/shared/utils/util.util';
import { DialogoConfirmacaoComponent } from '../dialogo-confirmacao/dialogo-confirmacao.component';
import { GenericPageComponent } from '../generic-page/generic-page.component';

@Component({
  selector: 'vacine-generic-crud',
  templateUrl: './generic-crud.component.html',
  styleUrls: ['./generic-crud.component.scss'],
})
export class GenericCrudComponent<
  T extends EntityModel
> extends GenericPageComponent {
  protected readonly ROTULO_BOTAO_ACEITAR = 'Sim';
  protected readonly ROTULO_BOTAO_REJEITAR = 'Não';

  protected form: FormGroup;
  protected modoFormulario: ModoFormulario = ModoFormulario.INCLUSAO;
  protected lbBotaoSalvar: string | null;
  protected lbBotaoFechar: string | null;
  TipoErroValForm = TipoErroValidacaoFormulario;

  protected id: string | null;
  protected registro: T;

  protected service: CrudService<T>;
  protected formBuilder: FormBuilder;
  protected activatedRoute: ActivatedRoute;
  protected dialogoConf: MatDialog;

  private _nomeEntidade: string;
  private _pluralEntidade: string;
  private _artigoEntidade: string;
  private _nomeCampoFormIdentificaEntidade: string;

  constructor() {
    super();
  }

  protected buildForm() {}

  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
    this.carregarDadosId();
    this.definirHabilitacaoFormulario();
  }

  private definirHabilitacaoFormulario() {
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
        this.subscription = this.service.procurarPorId(this.id).subscribe({
          next: (regBusca) => this.preencherFormComRegistroId(regBusca),
          error: (erro) => this.tratarErro(`Erro ao carregar dados => ${erro}`),
        });
      }
    }
  }

  protected carregarRegistros(msgFeedback: MensagemFeedback) {
    this.carregarListaRegistros(
      this.getCaminhoRelativoListaRegistros(),
      msgFeedback
    );
  }

  protected incluirRegistro() {
    const msgFeedback = this.getMsgFeedBackIncluidoSucesso(
      this.nomeCampoFormIdentificaEntidade
    );
    this.subscription = this.service.incluir(this.form.value).subscribe({
      next: () => this.carregarRegistros(msgFeedback),
      error: (erro) => this.tratarErro(`Erro ao incluir registro => ${erro}`),
    });
  }

  protected registrar() {
    throwError(() => 'Registro não implementado.');
  }

  protected alterarRegistro() {
    const msgFeedback = this.getMsgFeedBackAlteradoSucesso(
      this.nomeCampoFormIdentificaEntidade
    );
    this.subscription = this.service.alterar(this.form.value).subscribe({
      next: () => this.carregarRegistros(msgFeedback),
      error: (erro) => this.tratarErro(`Erro ao alterar registro => ${erro}`),
    });
  }

  protected excluirRegistro(id: string) {
    const msgFeedback = this.getMsgFeedBackExcluidoSucesso(
      this.nomeCampoFormIdentificaEntidade
    );
    this.subscription = this.service.excluir(id).subscribe({
      next: () => this.carregarRegistros(msgFeedback),
      error: (erro) => this.tratarErro(`Erro ao excluir registro => ${erro}`),
    });
  }

  protected confirmarExclusaoRegistro(registro: EntityModel) {
    const modalRef = this.dialogoConf.open(
      DialogoConfirmacaoComponent,
      this.getDataConfirmaExclusaoModal(this.nomeCampoFormIdentificaEntidade)
    );

    this.subscription = modalRef.afterClosed().subscribe({
      next: (result) => {
        if (result == this.ROTULO_BOTAO_ACEITAR && registro._id) {
          this.excluirRegistro(registro._id);
        }
      },
      error: (erro) =>
        this.tratarErro(
          `Erro ao fechar janela de confirmação de exclusão => ${erro}`
        ),
    });
  }

  protected salvar() {
    this.form.updateValueAndValidity();
    this.form.markAsTouched();

    if (this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO) {
      switch (this.modoFormulario) {
        case ModoFormulario.INCLUSAO:
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
    this.executarAcaoFechar(
      this.router,
      this.getCaminhoRelativoListaRegistros()
    );
  }

  protected preencherAtributosGenericosCrud() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.modoFormulario = definirModoFormulario(this.id, this.router.url);
    this.lbBotaoSalvar = definirLabelBotaoAcaoModoFormulario(
      this.modoFormulario
    );
    this.lbBotaoFechar = definirLabelBotaoFecharModoFormulario(
      this.modoFormulario
    );
  }

  protected preencherFormComRegistroId(registro: any): void {
    this.form.patchValue(registro);
  }

  protected somenteLeitura(): boolean {
    return (
      this.modoFormulario == ModoFormulario.CONSULTA ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
    );
  }

  protected exibeHint(nomeFormControl: string): boolean {
    return !this.somenteLeitura() && !this.getValorCampoForm(nomeFormControl);
  }

  protected temBotaoAcao(): boolean {
    return this.modoFormulario != ModoFormulario.CONSULTA;
  }

  protected atualizarValidadores(
    formControl: AbstractControl,
    validators: ValidatorFn | ValidatorFn[] | null
  ): void {
    formControl?.setValidators(validators);
    formControl?.updateValueAndValidity();
  }

  protected carregarListaRegistros(
    caminhoRelativo: string,
    msgFeedback: MensagemFeedback
  ) {
    const state = Util.gerarStateMsgFeedbackRota(msgFeedback);
    this.router.navigate([caminhoRelativo], state);
  }

  protected executarAcaoFechar(router: Router, caminhoRelativo: string) {
    if (this.modoFormulario == ModoFormulario.REGISTRAR) {
      router.navigate(['/login']);
    } else {
      router.navigate([caminhoRelativo]);
    }
  }

  protected getValorCampoForm(formControlName: string): any {
    const posPonto = formControlName.indexOf('.');

    if (posPonto > -1) {
      // tem campo aninhado
      const nomeCampo1 = formControlName.substring(-1, posPonto);
      const nomeCampo2 = formControlName.substring(posPonto + 1);
      return this.form.get(nomeCampo1)?.get(nomeCampo2)?.value;
    } else {
      return this.form.get(formControlName)?.value;
    }
  }

  protected getFormControl(formControlName: string): any {
    const posPonto = formControlName.indexOf('.');

    if (posPonto > -1) {
      // tem campo aninhado
      const nomeCampo1 = formControlName.substring(-1, posPonto);
      const nomeCampo2 = formControlName.substring(posPonto + 1);
      return this.form.get(nomeCampo1)?.get(nomeCampo2);
    } else {
      return this.form.get(formControlName);
    }
  }

  protected setValorCampoForm(formControlName: string, valor: any): any {
    return this.form.get(formControlName)?.setValue(valor);
  }

  protected habilitarBotaoAcao(): boolean {
    return this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO;
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
                  "${this.getValorCampoForm(nomeCampoForm)}"
                  foi incluíd${this.artigoEntidade} com sucesso!`
    );
  }

  protected getMsgFeedBackAlteradoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.getValorCampoForm(nomeCampoForm)}"
                  foi alterad${this.artigoEntidade} com sucesso!`
    );
  }

  protected getMsgFeedBackExcluidoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.getValorCampoForm(nomeCampoForm)}"
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
                   "${this.getValorCampoForm(nomeCampoForm)}"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    };
  }

  protected campoFormFoiEditado(formControlName: string): boolean {
    return !!this.form.get(formControlName)?.touched;
  }

  protected recuperarErroCampoForm(
    formControlName: string,
    nomeErroValidador?: string | null
  ): ValidationErrors | null {
    if (!!nomeErroValidador) {
      return Util.converterUndefinedEmNulo(
        this.getFormControl(formControlName)?.errors?.[nomeErroValidador]
      );
    } else
      return Util.converterUndefinedEmNulo(
        this.getFormControl(formControlName)?.errors
      );
  }

  protected hasErroValidacao(
    nomeFormControl: string,
    tipoErroValidacao: TipoErroValidacaoFormulario,
    validacaoDefinidaUsuario?: string
  ): boolean {
    let exibe = false;

    if (this.campoFormFoiEditado(nomeFormControl)) {
      switch (tipoErroValidacao) {
        case TipoErroValidacaoFormulario.OBRIGATORIO:
          exibe =
            this.recuperarErroCampoForm(nomeFormControl, 'required') != null ||
            this.recuperarErroCampoForm(nomeFormControl, 'pattern') != null;
          break;

        case TipoErroValidacaoFormulario.REQUERIDO:
          exibe =
            this.recuperarErroCampoForm(nomeFormControl, 'required') != null;
          break;

        case TipoErroValidacaoFormulario.FORMATO:
          exibe =
            this.recuperarErroCampoForm(nomeFormControl, 'minlength') != null ||
            this.recuperarErroCampoForm(nomeFormControl, 'maxlength') != null ||
            this.recuperarErroCampoForm(nomeFormControl, 'pattern') != null ||
            this.recuperarErroCampoForm(nomeFormControl, 'mask') != null;
          break;

        case TipoErroValidacaoFormulario.LIMITE:
          exibe =
            this.recuperarErroCampoForm(nomeFormControl, 'min') != null ||
            this.recuperarErroCampoForm(nomeFormControl, 'max') != null;
          break;

        case TipoErroValidacaoFormulario.EMAIL:
          exibe = this.recuperarErroCampoForm(nomeFormControl, 'email') != null;
          break;

        case TipoErroValidacaoFormulario.QUALQUER:
          exibe = this.recuperarErroCampoForm(nomeFormControl, null) != null;
          break;

        default: //QUALQUER e DEFINIDA_USUARIO
          exibe =
            this.recuperarErroCampoForm(
              nomeFormControl,
              validacaoDefinidaUsuario
            ) != null;
          break;
      }
    }
    return exibe;
  }

  protected getMsgErroValidacaoTipo(tipo: TipoErroValidacaoFormulario): string {
    switch (tipo) {
      case TipoErroValidacaoFormulario.OBRIGATORIO:
        return 'Campo obrigatório';
      case TipoErroValidacaoFormulario.REQUERIDO:
        return 'Campo obrigatório';
      case TipoErroValidacaoFormulario.FORMATO:
        return 'Formato inválido';
      case TipoErroValidacaoFormulario.LIMITE:
        return 'Valor fora do lmite de valores do campo';
      case TipoErroValidacaoFormulario.QUALQUER:
        return 'Preenchimento inválido';
      case TipoErroValidacaoFormulario.EMAIL:
        return 'Email inválido';
      default:
        return '';
    }
  }
}
