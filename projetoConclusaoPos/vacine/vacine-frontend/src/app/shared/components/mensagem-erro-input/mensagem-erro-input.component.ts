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
  @Input() campo?: string;
  @Input() validacao: string;
  @Input() msgerro: string;

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
    if (this.campo) {
      return (
        this.campoFormFoiEditado(this.campo) &&
        this.recuperarErroCampoForm(this.campo, this.validacao) != null
      );
    } else {
      return false;
    }
  }
}
