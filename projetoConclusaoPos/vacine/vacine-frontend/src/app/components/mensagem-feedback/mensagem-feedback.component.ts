import { Component, Input } from '@angular/core';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';

@Component({
  selector: 'vacine-mensagem-feedback',
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
