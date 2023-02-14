import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UtilValidators {
  public static confirmaSenhaValidator(
    c: AbstractControl
  ): ValidationErrors | null {
    if (!c.get('senha')?.value && !c.get('confSenha')?.value) {
      c.get('confSenha')?.setErrors(null);
      return null;
    } else if (!c.get('senha')?.value != !c.get('confSenha')?.value) {
      c.get('confSenha')?.setErrors({ confirmasenha: true });
      return { confirmasenha: true };
    } else if (c.get('senha')?.value != c.get('confSenha')?.value) {
      c.get('confSenha')?.setErrors({ confirmasenha: true });
      return { confirmasenha: true };
    } else {
      c.get('confSenha')?.setErrors(null);
      return null;
    }
  }
}
