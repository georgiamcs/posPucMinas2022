import { ValidatorFn, Validators } from '@angular/forms';

export class Util {
  public static converterUndefinedEmNulo(valor: any): any {
    return valor === undefined ? null : valor;
  }

  public static converterUndefinedEmTrue(valor: any): any {
    return valor === undefined ? true : valor;
  }

  public static converterUndefinedNullStrVazia(
    value: string | undefined | null
  ): string {
    return value ? value : '';
  }

  public static formatarValorDecimal(v: number): string {
    return v.toLocaleString('pt-br', { minimumFractionDigits: 2 });
  }
}
