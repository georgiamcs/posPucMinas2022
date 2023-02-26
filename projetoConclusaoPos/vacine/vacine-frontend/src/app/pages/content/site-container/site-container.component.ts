import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { SecurityProvider } from 'src/app/providers/security.provider';
import { ControleAcessoService } from 'src/app/services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-site-container',
  templateUrl: './site-container.component.html',
  styleUrls: ['./site-container.component.scss'],
})
export class PageContainerComponent
  extends GenericPageComponent
  implements OnDestroy
{
  private idUser: string | null | undefined;

  private lowResolutionQuery: MediaQueryList;
  private mediumResolutionQuery: MediaQueryList;
  private highResolutionQuery: MediaQueryList;

  private _mediaQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    protected servicoAcesso: ControleAcessoService,
    private securityProvider: SecurityProvider
  ) {
    super(_router, _deviceService);
    this.lowResolutionQuery = media.matchMedia('(max-width: 480px)'); //mobile
    this.mediumResolutionQuery = media.matchMedia(
      '(min-width: 481px) and (max-width: 1024px)'
    ); //tablet
    this.highResolutionQuery = media.matchMedia('(min-width: 1025px)'); //desktop
    this._mediaQueryListener = () => changeDetectorRef.detectChanges();

    this.lowResolutionQuery.addListener(this._mediaQueryListener);
    this.mediumResolutionQuery.addListener(this._mediaQueryListener);
    this.highResolutionQuery.addListener(this._mediaQueryListener);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.lowResolutionQuery.removeListener(this._mediaQueryListener);
    this.mediumResolutionQuery.removeListener(this._mediaQueryListener);
    this.highResolutionQuery.removeListener(this._mediaQueryListener);
  }

  trocarSenha() {
    this.idUser = this.securityProvider.getUsuario()?._id;
    const link = `/trocar_minha_senha/${this.idUser}`;
    this.router.navigate([link]);
  }

  isLowResolution() {
    return this.lowResolutionQuery.matches;
  }

  isMediumResolution() {
    return this.mediumResolutionQuery.matches;
  }

  isHighResolution() {
    return this.highResolutionQuery.matches;
  }
}
