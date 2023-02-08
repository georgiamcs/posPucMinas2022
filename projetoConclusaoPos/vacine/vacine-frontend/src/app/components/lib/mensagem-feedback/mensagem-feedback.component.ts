import { Component, Input } from '@angular/core';

import { MensagemFeedback } from '../../../shared/classes/mensagem-feedback';

@Component({
  selector: 'app-mensagem-feedback',
  templateUrl: './mensagem-feedback.component.html',
  styleUrls: ['./mensagem-feedback.component.scss'],
})
export class MensagemFeedbackComponent {
  @Input()
  mensagens: MensagemFeedback[] = [];

  fechar(msg: MensagemFeedback): void {
    this.mensagens.splice(this.mensagens.indexOf(msg), 1);
  }
}
