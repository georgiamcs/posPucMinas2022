import { Component, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import {
  converterUndefinedEmNulo,
  converterUndefinedNuloEmFalse,
} from '../../utils/util';

@Component({
  selector: 'vacine-msg-erro-input',
  templateUrl: './mensagem-erro-input.component.html',
  styleUrls: ['./mensagem-erro-input.component.scss'],
})
export class MensagemErroInputComponent {
  @Input() form: FormGroup;
  @Input() campo: string;
  @Input() validacao: string;
  @Input() msgerro?: string;

  private campoFormFoiEditado(formControlName: string): boolean {
    return converterUndefinedNuloEmFalse(
      this.form.get(formControlName)?.touched
    );
  }

  private recuperarErroCampoForm(
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

  protected exibeMensagemErro(): boolean {
    let exibe = false;

    if (this.campo && this.campoFormFoiEditado(this.campo)) {

      switch (this.validacao) {
        case 'obrigatorio':
          exibe =
            (this.recuperarErroCampoForm(this.campo, 'required') != null ||
              this.recuperarErroCampoForm(this.campo, 'pattern') != null);
          break;

        case 'formato':
          exibe =
            (this.recuperarErroCampoForm(this.campo, 'minlength') != null ||
              this.recuperarErroCampoForm(this.campo, 'maxlength') != null ||
              this.recuperarErroCampoForm(this.campo, 'pattern') != null ||
              this.recuperarErroCampoForm(this.campo, 'mask') != null);
          break;

        case 'limite':
          exibe =
            (this.recuperarErroCampoForm(this.campo, 'min') != null ||
              this.recuperarErroCampoForm(this.campo, 'max') != null);
          break;

        default:
          exibe =
            this.recuperarErroCampoForm(this.campo, this.validacao) != null;
          break;
      }
    }

    if (exibe && !this.msgerro) {
      switch (this.validacao) {
        case 'obrigatorio':
          this.msgerro = 'Campo obrigatório';
          break;

        case 'required':
          this.msgerro = 'Campo obrigatório';
          break;

        case 'formato':
          this.msgerro = 'Formato inválido';
          break;

        case 'limite':
          this.msgerro = 'Valor fora do lmite do campo';
          break;

        case 'email':
          this.msgerro = 'Email inválido';
          break;

        default:
          this.msgerro = 'Preenchimento inválido';
          break;
      }
    }

    return exibe;
  }
}
