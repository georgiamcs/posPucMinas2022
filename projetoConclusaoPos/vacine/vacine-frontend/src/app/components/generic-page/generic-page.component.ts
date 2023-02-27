import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoErroValidacaoFormulario } from 'src/app/shared/enums/tipo-erro-validacao-formulario.enum';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { Util } from 'src/app/shared/utils/util.util';
import { browserRefresh } from '../../app.component';
import { UtilRota } from './../../shared/utils/rota.util';

@Component({
  selector: 'vacine-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent implements OnInit, OnDestroy {
  protected subscription: Subscription;
  protected mensagens: MensagemFeedback[] = [];

  private mobileResolutionQuery: MediaQueryList;
  private tabletLowResolutionQuery: MediaQueryList;
  private tabletHighResolutionQuery: MediaQueryList;
  private desktopResolutionQuery: MediaQueryList;

  private _mediaQueryListener: () => void;

  protected origemRotaNavegacao: string;

  TipoErroValForm = TipoErroValidacaoFormulario;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected media: MediaMatcher,
    protected router: Router
  ) {
    this.mensagens = [];
    this.carregarStateAoIniciar();

    this.setWidthDeviceDetector();
  }

  private setWidthDeviceDetector() {
    this.mobileResolutionQuery = this.media.matchMedia('(max-width: 480px)'); //mobile
    this.tabletLowResolutionQuery = this.media.matchMedia(
      '(min-width: 481px) and (max-width: 767px)'
    ); //tablet
    this.tabletHighResolutionQuery = this.media.matchMedia(
      '(min-width: 768px) and (max-width: 1024px)'
    ); //tablet
    this.desktopResolutionQuery = this.media.matchMedia('(min-width: 1025px)'); //desktop
    this._mediaQueryListener = () => this.changeDetectorRef.detectChanges();

    this.mobileResolutionQuery.addListener(this._mediaQueryListener);
    this.tabletLowResolutionQuery.addListener(this._mediaQueryListener);
    this.tabletHighResolutionQuery.addListener(this._mediaQueryListener);
    this.desktopResolutionQuery.addListener(this._mediaQueryListener);
  }

  ngOnInit(): void {
    if (browserRefresh) {
      this.mensagens = [];
    }
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.mobileResolutionQuery.removeListener(this._mediaQueryListener);
    this.tabletLowResolutionQuery.removeListener(this._mediaQueryListener);
    this.desktopResolutionQuery.removeListener(this._mediaQueryListener);
  }

  protected isMobileResolution() {
    return this.mobileResolutionQuery.matches;
  }

  protected isTabletLowResolution() {
    return this.tabletLowResolutionQuery.matches;
  }

  protected isTabletHighResolution() {
    return this.tabletHighResolutionQuery.matches;
  }

  protected isDesktopResolution() {
    return this.desktopResolutionQuery.matches;
  }

  protected tratarErro(erro: string, irParaPaginaErro = true) {
    if (!!this.router && irParaPaginaErro) {
      const state = UtilRota.gerarStateMsgFeedbackRota(
        new MensagemFeedback(TipoMensagemFeedback.ERRO, erro)
      );

      this.router.navigate(['/erro'], state);
    } else {
      const msg = new MensagemFeedback(TipoMensagemFeedback.ERRO, erro);
      this.addMensagem(msg);
    }
  }

  protected carregarStateAoIniciar() {
    let msg = this.getStateRota(UtilRota.NOME_STATE_ROTA_MSG_FEEDBACK);
    if (!!msg) {
      this.addMensagem(msg);
    }

    this.origemRotaNavegacao = this.getStateRota(
      UtilRota.NOME_STATE_ROTA_ORIGEM_NAV
    );
  }

  protected addMensagem(msg: MensagemFeedback) {
    this.mensagens.push(msg);
  }

  protected deleteAllMensagem() {
    this.mensagens = [];
  }

  protected getStateRota(nomeState: string) {
    let state;
    if (!!this.router) {
      state = this.router.getCurrentNavigation()?.extras.state?.[nomeState];
    }
    return state;
  }

  protected formatarValorDecimal(v: number): string {
    if (!!v) {
      return Util.formatarValorDecimal(v);
    } else {
      return '';
    }
  }

  protected getValorCampoForm(form: FormGroup, formControlName: string): any {
    return this.getFormControl(form, formControlName)?.value;
  }

  protected getFormControl(form: FormGroup, formControlName: string): any {
    let nomesCampos = formControlName.split('.');

    switch (nomesCampos.length) {
      case 1:
        return form!.get(formControlName);

      case 2:
        return form!.get(nomesCampos[0])?.get(nomesCampos[1]);

      case 3:
        return form!
          .get(nomesCampos[0])
          ?.get(nomesCampos[1])
          ?.get(nomesCampos[2]);

      case 4:
        return form!
          .get(nomesCampos[0])
          ?.get(nomesCampos[1])
          ?.get(nomesCampos[2])
          ?.get(nomesCampos[3]);

      default:
        throwError(
          () =>
            'Condição não esperada. Control com aninhamento maior do que 4 níveis'
        );
    }
  }

  protected exibeHint(form: FormGroup, nomeFormControl: string): boolean {
    const vlCampo = this.getValorCampoForm(form, nomeFormControl);
    return vlCampo == null || vlCampo == undefined || vlCampo == '';
  }

  protected campoFormFoiEditado(
    form: FormGroup,
    formControlName: string,
  ): boolean {
    return !!this.getFormControl(form, formControlName)?.touched;
  }

  protected recuperarErroCampoForm(
    form: FormGroup,
    formControlName: string,
    nomeErroValidador?: string | null,
  ): ValidationErrors | null {
    if (!!nomeErroValidador) {
      return Util.converterUndefinedEmNulo(
        this.getFormControl(form, formControlName)?.errors?.[nomeErroValidador]
      );
    } else
      return Util.converterUndefinedEmNulo(
        this.getFormControl(form, formControlName)?.errors
      );
  }

  protected hasErroValidacao(
    form: FormGroup,
    nomeFormControl: string,
    tipoErroValidacao: TipoErroValidacaoFormulario,
    validacaoDefinidaUsuario?: string,

  ): boolean {
    let exibe = false;

    if (this.campoFormFoiEditado(form, nomeFormControl)) {
      switch (tipoErroValidacao) {
        case TipoErroValidacaoFormulario.OBRIGATORIO:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, 'required') !=
              null ||
            this.recuperarErroCampoForm(form, nomeFormControl, 'pattern') !=
              null;
          break;

        case TipoErroValidacaoFormulario.REQUERIDO:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, 'required') !=
            null;
          break;

        case TipoErroValidacaoFormulario.FORMATO:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, 'minlength') !=
              null ||
            this.recuperarErroCampoForm(form, nomeFormControl, 'maxlength') !=
              null ||
            this.recuperarErroCampoForm(form, nomeFormControl, 'pattern') !=
              null ||
            this.recuperarErroCampoForm(form, nomeFormControl, 'mask') != null;
          break;

        case TipoErroValidacaoFormulario.LIMITE:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, 'min') !=
              null ||
            this.recuperarErroCampoForm(form, nomeFormControl, 'max') !=
              null;
          break;

        case TipoErroValidacaoFormulario.EMAIL:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, 'email') !=
            null;
          break;

        case TipoErroValidacaoFormulario.QUALQUER:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, null) != null;
          break;

        default: //QUALQUER e DEFINIDA_USUARIO
          exibe =
            this.recuperarErroCampoForm(
              form,
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
        return 'Campo obrigatório com caracteres válidos';
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
