import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { UtilRota } from './../../shared/utils/rota.util';
import { browserRefresh } from '../../app.component';

@Component({
  selector: 'vacine-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent implements OnInit, OnDestroy {
  protected subscription: Subscription;
  protected mensagens: MensagemFeedback[] = [];

  private handlerOrientation: any;
  private landscape = window.matchMedia('(orientation: landscape)');

  protected origemRotaNavegacao: string;

  constructor(
    protected router: Router,
    protected deviceService: DeviceDetectorService
  ) {
    this.mensagens = [];
    this.carregarStateAoIniciar();
  }

  ngOnInit(): void {
    if (browserRefresh) {
      this.mensagens = [];
    }
      this.handlerOrientation = this.onChangeOrientation.bind(this);
    this.landscape.addEventListener('change', this.handlerOrientation, true);
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.landscape.removeEventListener('change', this.handlerOrientation, true);
  }

  private onChangeOrientation() {
    return null; //nao precisa fazer nada aqui, o metodo so precisa existir
  }

  protected tratarErro(erro: string, irParaPaginaErro = true) {
    if (!!this.router && irParaPaginaErro) {
      const state = UtilRota.gerarStateMsgFeedbackRota(
        new MensagemFeedback(TipoMensagemFeedback.ERRO, erro)
      );

      this.router.navigate(['/erro'], state);
    } else {
      const msg = new MensagemFeedback(TipoMensagemFeedback.ERRO, erro);
      this.addMensagem(msg);
    }
  }

  protected carregarStateAoIniciar() {
    let msg = this.getStateRota(UtilRota.NOME_STATE_ROTA_MSG_FEEDBACK);
    if (!!msg) {
      this.addMensagem(msg);
    }

    this.origemRotaNavegacao = this.getStateRota(
      UtilRota.NOME_STATE_ROTA_ORIGEM_NAV
    );
  }

  protected addMensagem(msg: MensagemFeedback) {
    this.mensagens.push(msg);
  }

  protected deleteAllMensagem() {
    this.mensagens = [];
  }

  protected getStateRota(nomeState: string) {
    let state;
    if (!!this.router) {
      state = this.router.getCurrentNavigation()?.extras.state?.[nomeState];
    }
    return state;
  }

  protected isMobile() {
    return this.deviceService.isMobile();
  }

  protected isDesktop() {
    return this.deviceService.isDesktop();
  }

  protected isTablet() {
    return this.deviceService.isTablet();
  }

  isPortrait() {
    return !this.landscape.matches;
  }

  isLandscape() {
    return this.landscape.matches;
  }
}
