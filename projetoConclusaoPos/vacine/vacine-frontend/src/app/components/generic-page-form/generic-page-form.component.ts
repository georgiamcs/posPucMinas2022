import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { TipoErroValidacaoFormulario } from 'src/app/shared/enums/tipo-erro-validacao-formulario.enum';
import { Util } from 'src/app/shared/utils/util.util';
import { GenericPageComponent } from './../generic-page/generic-page.component';

@Component({
  selector: 'vacine-generic-page-form',
  templateUrl: './generic-page-form.component.html',
  styleUrls: ['./generic-page-form.component.scss'],
})
export abstract class GenericPageFormComponent extends GenericPageComponent {
  protected form: FormGroup;
  TipoErroValForm = TipoErroValidacaoFormulario;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected formBuilder: FormBuilder
  ) {
    super(changeDetectorRef, media, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.buildForm();
  }

  protected abstract buildForm(): void;

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
    formControlName: string
  ): boolean {
    return !!this.getFormControl(form, formControlName)?.touched;
  }

  protected recuperarErroCampoForm(
    form: FormGroup,
    formControlName: string,
    nomeErroValidador?: string | null
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
    validacaoDefinidaUsuario?: string
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
            this.recuperarErroCampoForm(form, nomeFormControl, 'min') != null ||
            this.recuperarErroCampoForm(form, nomeFormControl, 'max') != null;
          break;

        case TipoErroValidacaoFormulario.EMAIL:
          exibe =
            this.recuperarErroCampoForm(form, nomeFormControl, 'email') != null;
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
