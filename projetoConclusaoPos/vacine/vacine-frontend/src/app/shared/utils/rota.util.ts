import { MensagemFeedback } from '../classes/mensagem-feedback.class';
import { TipoOrigemRota } from '../enums/tipo-rota.enum';

export class UtilRota {
  static NOME_STATE_ROTA_MSG_FEEDBACK = 'feedback';
  static NOME_STATE_ROTA_ORIGEM_NAV = 'origemRotaNav';

  static gerarStateRotaLimpo(): Object {
    return {
      state: {},
    };
  }

  static gerarStateOrigemRota(origem: TipoOrigemRota): Object {
    return {
      state: {
        origemRotaNav: origem,
      },
    };
  }

  public static gerarStateMsgFeedbackRota(
    msgFeedback: MensagemFeedback
  ): Object {
    return {
      state: {
        feedback: {
          tipo: msgFeedback.tipo,
          texto: msgFeedback.texto,
        },
      },
    };
  }
}
