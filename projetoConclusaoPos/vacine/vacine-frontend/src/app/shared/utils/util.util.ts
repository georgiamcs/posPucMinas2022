import { ValidatorFn, Validators } from '@angular/forms';
import { MensagemFeedback } from '../classes/mensagem-feedback.class';

export function converterUndefinedEmNulo(valor: any): any {
  return valor == undefined ? null : valor;
}

export function validadoresRequeridoSemEspacos(): ValidatorFn | null {
  return Validators.compose([
    Validators.required,
    Validators.pattern(/(.|\s)*\S(.|\s)*/),
  ]);
}

export function gerarStateAlertaRota(msgFeedback: MensagemFeedback): Object {
  return {
    state: {
      alerta: {
        tipo: msgFeedback.tipo,
        texto: msgFeedback.texto,
      },
    },
  };
}
