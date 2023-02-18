import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class ValidatorsUtil {

  public static getValidadorObrigatorioSemEspacos(): ValidatorFn | null {
    return Validators.compose([
      Validators.required,
      Validators.pattern(/(.|\s)*\S(.|\s)*/),
    ]);
  }

  public static getValidatorValorExisteInpuAutoComplete(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && !(typeof control.value != 'string')) {
        return { valornalista: true };
      }
      return null;
    };
  }
}
