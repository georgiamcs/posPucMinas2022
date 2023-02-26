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
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected media: MediaMatcher,
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    protected servicoAcesso: ControleAcessoService,
    private securityProvider: SecurityProvider
  ) {
    super(_router, _deviceService);
    this.mobileQuery = media.matchMedia('(max-width: 480px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  trocarSenha() {
    this.idUser = this.securityProvider.getUsuario()?._id;
    const link = `/trocar_minha_senha/${this.idUser}`;
    this.router.navigate([link]);
  }
}
