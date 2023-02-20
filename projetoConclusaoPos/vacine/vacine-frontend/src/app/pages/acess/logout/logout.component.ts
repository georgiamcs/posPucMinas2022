import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent extends GenericPageComponent implements OnInit {
  constructor(
    private _router: Router,
    private __deviceService: DeviceDetectorService,
    private serviceAutRedeSocial: SocialAuthService,
    private serviceAcesso: ControleAcessoService
  ) {
    super(_router, __deviceService);
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
