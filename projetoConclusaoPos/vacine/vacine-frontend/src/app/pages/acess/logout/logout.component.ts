import { SocialAuthService } from '@abacritt/angularx-social-login';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends GenericPageComponent implements OnInit {
  constructor(
    protected override changeDetectorRef: ChangeDetectorRef,
    protected override media: MediaMatcher,
    protected override router: Router,
    private serviceAutRedeSocial: SocialAuthService,
    private serviceAcesso: ControleAcessoService
  ) {
    super(changeDetectorRef, media, router);
  }

  logadoGoogle = false;

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
    this.router.navigate(['/home']);
  }
}
