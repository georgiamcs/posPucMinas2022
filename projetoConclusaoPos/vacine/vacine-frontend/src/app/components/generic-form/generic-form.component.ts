import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';

@Component({
  selector: 'vacine-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericFormComponent implements OnDestroy {
  protected subscription: Subscription;
  protected mensagens: MensagemFeedback[] = [];

  protected router: Router;

  constructor() {
    this.carregarMensagensAoIniciar();
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected buildForm() {}

  protected tratarErro(erro: string) {
    const msg = new MensagemFeedback(TipoMensagemFeedback.ERRO, erro);
    this.mensagens.push(msg);
  }

  protected carregarMensagensAoIniciar() {
    if (!!this.router) {
      let msg = this.router.getCurrentNavigation()?.extras.state?.['alerta'];
      if (msg) {
        this.mensagens.push(msg);
      }
    }
  }
}
