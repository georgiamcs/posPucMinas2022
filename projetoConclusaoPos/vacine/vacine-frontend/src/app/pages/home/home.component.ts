import { GenericPageComponent } from 'src/app/components/generic-page/generic-page.component';
import { ControleAcessoService } from './../../services/autenticacao/controle-acesso/controle-acesso.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensagemFeedback } from 'src/app/shared/classes/mensagem-feedback.class';

@Component({
  selector: 'vacine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends GenericPageComponent {
  constructor(
    private _router: Router,
    protected servicoAcesso: ControleAcessoService
  ) {
    super();
    this.router = _router;
  }
}
