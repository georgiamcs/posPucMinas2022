import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ControleAcessoService } from './../../services/autenticacao/controle-acesso/controle-acesso.service';
import { SecurityProvider } from 'src/app/providers/security.provider';

@Component({
  selector: 'vacine-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends GenericPageComponent{

  private idUser: string | null | undefined;

  constructor(
    protected servicoAcesso: ControleAcessoService,
    private securityProvider: SecurityProvider,
    private _router: Router
  ) {
    super();
    this.router = _router;
    this.idUser = securityProvider.getUsuario()?._id;
  }

  trocarSenha() {
    const link = `/trocarsenha/${this.idUser}`;
    this.router.navigate([link]);
  }
}
