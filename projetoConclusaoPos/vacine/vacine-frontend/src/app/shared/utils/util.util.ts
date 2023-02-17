import { ValidatorFn, Validators } from '@angular/forms';
import { MensagemFeedback } from '../classes/mensagem-feedback.class';

export class Util {
  public static converterUndefinedEmNulo(valor: any): any {
    return valor === undefined ? null : valor;
  }

  public static converterUndefinedEmTrue(valor: any): any {
    return valor === undefined ? true : valor;
  }

  public static converterUndefinedNullStrVazia(value: string | undefined | null): string {
    return value ? value : '';
  }

  public static getValidadorObrigatorioSemEspacos(): ValidatorFn | null {
    return Validators.compose([
      Validators.required,
      Validators.pattern(/(.|\s)*\S(.|\s)*/),
    ]);
  }

}
