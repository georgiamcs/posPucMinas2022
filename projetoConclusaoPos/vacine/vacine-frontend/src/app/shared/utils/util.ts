import { ValidatorFn, Validators } from "@angular/forms";

export function converterUndefinedEmNulo(valor: any): any {
  return valor == undefined ? null : valor;
}

export function validadoresRequeridoSemEspacos() : ValidatorFn | null {
  return Validators.compose([
    Validators.required,
    Validators.pattern(/(.|\s)*\S(.|\s)*/),
  ]);
}
