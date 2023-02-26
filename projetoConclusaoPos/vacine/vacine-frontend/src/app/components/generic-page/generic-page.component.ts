import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';
import { TipoMensagemFeedback } from 'src/app/shared/enums/tipo-mensagem-feedback.enum';
import { Util } from 'src/app/shared/utils/util.util';
import { browserRefresh } from '../../app.component';
import { UtilRota } from './../../shared/utils/rota.util';

@Component({
  selector: 'vacine-generic-page',
  templateUrl: './generic-page.component.html',
  styleUrls: ['./generic-page.component.scss'],
})
export class GenericPageComponent implements OnInit, OnDestroy {
  protected subscription: Subscription;
  protected mensagens: MensagemFeedback[] = [];

  private lowResolutionQuery: MediaQueryList;
  private mediumResolutionQuery: MediaQueryList;
  private highResolutionQuery: MediaQueryList;

  private _mediaQueryListener: () => void;

  protected origemRotaNavegacao: string;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected media: MediaMatcher,
    protected router: Router
  ) {
    this.mensagens = [];
    this.carregarStateAoIniciar();

    this.setWidthDeviceDetector();
  }

  private setWidthDeviceDetector() {
    this.lowResolutionQuery = this.media.matchMedia('(max-width: 480px)'); //mobile
    this.mediumResolutionQuery = this.media.matchMedia(
      '(min-width: 481px) and (max-width: 1024px)'
    ); //tablet
    this.highResolutionQuery = this.media.matchMedia('(min-width: 1025px)'); //desktop
    this._mediaQueryListener = () => this.changeDetectorRef.detectChanges();

    this.lowResolutionQuery.addListener(this._mediaQueryListener);
    this.mediumResolutionQuery.addListener(this._mediaQueryListener);
    this.highResolutionQuery.addListener(this._mediaQueryListener);
  }

  ngOnInit(): void {
    if (browserRefresh) {
      this.mensagens = [];
    }
  }

  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    this.lowResolutionQuery.removeListener(this._mediaQueryListener);
    this.mediumResolutionQuery.removeListener(this._mediaQueryListener);
    this.highResolutionQuery.removeListener(this._mediaQueryListener);
  }

  protected isLowResolution() {
    return this.lowResolutionQuery.matches;
  }

  protected isMediumResolution() {
    return this.mediumResolutionQuery.matches;
  }

  protected isHighResolution() {
    return this.highResolutionQuery.matches;
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

  protected formatarValorDecimal(v: number): string {
    if (!!v) {
      return Util.formatarValorDecimal(v);
    } else {
      return '';
    }
  }
}
