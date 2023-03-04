import { SocialAuthService } from '@abacritt/angularx-social-login';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { TemaAcessoUsuario } from 'src/app/shared/classes/acesso.class';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends GenericPageComponent implements OnInit {
  logadoGoogle = false;

  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    protected override serviceAcesso: ControleAcessoService,
    private serviceAutRedeSocial: SocialAuthService
  ) {
    super(changeDetectorRef, media, router, serviceAcesso);
  }

  protected getTemaAcesso(): TemaAcessoUsuario {
    throw new Error('Página "Logout" não tem checagem de acesso.');
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscription = this.serviceAutRedeSocial.authState.subscribe({
      next: (user) => (this.logadoGoogle = user != null),
      error: (e) => this.tratarErro(e),
    });

    if (this.logadoGoogle) {
      this.serviceAutRedeSocial.signOut();
    }

    this.serviceAcesso.logout();
    this.irParaPagina('/home');
  }
}
