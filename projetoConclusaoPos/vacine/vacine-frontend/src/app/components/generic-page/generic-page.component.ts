import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { gerarStateAlertaRota } from 'src/app/shared/utils/util';

@Component({
  selector: 'vacine-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent implements OnInit, OnDestroy {
  protected subscription: Subscription;
  protected mensagens: MensagemFeedback[] = [];

  protected router: Router;

  constructor() {}

  ngOnInit(): void {
    this.carregarMensagensAoIniciar();
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected tratarErro(erro: string, irParaPaginaErro = true) {
    if (!!this.router && irParaPaginaErro) {
      const state = gerarStateAlertaRota(
        new MensagemFeedback(TipoMensagemFeedback.ERRO, erro)
      );

      this.router.navigate(['/erro'], state);
    } else {
      const msg = new MensagemFeedback(TipoMensagemFeedback.ERRO, erro);
      this.addMensagem(msg);
    }
  }

  protected carregarMensagensAoIniciar() {
    let msg = this.getStateRota('alerta');
    if (!!msg) {
      this.addMensagem(msg);
    }
  }

  protected addMensagem(msg: MensagemFeedback) {
    this.mensagens.push(msg);
  }

  protected deleteAllMensagem() {
    this.mensagens = [];
  }

  protected getStateRota(nomeState: string) {
    let msg;
    if (!!this.router) {
      msg = this.router.getCurrentNavigation()?.extras.state?.[nomeState];
    }
    return msg;
  }
}
