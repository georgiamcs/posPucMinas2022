import { Component } from '@angular/core';
import { ControleAcessoService } from './../../services/autenticacao/controle-acesso/controle-acesso.service';

@Component({
  selector: 'vacine-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor(protected servicoAcesso: ControleAcessoService) {
  };
}
