//TODO: ter opcao de ver lista e cadastrar novo para cada entidade
//TODO: Alterar para aparecer nome do usuário fixa na tela e lista de perfis
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';
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
  }

  trocarSenha() {
    this.idUser = this.securityProvider.getUsuario()?._id;
    const link = `/trocar_minha_senha/${this.idUser}`;
    this.router.navigate([link]);
  }
}
