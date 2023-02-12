
// TODO: LOGIN GOOGLE
//import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControleAcessoService } from './../../../services/autenticacao/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(
    // private socialAuthService: SocialAuthService, // TODO: LOGIN GOOGLE
    private serviceAcesso: ControleAcessoService,
    private router: Router
  ) {}

  logadoGoogle = false;

  ngOnInit(): void {
    // TODO: LOGIN GOOGLE
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.logadoGoogle = user != null;
    // });
    // if (this.logadoGoogle) {
    //   this.socialAuthService.signOut();
    // }

    this.serviceAcesso.logout();

    this.router.navigate(['/home']);
  }
}
