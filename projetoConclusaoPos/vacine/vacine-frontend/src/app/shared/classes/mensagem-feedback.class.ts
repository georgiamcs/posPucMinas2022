export class MensagemFeedback {
  constructor(private _tipo: string, private _texto: string) {}

  static NOME_STATE_ROTA_MSG_FEEDBACK = 'feedback';

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

  get tipo(): string {
    return this._tipo;
  }

  get texto(): string {
    return this._texto;
  }
}
