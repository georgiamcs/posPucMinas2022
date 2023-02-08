import { MensagemFeedback } from '../../classes/mensagem-feedback.class';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  definirLabelBotaoAcaoModoFormulario,
  definirLabelBotaoFecharModoFormulario,
  definirModoFormulario,
  ModoFormulario,
} from 'src/app/shared/enums/modo-formulario.enum';
import { CrudModel } from 'src/app/shared/models/crud.model';
import {
  converterUndefinedEmNulo,
  converterUndefinedNuloEmFalse,
} from 'src/app/shared/utils/util';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';

@Component({
  selector: 'vacine-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent<T extends CrudModel> {
  protected ROTULO_BOTAO_ACEITAR = 'Sim';
  protected ROTULO_BOTAO_REJEITAR = 'Não';

  protected form: FormGroup;
  protected modoFormulario: ModoFormulario = ModoFormulario.INCLUSAO;
  protected lbBotaoSalvar: string | null;
  protected lbBotaoFechar: string | null;

  protected id: string | null;
  protected registro: T;

  private _nomeEntidade: string;
  private _pluralEntidade: string;
  private _artigoEntidade: string;
  private _nomeCampoFormIdentificaEntidade: string;

  constructor() {}

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

  protected preencherAtributosGenericosCrud(
    router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.modoFormulario = definirModoFormulario(this.id, router.url);
    this.lbBotaoSalvar = definirLabelBotaoAcaoModoFormulario(
      this.modoFormulario
    );
    this.lbBotaoFechar = definirLabelBotaoFecharModoFormulario(
      this.modoFormulario
    );
  }

  protected preencherFormComRegistroId(registro: T): void {
    this.form.patchValue(registro);
  }

  protected somenteLeitura(): boolean {
    return (
      this.modoFormulario == ModoFormulario.CONSULTA ||
      this.modoFormulario == ModoFormulario.EXCLUSAO
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
    formControl?.updateValueAndValidity();
  }

  protected carregarListaRegistros(
    router: Router,
    caminhoRelativo: string,
    msgFeedback: MensagemFeedback
  ) {
    const state = {
      state: {
        alerta: {
          tipo: msgFeedback.tipo,
          texto: msgFeedback.texto,
        },
      },
    };
    router.navigate([caminhoRelativo], state);
  }

  protected executarAcaoFechar(router: Router, caminhoRelativo: string) {
    router.navigate([caminhoRelativo]);
  }

  protected campoFormFoiEditado(formControlName: string): boolean {
    return converterUndefinedNuloEmFalse(
      this.form.get(formControlName)?.touched
    );
  }

  protected recuperarValorCampoForm(formControlName: string): any {
    return this.form.get(formControlName)?.value;
  }

  protected recuperarErroCampoForm(
    formControlName: string,
    nomeErroValidador?: string
  ): ValidationErrors | null {
    if (nomeErroValidador) {
      return converterUndefinedEmNulo(
        this.form.get(formControlName)?.errors?.[nomeErroValidador]
      );
    } else
      return converterUndefinedEmNulo(this.form.get(formControlName)?.errors);
  }

  protected habilitarBotaoAcao(): boolean {
    return this.form.valid || this.modoFormulario == ModoFormulario.EXCLUSAO;
  }

  protected getCaminhoRelativoListaRegistros(): string {
    return `/listar-${this.pluralEntidade}`;
  }

  protected getMsgFeedBackIncluidoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.recuperarValorCampoForm(nomeCampoForm)}"
                  foi incluíd${this.artigoEntidade} com sucesso!`
    );
  }

  protected getMsgFeedBackAlteradoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.recuperarValorCampoForm(nomeCampoForm)}"
                  foi alterad${this.artigoEntidade} com sucesso!`
    );
  }

  protected getMsgFeedBackExcluidoSucesso(
    nomeCampoForm: string
  ): MensagemFeedback {
    return new MensagemFeedback(
      TipoMensagemFeedback.SUCESSO,
      `${this.nomeEntidade[0].toUpperCase() + this.nomeEntidade.substring(1)}
                  "${this.recuperarValorCampoForm(nomeCampoForm)}"
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
                   "${this.recuperarValorCampoForm(nomeCampoForm)}"?`,
        rotuloAceitar: this.ROTULO_BOTAO_ACEITAR,
        rotuloRejeitar: this.ROTULO_BOTAO_REJEITAR,
      },
    };
  }
}

