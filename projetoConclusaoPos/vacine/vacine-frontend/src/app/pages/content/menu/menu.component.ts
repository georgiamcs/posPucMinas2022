//TODO: ter opcao de ver lista e cadastrar novo para cada entidade
//TODO: Alterar para aparecer nome do usuário fixa na tela e lista de perfis
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { SecurityProvider } from 'src/app/providers/security.provider';
import { ControleAcessoService } from '../../../services/authentication/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends GenericPageComponent {
  private idUser: string | null | undefined;

  constructor(
    private _router: Router,
    private _deviceService: DeviceDetectorService,
    protected servicoAcesso: ControleAcessoService,
    private securityProvider: SecurityProvider
  ) {
    super(_router, _deviceService);
  }

  trocarSenha() {
    this.idUser = this.securityProvider.getUsuario()?._id;
    const link = `/trocar_minha_senha/${this.idUser}`;
    this.router.navigate([link]);
  }
}
