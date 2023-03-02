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

  private mobileResolutionQuery: MediaQueryList;
  private tabletLowResolutionQuery: MediaQueryList;
  private tabletHighResolutionQuery: MediaQueryList;
  private desktopResolutionQuery: MediaQueryList;

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
    this.mobileResolutionQuery = this.media.matchMedia('(max-width: 480px)'); //mobile
    this.tabletLowResolutionQuery = this.media.matchMedia(
      '(min-width: 481px) and (max-width: 767px)'
    ); //tablet
    this.tabletHighResolutionQuery = this.media.matchMedia(
      '(min-width: 768px) and (max-width: 1024px)'
    ); //tablet
    this.desktopResolutionQuery = this.media.matchMedia('(min-width: 1025px)'); //desktop
    this._mediaQueryListener = () => this.changeDetectorRef.detectChanges();

    this.mobileResolutionQuery.addListener(this._mediaQueryListener);
    this.tabletLowResolutionQuery.addListener(this._mediaQueryListener);
    this.tabletHighResolutionQuery.addListener(this._mediaQueryListener);
    this.desktopResolutionQuery.addListener(this._mediaQueryListener);
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
    this.mobileResolutionQuery.removeListener(this._mediaQueryListener);
    this.tabletLowResolutionQuery.removeListener(this._mediaQueryListener);
    this.desktopResolutionQuery.removeListener(this._mediaQueryListener);
  }

  protected isMobileResolution() {
    return this.mobileResolutionQuery.matches;
  }

  protected isTabletLowResolution() {
    return this.tabletLowResolutionQuery.matches;
  }

  protected isTabletHighResolution() {
    return this.tabletHighResolutionQuery.matches;
  }

  protected isDesktopResolution() {
    return this.desktopResolutionQuery.matches;
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
    this.mensagens = [...this.mensagens];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected deleteAllMensagens() {
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

  protected getNomeArqParaResolucaoTela(path: string, nomeArqSemExtensao: string, extensao: string): string {
    let tam: string;
    if (this.isDesktopResolution()) {
      tam = 'g';
    } else if (this.isTabletHighResolution()) {
      tam = 'm'
    } else {
      tam = 'p'
    }
    return `${path}${nomeArqSemExtensao}-${tam}.${extensao}`;
  }
}
