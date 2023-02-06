import { MensagemFeedback } from '../../shared/classes/mensagem-feedback';
import { Component, Input } from '@angular/core';

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
