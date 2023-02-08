export class MensagemFeedback {
  constructor(private _tipo: string, private _texto: string) {}

  get tipo(): string {
    return this._tipo;
  }

  get texto(): string {
    return this._texto;
  }
}
