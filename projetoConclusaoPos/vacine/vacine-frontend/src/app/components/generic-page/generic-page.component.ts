import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { gerarStateAlertaRota } from 'src/app/shared/utils/util.util';

@Component({
  selector: 'vacine-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent implements OnInit, OnDestroy {
  protected subscription: Subscription;
  protected mensagens: MensagemFeedback[] = [];

  protected router: Router;
  protected deviceService: DeviceDetectorService;

  private handlerOrientation: any;
  private landscape = window.matchMedia('(orientation: landscape)');

  constructor() {}

  ngOnInit(): void {
    this.handlerOrientation = this.onChangeOrientation.bind(this);
    this.landscape.addEventListener('change', this.handlerOrientation, true);
    this.carregarMensagensAoIniciar();
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
